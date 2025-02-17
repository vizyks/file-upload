import { z } from "zod";
import { AuthErrors } from "@/lib/auth";

type FieldType = "username" | "password" | "email";

const handleValidation = <T extends z.ZodTypeAny>(
  field: FieldType,
  value: string,
  schema: T,
  setError: React.Dispatch<React.SetStateAction<AuthErrors>>
) => {
  const result = schema.safeParse(value);

  if (result.success) {
    setError((prev) => ({ ...prev, [field]: "" }));
  } else {
    const error = result.error.format();
    setError((prev) => ({ ...prev, [field]: error._errors[0] }));
  }
};

export default handleValidation;
