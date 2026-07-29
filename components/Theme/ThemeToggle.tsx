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
    return <div className="w-9 h-9 bg-gray-200 rounded-md dynamic-skeleton" />;
  }

  return (
    <button
      aria-label="Toggle Theme"
      className="p-2 border rounded-md cursor-pointer bg-neutral-100 dark:bg-neutral-800 dark:text-amber-300 text-purple-500 w-fit h-fit"
      onClick={(e) => {
        e.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      Current Theme: <span className="font-bold capitalize">{resolvedTheme}</span>
    </button>
  );
}
