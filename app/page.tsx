import Calculator from "@/components/Calculator";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export default function Home() {
  return (
    <div>
      <h1>FD Calculator</h1>
      <ThemeToggle />
      <Calculator />
    </div>
  );
}
