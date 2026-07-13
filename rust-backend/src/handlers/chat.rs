use axum::{extract::State, http::StatusCode, Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::services::openrouter::OpenRouterClient;

use crate::services::openrouter::Message;

#[derive(Debug, Deserialize)]
pub struct ChatRequest {
    pub history: Vec<Message>,
}

#[derive(Debug, Serialize)]
pub struct ChatResponse {
    pub reply: String,
}

#[derive(Debug, Serialize)]
pub struct ErrorResponse {
    pub error: String,
}

use axum::response::sse::{Event, KeepAlive, Sse};
use futures_util::StreamExt;
use std::convert::Infallible;

pub async fn chat_handler(
    State(client): State<Arc<OpenRouterClient>>,
    Json(payload): Json<ChatRequest>,
) -> Result<Sse<impl futures_util::Stream<Item = Result<Event, Infallible>>>, (StatusCode, Json<ErrorResponse>)> {
    let last_message = payload.history.last().ok_or_else(|| {
        (
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Message history cannot be empty".to_string(),
            }),
        )
    })?;

    if last_message.content.trim().is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Last message content cannot be empty".to_string(),
            }),
        ));
    }

    if last_message.content.len() > 2000 {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "Last message content exceeds maximum length of 2000 characters".to_string(),
            }),
        ));
    }

    match client.stream_message(payload.history).await {
        Ok(stream) => {
            let event_stream = stream.map(|res| {
                match res {
                    Ok(text) => Ok(Event::default().data(text)),
                    Err(e) => Ok(Event::default().data(format!("Error: {}", e))),
                }
            });
            Ok(Sse::new(event_stream).keep_alive(KeepAlive::default()))
        }
        Err(e) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ErrorResponse {
                error: format!("Failed to create stream: {}", e),
            }),
        )),
    }
}

