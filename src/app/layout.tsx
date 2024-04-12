import type { Metadata } from "next";
import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import WrappedAuthenticator from "./authenticator";
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Wallmart Dashboard",
  description: "For Amazon Connect Supervisors and Agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <WrappedAuthenticator>{children}</WrappedAuthenticator>
        
      </body>
    </html>
  );
}
