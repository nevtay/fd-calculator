import Calculator from "@/components/Calculator";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <div className="min-h-screen px-12 py-12">
        <h1 className="text-(--color-indigo) font-semibold text-5xl mb-12">
          Fixed Deposit Calculator
        </h1>
        <Calculator />
      </div>
    </div>
  );
}
