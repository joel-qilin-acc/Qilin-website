import type { ProcessStep as ProcessStepContent } from "@/types/content";

type ProcessStepProps = {
  step: ProcessStepContent;
};

export function ProcessStep({ step }: ProcessStepProps) {
  return (
    <li className="relative pl-14 md:pl-0 md:pt-12">
      <span
        data-step-node
        data-active="true"
        className="absolute left-2 top-1.5 size-4 rounded-full border-2 border-line bg-surface transition-[background-color,border-color] duration-300 data-[active=true]:border-accent data-[active=true]:bg-accent md:left-0 md:top-0"
      />
      <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
      <p className="mt-2 max-w-[34ch] text-lg leading-relaxed text-muted">{step.body}</p>
    </li>
  );
}
