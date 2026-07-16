import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
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

  const html = `
    <div style="font-family: sans-serif; font-size: 15px; line-height: 1.7; color: #111827;">
      <h2 style="font-size: 18px; margin-bottom: 16px;">Yêu cầu liên hệ mới từ website CNN Legal</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px 12px; font-weight: 600; width: 140px; background: #f7f8fa;">Họ tên</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${name}</td></tr>
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa;">Điện thoại</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${phone}</td></tr>
        ${email ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa;">Email</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${email}</td></tr>` : ""}
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa;">Lĩnh vực</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${field}</td></tr>
        ${subject ? `<tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa;">Tiêu đề</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb;">${subject}</td></tr>` : ""}
        <tr><td style="padding: 8px 12px; font-weight: 600; background: #f7f8fa; vertical-align: top;">Nội dung</td><td style="padding: 8px 12px; border-left: 2px solid #e5e7eb; white-space: pre-wrap;">${message}</td></tr>
      </table>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: "CNN Legal Website <onboarding@resend.dev>",
    to: "dangkimchinh@gmail.com",
    subject: `[CNN Legal] ${field} – ${subject || "Yêu cầu liên hệ"} từ ${name}`,
    html,
    replyTo: email || undefined,
  });

  if (error) {
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
