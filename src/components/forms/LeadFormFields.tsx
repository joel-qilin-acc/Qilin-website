import { budgetOptions, serviceOptions } from "@/content/company";
import { Field } from "@/components/ui/Field";
import { SelectField } from "@/components/ui/SelectField";
import type { LeadState, LeadVariant } from "@/lib/schemas/lead";

type LeadFormFieldsProps = {
  variant: LeadVariant;
  errors: LeadState["fieldErrors"];
};

export function LeadFormFields({ variant, errors }: LeadFormFieldsProps) {
  return (
    <>
      <Field label="Your name" name="name" autoComplete="name" error={errors?.name} />
      <Field label="Work email" name="email" type="email" autoComplete="email" error={errors?.email} />
      {variant === "contact" ? (
        <>
          <Field label="Company" name="company" autoComplete="organization" />
          <SelectField label="Service you are interested in" name="service" options={serviceOptions} />
          <SelectField label="Budget range" name="budget" options={budgetOptions} />
        </>
      ) : null}
      {variant === "audit" ? (
        <Field label="Website to audit" name="site" autoComplete="url" error={errors?.site} />
      ) : (
        <Field label="What do you need?" name="message" multiline error={errors?.message} />
      )}
    </>
  );
}
