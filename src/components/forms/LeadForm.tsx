"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitLead } from "@/actions/submit-lead";
import { useAttribution } from "@/hooks/useAttribution";
import { idleLeadState, type LeadVariant } from "@/lib/schemas/lead";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { LeadFormFields } from "./LeadFormFields";
import { LeadFormSuccess } from "./LeadFormSuccess";

type LeadFormProps = {
  variant?: LeadVariant;
  submitLabel?: string;
};

export function LeadForm({ variant = "default", submitLabel = "Book a call" }: LeadFormProps) {
  const [state, formAction, pending] = useActionState(submitLead, idleLeadState);
  const attributionRef = useAttribution();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  if (state.status === "success") return <LeadFormSuccess />;

  return (
    <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-3">
      <input type="hidden" name="variant" value={variant} />
      <LeadFormFields variant={variant} errors={state.fieldErrors} />
      <input type="text" name="trap" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <input ref={attributionRef} type="hidden" name="attribution" defaultValue="" />
      {state.message ? (
        <p role="alert" className="text-sm text-ink">
          {state.message}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className={buttonStyles({ variant: "primary" })}>
        {pending ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
