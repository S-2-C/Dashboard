"use client";

import { Amplify, } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import awsExports from "../aws-exports";

Amplify.configure(awsExports);

export default function WrappedAuthenticator({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <Authenticator>
    {children}
  </Authenticator>
  );
}
