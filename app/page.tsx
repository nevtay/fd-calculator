"use client";
import Calculator from "@/components/Calculator";
import SavedEntries from "@/components/SavedEntries";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export default function Home() {
  return (
    <>
      <div className="m-auto mt-4 flex flex-col px-12 max-md:px-8">
        <div className="mb-8 inline-flex flex-row items-start justify-between max-md:flex max-md:flex-col max-md:gap-4">
          <div className="relative left-[-10vw] h-auto w-auto rounded-2xl bg-indigo-500 py-5 shadow-[-0px_-0px_8px_var(--skeu-shadow),4px_4px_8px_var(--skeu-shadow)] text-shadow-[-2px_-2px_4px_var(--skeu-highlight),4px`1_4px_4px_var(--skeu-shadow)] max-md:left-[-15vw]">
            <div className="relative left-[10vw] rounded-2xl bg-indigo-200 px-4 py-8 shadow-[-0px_-0px_8px_var(--skeu-shadow),4px_4px_8px_var(--skeu-shadow)] max-md:left-[15vw]">
              <h1 className="w-fit text-5xl font-semibold text-(--color-indigo) text-shadow-[0.65px_0.60px_0.25px_var(--skeu-highlight-weak),1px_1px_2px_var(--skeu-shadow)] max-md:text-center">
                Fixed Deposit Calculator
              </h1>
              <ThemeToggle />
            </div>
          </div>
          <SavedEntries />
        </div>
        <Calculator />
      </div>
    </>
  );
}
