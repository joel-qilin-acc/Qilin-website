// Sends one email through Resend's HTTP API. It is plain fetch, with no SDK and no SMTP port,
// because hosts such as Railway block outgoing SMTP on smaller plans.
//
// Setup (see .env.example): RESEND_API_KEY, LEAD_EMAIL_TO, and LEAD_EMAIL_FROM on a domain verified in Resend.

export type Email = {
  to: string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export type EmailConfig = {
  apiKey: string;
  from: string;
  notify: string[];
  confirm: boolean;
};

// Returns null while the settings are missing, so the form keeps working in development.
export function readEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const notify = (process.env.LEAD_EMAIL_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (!apiKey || notify.length === 0) return null;
  return {
    apiKey,
    notify,
    from: process.env.LEAD_EMAIL_FROM ?? "Qilin Lab <onboarding@resend.dev>",
    confirm: process.env.LEAD_EMAIL_CONFIRMATION !== "off",
  };
}

export async function sendEmail(config: EmailConfig, email: Email) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html,
        reply_to: email.replyTo,
      }),
    });
    if (!response.ok) console.error("Email provider refused the message:", response.status, await response.text());
    return response.ok;
  } catch (error) {
    console.error("Email could not be sent:", error);
    return false;
  }
}
