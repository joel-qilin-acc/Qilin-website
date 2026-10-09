import { z } from "zod";

export const leadFields = ["name", "email", "message", "site"] as const;

export type LeadField = (typeof leadFields)[number];

export type LeadVariant = "default" | "contact" | "audit";

export const leadSchema = z
  .object({
    variant: z.enum(["default", "contact", "audit"]).default("default"),
    name: z.string().trim().min(2, "Tell us your name."),
    email: z.email("Enter a work email we can reply to."),
    message: z.string().trim().optional(),
    site: z.string().trim().optional(),
    company: z.string().trim().max(120).optional(),
    service: z.string().trim().max(80).optional(),
    budget: z.string().trim().max(80).optional(),
    trap: z.string().max(0).optional(),
    attribution: z.string().max(2000).optional(),
  })
  .superRefine((lead, context) => {
    if (lead.variant !== "audit" && (lead.message ?? "").length < 10) {
      context.addIssue({ code: "custom", path: ["message"], message: "A sentence or two about what you need is enough." });
    }
    if (lead.variant === "audit" && (lead.site ?? "").length < 4) {
      context.addIssue({ code: "custom", path: ["site"], message: "Add the website we should audit." });
    }
  });

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<LeadField, string>>;
};

export const idleLeadState: LeadState = { status: "idle" };
