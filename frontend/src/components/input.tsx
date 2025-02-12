import { Link } from "react-router-dom";

type InputType = "text" | "email" | "password";

function Input({
  type = "text",
  name,
  recovery = false,
}: {
  type?: InputType;
  name: string;
  recovery?: boolean;
}) {
  const normalizeName = name.toLowerCase();
  return (
    <div className="flex flex-col gap-2">
      {type !== "password" ? (
        <label htmlFor={normalizeName}>{name}</label>
      ) : (
        <div className="flex justify-between items-center">
          <label htmlFor={type}>{name}</label>
          {/* Create forgot password link and page*/}
          {recovery && (
            <Link
              className="text-sm text-purple-accent hover:text-purple-text-hover"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          )}
        </div>
      )}
      <input
        className="border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
        type={type}
        name={normalizeName}
        id={normalizeName}
      />
    </div>
  );
}

export default Input;
