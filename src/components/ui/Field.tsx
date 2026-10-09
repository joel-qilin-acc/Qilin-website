import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  name: string;
  type?: "text" | "email";
  multiline?: boolean;
  autoComplete?: string;
  error?: string;
};

const controlStyles =
  "w-full rounded-base border border-line bg-surface px-4 text-[16px] text-ink transition-colors placeholder:text-muted/70 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/25 aria-[invalid=true]:border-ink";

export function Field({ label, name, type = "text", multiline, autoComplete, error }: FieldProps) {
  const errorId = `${name}-error`;
  const shared = {
    id: name,
    name,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={3} autoComplete="off" className={cn(controlStyles, "resize-none py-3")} />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          spellCheck={type === "email" ? false : undefined}
          inputMode={type === "email" ? "email" : undefined}
          className={cn(controlStyles, "h-12")}
        />
      )}
      <p id={errorId} aria-live="polite" className="min-h-0 text-sm text-ink">
        {error}
      </p>
    </div>
  );
}
