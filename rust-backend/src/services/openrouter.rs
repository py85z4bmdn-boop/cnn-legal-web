use anyhow::{Context, Result};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::env;

use crate::config::ChatConfig;

#[derive(Debug, Serialize)]
struct OpenRouterRequest {
    model: String,
    messages: Vec<Message>,
    max_tokens: u32,
    temperature: f32,
    #[serde(skip_serializing_if = "Option::is_none")]
    reasoning_effort: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    stream: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Message {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Deserialize)]
struct OpenRouterResponse {
    choices: Vec<Choice>,
}

#[derive(Debug, Deserialize)]
struct Choice {
    message: Message,
}

#[derive(Debug, Deserialize)]
struct OpenRouterStreamResponse {
    choices: Vec<StreamChoice>,
}

#[derive(Debug, Deserialize)]
struct StreamChoice {
    delta: StreamDelta,
}

#[derive(Debug, Deserialize)]
struct StreamDelta {
    content: Option<String>,
}

pub struct OpenRouterClient {
    client: Client,
    config: ChatConfig,
}

impl OpenRouterClient {
    pub fn new(config: ChatConfig) -> Self {
        Self {
            client: Client::new(),
            config,
        }
    }

    pub async fn send_message(&self, user_message: &str) -> Result<String> {
        let api_key = env::var("OPENROUTER_API_KEY")
            .context("OPENROUTER_API_KEY environment variable not set")?;

        let request_body = OpenRouterRequest {
            model: self.config.model.clone(),
            messages: vec![
                Message {
                    role: "system".to_string(),
                    content: self.config.system_prompt.clone(),
                },
                Message {
                    role: "user".to_string(),
                    content: user_message.to_string(),
                },
            ],
            max_tokens: self.config.max_tokens,
            temperature: self.config.temperature,
            reasoning_effort: self.config.reasoning_effort.clone(),
            stream: None,
        };

        let response = self
            .client
            .post("https://openrouter.ai/api/v1/chat/completions")
            .header("Authorization", format!("Bearer {}", api_key))
            .header("Content-Type", "application/json")
            .json(&request_body)
            .send()
            .await
            .context("Failed to send request to OpenRouter")?;

        if !response.status().is_success() {
            let status = response.status();
            return Err(anyhow::anyhow!("OpenRouter API request failed with status: {}", status));
        }

        let openrouter_response: OpenRouterResponse = response
            .json()
            .await
            .context("Failed to parse OpenRouter response")?;

        openrouter_response
            .choices
            .first()
            .map(|choice| choice.message.content.clone())
            .ok_or_else(|| anyhow::anyhow!("No response from OpenRouter"))
    }

    pub async fn stream_message(&self, mut history: Vec<Message>) -> Result<impl futures_util::Stream<Item = Result<String, String>> + 'static> {
        let api_key = env::var("OPENROUTER_API_KEY")
            .context("OPENROUTER_API_KEY environment variable not set")?;

        let mut messages = vec![
            Message {
                role: "system".to_string(),
                content: self.config.system_prompt.clone(),
            }
        ];
        messages.append(&mut history);

        let request_body = OpenRouterRequest {
            model: self.config.model.clone(),
            messages,
            max_tokens: self.config.max_tokens,
            temperature: self.config.temperature,
            reasoning_effort: self.config.reasoning_effort.clone(),
            stream: Some(true),
        };

        let response = self
            .client
            .post("https://openrouter.ai/api/v1/chat/completions")
            .header("Authorization", format!("Bearer {}", api_key))
            .header("Content-Type", "application/json")
            .header("HTTP-Referer", "https://cnnlegal.vn")
            .header("X-Title", "CNN Legal Support")
            .timeout(std::time::Duration::from_secs(60))
            .json(&request_body)
            .send()
            .await
            .context("Failed to send request to OpenRouter")?;

        if !response.status().is_success() {
            let status = response.status();
            let error_body = response.text().await.unwrap_or_default();
            return Err(anyhow::anyhow!("OpenRouter API failed ({}): {}", status, error_body));
        }

        let stream = response.bytes_stream();

        let out_stream = async_stream::stream! {
            use futures_util::StreamExt;
            use std::collections::VecDeque;
            
            let mut buffer = String::new();
            let mut chunk_buffer: VecDeque<String> = VecDeque::with_capacity(10);
            let mut stream = Box::pin(stream);
            
            while let Some(chunk_result) = stream.next().await {
                match chunk_result {
                    Ok(bytes) => {
                        match String::from_utf8(bytes.to_vec()) {
                            Ok(text) => {
                                buffer.push_str(&text);
                                
                                while let Some(newline_pos) = buffer.find('\n') {
                                    let line = buffer.drain(..=newline_pos).collect::<String>();
                                    let trimmed = line.trim();
                                    
                                    if trimmed.is_empty() {
                                        continue;
                                    }
                                    
                                    if let Some(data_content) = trimmed.strip_prefix("data: ") {
                                        if data_content == "[DONE]" {
                                            while let Some(buffered) = chunk_buffer.pop_front() {
                                                yield Ok(buffered);
                                            }
                                            return;
                                        }
                                        
                                        match serde_json::from_str::<OpenRouterStreamResponse>(data_content) {
                                            Ok(parsed) => {
                                                if let Some(choice) = parsed.choices.first() {
                                                    if let Some(content) = &choice.delta.content {
                                                        if !content.is_empty() {
                                                            chunk_buffer.push_back(content.clone());
                                                            
                                                            if chunk_buffer.len() >= 3 {
                                                                if let Some(buffered) = chunk_buffer.pop_front() {
                                                                    yield Ok(buffered);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            Err(e) => {
                                                eprintln!("Failed to parse SSE data: {} - Content: {}", e, data_content);
                                            }
                                        }
                                    }
                                }
                            }
                            Err(e) => {
                                yield Err(format!("UTF-8 decode error: {}", e));
                                return;
                            }
                        }
                    }
                    Err(e) => {
                        yield Err(format!("Stream error: {}", e));
                        return;
                    }
                }
            }
            
            while let Some(buffered) = chunk_buffer.pop_front() {
                yield Ok(buffered);
            }
        };

        Ok(out_stream)
    }
}

