import type { z } from "zod";
import type { leadSchema } from "@/lib/schemas/lead";
import type { Email } from "./send";

type Lead = z.infer<typeof leadSchema>;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const variantLabel: Record<Lead["variant"], string> = {
  default: "Booking",
  contact: "Contact form",
  audit: "Security audit request",
};

function detailRows(lead: Lead): [string, string][] {
  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Service", lead.service],
    ["Budget", lead.budget],
    ["Website to audit", lead.site],
    ["Message", lead.message],
    ["Came from", lead.attribution],
  ];
  return rows.filter((row): row is [string, string] => Boolean(row[1]));
}

// Goes to the team: everything the visitor filled in, with reply-to set so "Reply" answers the lead.
export function teamEmail(lead: Lead, to: string[]): Email {
  const rows = detailRows(lead);
  return {
    to,
    replyTo: lead.email,
    subject: `${variantLabel[lead.variant]}: ${lead.name}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<table cellpadding="6" style="font-family:sans-serif;font-size:15px">${rows
      .map(
        ([label, value]) =>
          `<tr><td style="color:#667085;vertical-align:top">${label}</td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}</table>`,
  };
}

// Goes to the visitor: a short confirmation, so they know the request arrived.
export function confirmationEmail(lead: Lead): Email {
  const first = lead.name.split(" ")[0];
  return {
    to: [lead.email],
    subject: "We got your request, Qilin Lab",
    text: `Hi ${first},\n\nThanks for reaching out. A senior engineer will reply within 24 hours.\n\nQilin Lab`,
    html: `<p style="font-family:sans-serif;font-size:15px">Hi ${escapeHtml(first)},</p><p style="font-family:sans-serif;font-size:15px">Thanks for reaching out. A senior engineer will reply within 24 hours.</p><p style="font-family:sans-serif;font-size:15px">Qilin Lab</p>`,
  };
}
