import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import WrappedAuthenticator from "./authenticator";
import { cn } from "@/lib/utils";
import AgentConnectPopupContainer from "@/components/agentConnectPopupContainer";
import AIChatButtonWrapper from "@/components/ui/aiChatButtonWrapper";

export const metadata: Metadata = {
  title: "Walmart Dashboard",
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
        <WrappedAuthenticator>{children}</WrappedAuthenticator>
        <AgentConnectPopupContainer />
        <div>
          <AIChatButtonWrapper />
        </div>
      </body>
    </html>
  );
}
