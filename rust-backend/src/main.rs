mod config;
mod handlers;
mod middleware;
mod services;

use axum::{
    routing::post,
    Router,
};
use dotenv::dotenv;
use std::{env, net::SocketAddr, sync::Arc};
use tower_http::cors::{Any, CorsLayer};

use config::ChatConfig;
use handlers::chat::chat_handler;
use middleware::rate_limit::rate_limit_middleware;
use services::openrouter::OpenRouterClient;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let port = env::var("PORT")
        .unwrap_or_else(|_| "3001".to_string())
        .parse::<u16>()
        .expect("PORT must be a valid number");

    let allowed_origins = env::var("ALLOWED_ORIGIN")
        .unwrap_or_else(|_| "http://localhost:4322".to_string())
        .split(',')
        .filter_map(|s| s.trim().parse::<axum::http::HeaderValue>().ok())
        .collect::<Vec<_>>();

    let config = ChatConfig::load_config();
    let client = Arc::new(OpenRouterClient::new(config));

    let cors = CorsLayer::new()
        .allow_origin(allowed_origins)
        .allow_methods([
            axum::http::Method::GET,
            axum::http::Method::POST,
            axum::http::Method::OPTIONS,
        ])
        .allow_headers([
            axum::http::header::CONTENT_TYPE,
            axum::http::header::AUTHORIZATION,
            axum::http::header::ACCEPT,
        ])
        .allow_credentials(false)
        .max_age(std::time::Duration::from_secs(3600));

    let app = Router::new()
        .route("/chat", post(chat_handler))
        .layer(axum::middleware::from_fn(rate_limit_middleware))
        .layer(cors)
        .with_state(client);

    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    println!("Server running on http://0.0.0.0:{}", port);

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("Failed to bind to address");

    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<SocketAddr>(),
    )
    .await
    .expect("Failed to start server");
}

