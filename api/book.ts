import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { service, barber, date, time, customerName, customerEmail } = req.body;
  
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    console.error("Telegram credentials missing");
    return res.status(500).json({ error: "Server configuration error: Missing Telegram credentials" });
  }

  const escapeHTML = (text: any) => {
    const str = text ? String(text) : 'N/A';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const message = `
🆕 <b>New Booking at QLF Barber Shop</b>

👤 <b>Customer:</b> ${escapeHTML(customerName)}
📧 <b>Email:</b> ${escapeHTML(customerEmail)}
✂️ <b>Service:</b> ${escapeHTML(service)}
💈 <b>Barber:</b> ${escapeHTML(barber)}
📅 <b>Date:</b> ${escapeHTML(date)}
🕒 <b>Time:</b> ${escapeHTML(time)}

<i>Sent from QLF Barber Web App</i>
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error("Telegram API Error:", result);
      return res.status(400).json({ 
        error: result.description || "Failed to send notification",
        details: result
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
