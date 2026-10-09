import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

export function LeadFormSuccess() {
  return (
    <div role="status" className="swap flex flex-col items-start gap-3 py-6">
      <CheckCircle aria-hidden size={40} weight="fill" className="text-success" />
      <h3 className="text-2xl font-semibold tracking-tight">Thanks, we have your request.</h3>
      <p className="max-w-[40ch] text-muted">A senior engineer will reply within 24 hours.</p>
    </div>
  );
}
