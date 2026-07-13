use axum::{
    body::Body,
    extract::ConnectInfo,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use serde::Serialize;
use std::{
    collections::HashMap,
    net::SocketAddr,
    sync::Arc,
    time::{Duration, Instant},
};
use tokio::sync::Mutex;

#[derive(Debug, Serialize)]
struct RateLimitError {
    error: String,
}

#[derive(Clone)]
struct RateLimitEntry {
    count: u32,
    reset_at: Instant,
}

pub struct RateLimiter {
    requests: Arc<Mutex<HashMap<String, RateLimitEntry>>>,
    max_requests: u32,
    window: Duration,
}

impl RateLimiter {
    pub fn new(max_requests: u32, window: Duration) -> Self {
        Self {
            requests: Arc::new(Mutex::new(HashMap::new())),
            max_requests,
            window,
        }
    }

    pub async fn check_rate_limit(&self, ip: &str) -> bool {
        let mut requests = self.requests.lock().await;
        let now = Instant::now();

        if let Some(entry) = requests.get_mut(ip) {
            if now < entry.reset_at {
                if entry.count >= self.max_requests {
                    return false;
                }
                entry.count += 1;
            } else {
                entry.count = 1;
                entry.reset_at = now + self.window;
            }
        } else {
            requests.insert(
                ip.to_string(),
                RateLimitEntry {
                    count: 1,
                    reset_at: now + self.window,
                },
            );
        }

        true
    }
}

static RATE_LIMITER: std::sync::OnceLock<RateLimiter> = std::sync::OnceLock::new();

pub async fn rate_limit_middleware(
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    req: Request<Body>,
    next: Next,
) -> Response {
    let limiter = RATE_LIMITER.get_or_init(|| {
        RateLimiter::new(10, Duration::from_secs(60))
    });
    let ip = addr.ip().to_string();

    if !limiter.check_rate_limit(&ip).await {
        return (
            StatusCode::TOO_MANY_REQUESTS,
            Json(RateLimitError {
                error: "Rate limit exceeded. Please try again later.".to_string(),
            }),
        )
            .into_response();
    }

    next.run(req).await
}

