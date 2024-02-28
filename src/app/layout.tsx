import type { Metadata } from "next";
import "./globals.css";
// import WrappedAuthenticator from "./authenticator";

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
      <body>
        {/* <WrappedAuthenticator> */}
        {children}
        {/* </WrappedAuthenticator> */}
      </body>
    </html>
  );
}
