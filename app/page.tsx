import Calculator from "@/components/Calculator";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export default function Home() {
  return (
    <div className="w-full">
      <div className="m-auto mt-12 flex min-h-screen w-10/12 flex-col">
        <div className="mb-12 inline-flex flex-row items-center justify-between max-md:flex max-md:flex-col max-md:gap-4">
          <h1 className="w-fit text-5xl font-semibold text-(--color-indigo) max-md:text-center">
            Fixed Deposit Calculator
          </h1>
          <ThemeToggle />
        </div>
        <Calculator />
      </div>
    </div>
  );
}
