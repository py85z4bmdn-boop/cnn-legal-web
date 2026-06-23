FROM rust:1.75-slim AS builder

# Cài đặt các thư viện cần thiết để biên dịch OpenSSL (reqwest sử dụng native-tls)
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
# Cài đặt CA Certificates để gọi API HTTPS sang OpenRouter và thư viện OpenSSL runtime
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/target/release/cnn-legal-support .
COPY --from=builder /app/.env.example .env

EXPOSE 3001
ENV PORT=3001

CMD ["./cnn-legal-support"]
