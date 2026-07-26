import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

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
      <body className={albertSans.className}>
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
