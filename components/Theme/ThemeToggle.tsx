"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting until mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="dynamic-skeleton h-9 w-9 rounded-md bg-gray-200" />;
  }

  return (
    <button
      aria-label="Toggle Theme"
      className="h-fit w-fit cursor-pointer rounded-md border bg-neutral-100 p-2 text-purple-500 dark:bg-neutral-800 dark:text-amber-300"
      onClick={(e) => {
        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      Current Theme:{" "}
      <span className="font-bold capitalize">{resolvedTheme}</span>
    </button>
  );
}
