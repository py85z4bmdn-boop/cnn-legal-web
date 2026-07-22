use crate::{
    db::{search_knn, Pool, Retrieved},
    embed::Embedder,
    openrouter::ChatMessage,
    state::AppState,
    SYSTEM_PROMPT_TEMPLATE,
};
use anyhow::Result;

pub async fn build_rag_context(
    embedder: &Embedder,
    pool: &Pool,
    question: &str,
    top_k: usize,
) -> Result<Vec<Retrieved>> {
    let q_emb = embedder.embed_one(question).await?;
    let conn = pool.get()?;
    let hits = search_knn(&conn, &q_emb, top_k)?;
    Ok(hits)
}

fn render_chunks(chunks: &[Retrieved]) -> String {
    if chunks.is_empty() {
        return "(Không tìm thấy tài liệu liên quan trong dữ liệu hiện có.)".to_string();
    }
    let mut s = String::new();
    for (i, c) in chunks.iter().enumerate() {
        let src = if c.section.is_empty() {
            format!("{} (/bai-viet/{})", c.title, c.article_slug)
        } else {
            format!("{} — {} (/bai-viet/{})", c.title, c.section, c.article_slug)
        };
        s.push_str(&format!("[{}] Nguồn: {src}\n{}\n\n", i + 1, c.content.trim()));
    }
    s.trim_end().to_string()
}

pub fn build_prompt(question: &str, chunks: &[Retrieved]) -> Vec<ChatMessage> {
    let system = SYSTEM_PROMPT_TEMPLATE.replace("{{retrieved_chunks}}", &render_chunks(chunks));
    vec![
        ChatMessage {
            role: "system",
            content: system,
        },
        ChatMessage {
            role: "user",

            content: question.to_string(),
        },
    ]
}

pub async fn prepare_messages(state: &AppState, question: &str) -> Result<Vec<ChatMessage>> {
    let chunks =
        build_rag_context(state.embedder(), state.pool(), question, state.config().top_k).await?;
    Ok(build_prompt(question, &chunks))
}
