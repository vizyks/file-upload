import { AuthErrors } from "@/lib/auth";
const handleErrors = (
  newErrors: Partial<AuthErrors>,
  setErrors: React.Dispatch<React.SetStateAction<AuthErrors>>
) => {
  setErrors((prev) => ({
    ...prev,
    ...Object.fromEntries(
      Object.entries(newErrors).map(([key, val]) => [key, val ? val[0] : null])
    ),
  }));
};

export default handleErrors;
