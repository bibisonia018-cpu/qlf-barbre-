import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Telegram Booking Notification Endpoint
  app.post("/api/book", async (req, res) => {
    const { service, barber, date, time, customerName, customerEmail } = req.body;
    
    // Sanitize inputs and environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (!botToken || !chatId) {
      console.error("Telegram credentials missing or empty");
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
      console.log(`Attempting to send Telegram notification to chat: ${chatId}`);
      
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
        console.log("Telegram notification sent successfully");
        res.json({ success: true });
      } else {
        // Log the full error from Telegram to help the user debug
        console.error("Telegram API Error Details:", JSON.stringify(result, null, 2));
        
        let userErrorMessage = "Failed to send notification.";
        if (result.description === "Bad Request: chat not found") {
          userErrorMessage = "Telegram Error: Chat not found. Make sure you have started the bot by sending /start to it.";
        } else if (result.description === "Unauthorized") {
          userErrorMessage = "Telegram Error: Unauthorized. Please check your BOT_TOKEN.";
        }

        res.status(400).json({ 
          error: userErrorMessage,
          details: result.description 
        });
      }
    } catch (error) {
      console.error("Server Error during Telegram notification:", error);
      res.status(500).json({ error: "Internal server error while notifying Telegram" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
