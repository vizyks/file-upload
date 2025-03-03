import { ImSpinner8 } from "react-icons/im";

export default function Spinner() {
  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center">
      <ImSpinner8 className="text-white size-16 animate-[spin_1.5s_linear_infinite]" />
    </div>
  );
}
