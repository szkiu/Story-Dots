import React from "react";
import { Textarea } from "@material-tailwind/react";

export default function CustomTextArea({
  label,
  field,
  required
}: {
  label: string;
  field: any;
  required: any
}) {
  return (
    <div className="">
      <Textarea
        required={required}
        onChange={field.onChange}
        value={field.value}
        name={field.name}
        color="indigo"
        variant="outlined"
        label={label}
        onBlur={field.onBlur}
      />
    </div>
  );
}
