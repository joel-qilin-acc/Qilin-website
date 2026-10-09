"use server";

import type { z } from "zod";
import { confirmationEmail, teamEmail } from "@/lib/email/lead-email";
import { readEmailConfig, sendEmail } from "@/lib/email/send";
import { leadFields, leadSchema, type LeadField, type LeadState } from "@/lib/schemas/lead";

function collectFieldErrors(error: z.ZodError) {
  const fieldErrors: Partial<Record<LeadField, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as LeadField;
    if (leadFields.includes(field) && !fieldErrors[field]) fieldErrors[field] = issue.message;
  }
  return fieldErrors;
}

async function forwardLead(lead: z.infer<typeof leadSchema>) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn("LEAD_WEBHOOK_URL is not set, so this lead was not forwarded anywhere.");
    return true;
  }
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
  });
  return response.ok;
}

// Email the team about the lead, and send the visitor a confirmation. Skipped until the email settings exist.
async function emailLead(lead: z.infer<typeof leadSchema>) {
  const config = readEmailConfig();
  if (!config) {
    console.warn("RESEND_API_KEY or LEAD_EMAIL_TO is not set, so no email was sent for this lead.");
    return true;
  }
  const notified = await sendEmail(config, teamEmail(lead, config.notify));
  // The confirmation is a courtesy: if it fails the team has still been told, so the visitor sees success.
  if (notified && config.confirm) await sendEmail(config, confirmationEmail(lead));
  return notified;
}

export async function submitLead(previous: LeadState, formData: FormData): Promise<LeadState> {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const honeypotTripped = parsed.error.issues.some((issue) => issue.path[0] === "trap");
    if (honeypotTripped) return { status: "success" };
    return { status: "error", fieldErrors: collectFieldErrors(parsed.error) };
  }

  const [forwarded, emailed] = await Promise.all([forwardLead(parsed.data), emailLead(parsed.data)]);
  if (!forwarded || !emailed) {
    return { status: "error", message: "Something went wrong on our side. Please try again in a moment." };
  }
  return { status: "success" };
}
