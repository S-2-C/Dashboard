"use client";

import "./globals.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import awsExports from "../aws-exports";
Amplify.configure(awsExports);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Authenticator hideSignUp={true}>{children}</Authenticator>
      </body>
    </html>
  );
}
