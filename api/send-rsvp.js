const telegramBotToken =
  process.env.TELEGRAM_BOT_TOKEN || "8723709677:AAGdi4QaAAIdo814YCfBIRwk1xEI1Mu2_Xc";
const telegramChatId = process.env.TELEGRAM_CHAT_ID || "-5183265051";

const attendanceLabels = {
  yes: "Yes",
  no: "No",
};

function getBody(req) {
  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  return req.body || {};
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body;
  try {
    body = getBody(req);
  } catch {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const attending = body.attending === "yes" || body.attending === "no" ? body.attending : "";

  if (!name || !message || !attending) {
    return res.status(400).json({ error: "Missing RSVP fields" });
  }

  const text = [
    "🔔 رسالة تهنئة جديدة!",
    "",
    `👤 الاسم: ${name.slice(0, 120)}`,
    `💬 الرسالة: ${message.slice(0, 1500)}`,
    `✅ الحضور: ${attendanceLabels[attending]}`,
  ].join("\n");

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
        }),
      },
    );

    if (!telegramResponse.ok) {
      console.error("Telegram sendMessage failed", await telegramResponse.text());
      return res.status(502).json({ error: "Telegram request failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error sending Telegram message", error);
    return res.status(500).json({ error: "Unable to send Telegram message" });
  }
}
