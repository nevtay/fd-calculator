import Calculator from "@/components/Calculator";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <div className="m-auto mt-8 flex min-h-screen w-10/12 flex-col">
        <div className="mb-12 inline-flex flex-row items-center justify-between max-md:flex max-md:flex-col max-md:gap-4">
          <div className="w-12.5/12 relative left-[-20vw] h-auto rounded-2xl bg-indigo-500 py-6 shadow-[-0px_-0px_8px_var(--skeu-shadow),4px_4px_8px_var(--skeu-shadow)] text-shadow-[-2px_-2px_4px_var(--skeu-highlight),4px`1_4px_4px_var(--skeu-shadow)] max-md:left-[-15vw]">
            <h1 className="relative left-[20vw] w-fit rounded-2xl bg-indigo-200 px-5 py-10 text-5xl font-semibold text-(--color-indigo) shadow-[-0px_-0px_8px_var(--skeu-shadow),4px_4px_8px_var(--skeu-shadow)] text-shadow-[-2px_-2px_4px_var(--skeu-highlight),4px`1_4px_4px_var(--skeu-shadow)] max-md:left-[15vw] max-md:w-12/12 max-md:text-center">
              Fixed Deposit Calculator
            </h1>
          </div>
        </div>
        <Calculator />
      </div>
    </>
  );
}
