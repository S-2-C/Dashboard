import type { Metadata } from "next";
import "./globals.css";
import WrappedAuthenticator from "./authenticator";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Wallmart Dashboard",
  description: "For Amazon Connect Supervisors and Agents",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* <WrappedAuthenticator> */}
        {children}
        {/* </WrappedAuthenticator> */}
      </body>
    </html>
  );
}
