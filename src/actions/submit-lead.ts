"use server";

import type { z } from "zod";
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

export async function submitLead(previous: LeadState, formData: FormData): Promise<LeadState> {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const honeypotTripped = parsed.error.issues.some((issue) => issue.path[0] === "trap");
    if (honeypotTripped) return { status: "success" };
    return { status: "error", fieldErrors: collectFieldErrors(parsed.error) };
  }

  const delivered = await forwardLead(parsed.data);
  if (!delivered) {
    return { status: "error", message: "Something went wrong on our side. Please try again in a moment." };
  }
  return { status: "success" };
}
