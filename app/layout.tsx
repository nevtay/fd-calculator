import type { Metadata } from "next";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fixed Deposit Calculator",
  description:
    "Enter your fixed deposit stats to learn about your returns over time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full border-2 dark:bg-neutral-800">
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
