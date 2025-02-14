const handleValidation = <T>(
  value: T,
  schema: Zod.Schema<T>,
  setError: (error: string) => void,
  fieldName: string
) => {
  const result = schema.safeParse(value);

  if (result.success) {
    setError("");
    return true;
  } else {
    const error = result.error.format() as Record<
      string,
      { _errors?: string[] }
    >;

    if (error[fieldName]?._errors?.[0]) {
      setError(error[fieldName]._errors[0]);
      return false;
    }
  }
};

export default handleValidation;
