import Calculator from "@/components/Calculator";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export default function Home() {
  return (
    <div className="w-full">
      <div className="min-h-screen w-10/12 m-auto mt-12 flex flex-col">
        <div className="mb-12 inline-flex flex-row justify-between items-center">
          <h1 className="text-(--color-indigo) font-semibold text-5xl w-fit">
            Fixed Deposit Calculator
          </h1>
          <ThemeToggle />
        </div>
        <Calculator />
      </div>
    </div>
  );
}
