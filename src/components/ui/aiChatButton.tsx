// Working: AI Chat Button
"use client";
import React, { useState, useRef, useEffect } from "react";
import AIChatBox from "./aiChatBox";
import { Button } from "./button";
import { Bot } from "lucide-react";

export default function AiChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  return (
    <>
      {!chatBoxOpen && (

        <div
          ref={buttonRef}
          //   onMouseDown={handleMouseDown}
          style={{
            position: 'fixed', // Ensures the button can be freely moved
            cursor: 'pointer',
            bottom: 0,
            right: 0,
            zIndex: 50,
          }}
        >
          <Button className="mb-5 mr-11 rounded-full h-20 w-20 shadow-2xl transition ease-in-out delay-150 bg-primary hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 duration-300" onClick={() => setChatBoxOpen(true)}>
            <Bot size={70} />
          </Button>
        </div>
      )}

      <AIChatBox
        open={chatBoxOpen}
        onClose={() => setChatBoxOpen(false)}
      />
    </>
  );
}
