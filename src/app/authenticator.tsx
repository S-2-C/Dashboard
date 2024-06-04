"use client";

import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import Image from "next/image";

import awsExports from "../aws-exports";

Amplify.configure(awsExports);

const components = {
  Header() {
    return (
      <div className="align-center">
        <Image
          src="/images/Walmart-Logo.png"
          alt="Walmart Logo"
          width={200}
          height={100}
        />
      </div>
    );
  },
};

export default function WrappedAuthenticator({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticator components={components}>{children}</Authenticator>;
}
