"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "./ThemeToggle.css";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(resolvedTheme?.toLowerCase() === "dark");

  const handleToggle = () => {
    setIsDark(!isDark);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // Prevent hydration mismatch by waiting until mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="dynamic-skeleton h-9 w-9 rounded-md bg-gray-200" />;
  }

  return (
    <div
      className={`skeo-track ${isDark ? "is-dark" : "is-light"} top-[5] right-[10]`}
      onClick={handleToggle}
      role="switch"
      aria-label="Toggle Theme"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleToggle()}
    >
      <div className="skeo-thumb">
        <div className="skeo-thumb-inner">
          {resolvedTheme?.toLowerCase() === "dark" ? "🌑" : "☀️"}
        </div>
      </div>
    </div>
  );
}
