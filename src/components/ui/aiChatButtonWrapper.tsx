"use client";

import AIChatButton from "@/components/ui/aiChatButton";
import { usePathname } from "next/navigation";

export default function AIChatButtonWrapper() {
  const pathname = usePathname();

  const hiddenRoutes = ["/"];

  const shouldShowAIChatButton = !hiddenRoutes.includes(pathname);

  if (!shouldShowAIChatButton) return null;

  return <AIChatButton />;
}