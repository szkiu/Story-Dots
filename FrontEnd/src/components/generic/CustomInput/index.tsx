import { Input } from "@material-tailwind/react";

export default function CustomInput({
  type,
  label,
  field,
  required,
  variant,
  className,
}: {
  type: string;
  label: string;
  field: any;
  required: any;
  variant: "standard" | "outlined";
  className: string | undefined;
}) {
  return (
    <Input
      onChange={field.onChange}
      required={required}
      value={field.value}
      name={field.name}
      color="indigo"
      variant={variant ? variant : "outlined"}
      label={label}
      onBlur={field.onBlur}
      type={!type ? "text" : type}
      className={className ? className : undefined}
    />
  );
}
