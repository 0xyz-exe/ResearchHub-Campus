import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "ResearchHub Campus",
  description: "Sistem manajemen penelitian dan publikasi perguruan tinggi"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(manrope.variable, spaceGrotesk.variable, "min-h-screen font-sans") }>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
