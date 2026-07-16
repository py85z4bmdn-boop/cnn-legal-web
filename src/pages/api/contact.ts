import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 giờ

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function checkRateLimit(ip: string): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Dọn các entry đã hết hạn để tránh Map phình to trên instance chạy lâu
  for (const [key, entry] of rateLimitStore) {
    if (now >= entry.resetAt) rateLimitStore.delete(key);
  }

  const entry = rateLimitStore.get(ip);
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfterSeconds: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { limited: true, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { limited: false, retryAfterSeconds: 0 };
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || "unknown";
  const { limited, retryAfterSeconds } = checkRateLimit(ip);
  if (limited) {
    return new Response(
      JSON.stringify({ error: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfterSeconds),
        },
      }
    );
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, phone, email, field, subject, message } = body;

  if (!name || !phone || !field || !message) {
    return new Response(JSON.stringify({ error: "Vui lòng điền đầy đủ các trường bắt buộc." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Không thể gửi email. Vui lòng thử lại sau." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  const resend = new Resend(apiKey);

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = email ? escapeHtml(email) : "";
  const safeField = escapeHtml(field);
  const safeSubject = subject ? escapeHtml(subject) : "";
  const safeMessage = escapeHtml(message);
  const validReplyTo = email && EMAIL_PATTERN.test(email) ? email : undefined;

  const html = `
    <div style="font-family: sans-serif; font-size: 15px; line-height: 1.7; color: #111827;">
      <h2 style="font-size: 18px; margin-bottom: 16px;">Yêu cầu liên hệ mới từ website CNN Legal</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px 12px; font-weight: 600; width: 140px; background: #f7f8fa;">Họ tên</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${safeName}</td></tr>
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa;">Điện thoại</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${safePhone}</td></tr>
        ${safeEmail ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa;">Email</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${safeEmail}</td></tr>` : ""}
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa;">Lĩnh vực</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${safeField}</td></tr>
        ${safeSubject ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa;">Tiêu đề</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${safeSubject}</td></tr>` : ""}
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa; vertical-align: top;">Nội dung</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb; white-space: pre-wrap;">${safeMessage}</td></tr>
      </table>
    </div>
  `;

  let sendError: unknown = null;
  try {
    const { error } = await resend.emails.send({
      from: "CNN Legal Website <onboarding@resend.dev>",
      to: "dangkimchinh@gmail.com",
      subject: `[CNN Legal] ${field} – ${subject || "Yêu cầu liên hệ"} từ ${name}`,
      html,
      replyTo: validReplyTo,
    });
    sendError = error;
  } catch (err) {
    sendError = err;
  }

  if (sendError) {
    return new Response(JSON.stringify({ error: "Không thể gửi email. Vui lòng thử lại sau." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
