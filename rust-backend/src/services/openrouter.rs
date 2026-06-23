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

#[derive(Debug, Serialize, Deserialize)]
struct Message {
    role: String,
    content: String,
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

    pub async fn stream_message(&self, user_message: String) -> Result<impl futures_util::Stream<Item = Result<String, String>> + 'static> {
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
                    content: user_message,
                },
            ],
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
            .json(&request_body)
            .send()
            .await
            .context("Failed to send request to OpenRouter")?;

        if !response.status().is_success() {
            let status = response.status();
            return Err(anyhow::anyhow!("OpenRouter API request failed with status: {}", status));
        }

        let mut stream = response.bytes_stream();
        let mut buffer = String::new();

        let out_stream = async_stream::stream! {
            use futures_util::StreamExt;
            while let Some(chunk_result) = stream.next().await {
                match chunk_result {
                    Ok(bytes) => {
                        if let Ok(text) = String::from_utf8(bytes.to_vec()) {
                            buffer.push_str(&text);
                            while let Some(index) = buffer.find('\n') {
                                let line = buffer.drain(..index + 1).collect::<String>();
                                let line = line.trim();
                                if line.is_empty() {
                                    continue;
                                }
                                if line.starts_with("data: ") {
                                    let data_str = &line[6..];
                                    if data_str == "[DONE]" {
                                        break;
                                    }
                                    if let Ok(parsed) = serde_json::from_str::<OpenRouterStreamResponse>(data_str) {
                                        if let Some(choice) = parsed.choices.first() {
                                            if let Some(ref content) = choice.delta.content {
                                                yield Ok(content.clone());
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    Err(e) => {
                        yield Err(e.to_string());
                    }
                }
            }
        };

        Ok(out_stream)
    }
}

// Made with Bob
