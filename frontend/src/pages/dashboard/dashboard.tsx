import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="bg-black text-white w-screen h-screen flex p-4 gap-4">
        {children}
      </main>
    </>
  );
}
