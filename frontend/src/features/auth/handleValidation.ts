import { z } from "zod";

const handleValidation = <T extends z.ZodTypeAny>(
  value: string,
  schema: T,
  setError: (error: string) => void
) => {
  const result = schema.safeParse(value);

  if (result.success) {
    setError("");
  } else {
    const error = result.error.format();
    setError(error._errors[0]);
  }
};

export default handleValidation;
