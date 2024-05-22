// // Working but missing position memory in x, validating if needed
// import { cn } from "@/lib/utils";
// import { useState, useEffect, useRef } from "react";
// import { XCircle, CircleChevronUp, Bot, X } from "lucide-react";
// import { Input } from "./input";
// import { Button } from "./button";
// import Image from "next/image";


// interface AIChatBoxProps {
//   open: boolean;
//   onClose: () => void;
// }

// interface Message {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
// }

// export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const chatBoxRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const initialMousePosition = useRef<{ x: number; y: number } | null>(null);
//   const initialPosition = useRef<{ top: number; left: number } | null>(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (open) {
//       inputRef.current?.focus();
//       setInitialPosition();
//     }
//   }, [open]);

//   useEffect(() => {
//     const handleResize = () => {
//       setInitialPosition();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

// const setInitialPosition = () => {
//   if (chatBoxRef.current) {
//     const windowWidth = window.innerWidth;
//     const windowHeight = window.innerHeight;
//     const chatBoxWidth = chatBoxRef.current.offsetWidth;
//     const chatBoxHeight = chatBoxRef.current.offsetHeight;
//     const marginLeft = 20; // Adjust this value as needed
//     const marginBottom = 20; // Adjust this value as needed

//     // Calculate the left position ensuring it stays within the window bounds
//     let left = windowWidth - chatBoxWidth - marginLeft;
//     left = Math.max(left, 0); // Ensure it doesn't go beyond the left edge

//     // Calculate the top position ensuring it stays within the window bounds
//     let top = windowHeight - chatBoxHeight - marginBottom;
//     top = Math.max(top, 0); // Ensure it doesn't go beyond the top edge

//     chatBoxRef.current.style.left = left + "px";
//     chatBoxRef.current.style.top = top + "px";
//   }
// };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (!chatBoxRef.current) return;

//     initialMousePosition.current = { x: e.clientX, y: e.clientY };
//     initialPosition.current = { top: chatBoxRef.current.offsetTop, left: chatBoxRef.current.offsetLeft };

//     const onMouseMove = (event: MouseEvent) => {
//       if (!initialMousePosition.current || !initialPosition.current || !chatBoxRef.current) return;

//       const offsetX = event.clientX - initialMousePosition.current.x;
//       const offsetY = event.clientY - initialMousePosition.current.y;

//       chatBoxRef.current.style.left = initialPosition.current.left + offsetX + "px";
//       chatBoxRef.current.style.top = initialPosition.current.top + offsetY + "px";
//     };

//     const onMouseUp = () => {
//       initialMousePosition.current = null;
//       initialPosition.current = null;
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//     };

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const newMessage: Message = { id: `${Date.now()}`, role: "user", content: input };
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setInput("");

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`/chatBot?question=${encodeURIComponent(input)}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch response");
//       }
//       const data = await response.json();
//       const botMessage: Message = { id: `${Date.now() + 1}`, role: "assistant", content: data.ragChainResult };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (err) {
//       console.error("Error:", err);
//       setError("Failed to get a response. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       ref={chatBoxRef}
//       className={cn(
//         "z-10 w-[400px] p-1 fixed bottom-0 right-0" ,
//         open ? "opacity-95 transition-opacity duration-300" : "hidden opacity-0 transition-opacity duration-300"
//       )}
//       onMouseDown={handleMouseDown}
//     >
//       <div className="flex flex-col rounded-xl  bg-background border shadow-2xl">
//         <button onClick={onClose} className="mt-1 mr-1 ms-auto block">
//           <X className="hover:bg-slate-200 rounded-full" size={30} />
//         </button>
//         <div className="h-[400px] overflow-y-auto px-3" ref={scrollRef}>
//           {messages.map((message) => (
//             <ChatMessage key={message.id} message={message} />
//           ))}
//           {isLoading && <ChatMessage message={{ id: "loading", role: "assistant", content: "Fetching response" }} />}
//         </div>
//         {error && <div className="text-red-500 text-center">{error}</div>}
//         {!error && messages.length === 0 && (
//           <div className="flex h-full items-center justify-center">
//             <Bot className="animate-bounce w-6 h-6 mr-3" />
//             Need Help? Start a conversation<span className="loadingNoStyle">...</span>
//           </div>)}
//           <form onSubmit={handleSubmit} className="m-3 flex gap-1">
//           <Input
//             value={input}
//             onChange={handleInputChange}
//             placeholder="Type your question..."
//             ref={inputRef}
//             disabled={isLoading}
//           />
//           <Button type="submit" className="flex-shrink-1" disabled={isLoading}>
//             <CircleChevronUp size={30} className="flex-shrink-0" />
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function ChatMessage({ message: { role, content } }: { message: Message }) {
//   const isUser = role === "user";
//   const isAiMessage = role === "assistant";

//   return (
//     <div className={cn("mb-3 flex items-center", isAiMessage ? "justify-start me-5" : "justify-end ms-5")}>
//       {isAiMessage && <Bot className="mr-2 shrink-0" />}
//       <p className={cn("p-2 rounded-lg", isAiMessage ? "bg-primary text-background" : "bg-secondary text-foreground")}>
//         {content}{(content === "Fetching response" && <span className="loadingNoStyle">...</span>)}
//       </p>
//       {isUser && (
//         <Image
//           src="https://orlandosydney.com/wp-content/uploads/2023/05/Female-Professional-Headshot.-LinkedIn-Business-Profile.-By-Orlandosydney.com-202300752.jpg"
//           alt="Profile Image"
//           width={50}
//           height={50}
//           className="ml-2 rounded-full w-10 h-10 object-cover"
//         />
//       )}
//     </div>
//   );
// }

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { XCircle, CircleChevronUp, Bot, X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import Image from "next/image";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initialMousePosition = useRef<{ x: number; y: number } | null>(null);
  const initialPosition = useRef<{ top: number; left: number } | null>(null);
  const currentMousePosition = useRef<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setInitialPosition();
    } else {
      resetPosition();
    }
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      setInitialPosition();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setInitialPosition = () => {
    if (chatBoxRef.current) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const chatBoxWidth = chatBoxRef.current.offsetWidth;
      const chatBoxHeight = chatBoxRef.current.offsetHeight;
      const marginLeft = 20; // Adjust this value as needed
      const marginBottom = 20; // Adjust this value as needed

      // Calculate the left position ensuring it stays within the window bounds
      let left = windowWidth - chatBoxWidth - marginLeft;
      left = Math.max(left, 0); // Ensure it doesn't go beyond the left edge

      // Calculate the top position ensuring it stays within the window bounds
      let top = windowHeight - chatBoxHeight - marginBottom;
      top = Math.max(top, 0); // Ensure it doesn't go beyond the top edge

      initialPosition.current = { top, left };
      currentMousePosition.current = { top, left };
      
      chatBoxRef.current.style.left = left + "px";
      chatBoxRef.current.style.top = top + "px";
    }
  };

  const resetPosition = () => {
    if (chatBoxRef.current && initialPosition.current) {
      chatBoxRef.current.style.left = initialPosition.current.left + "px";
      chatBoxRef.current.style.top = initialPosition.current.top + "px";
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!chatBoxRef.current) return;

    initialMousePosition.current = { x: e.clientX, y: e.clientY };
    initialPosition.current = { top: chatBoxRef.current.offsetTop, left: chatBoxRef.current.offsetLeft };

    const onMouseMove = (event: MouseEvent) => {
      if (!initialMousePosition.current || !initialPosition.current || !chatBoxRef.current) return;

      const offsetX = event.clientX - initialMousePosition.current.x;
      const offsetY = event.clientY - initialMousePosition.current.y;

      let newLeft = initialPosition.current.left + offsetX;
      let newTop = initialPosition.current.top + offsetY;

      // Ensure it doesn't go out of the window bounds
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - chatBoxRef.current.offsetWidth));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - chatBoxRef.current.offsetHeight));

      chatBoxRef.current.style.left = newLeft + "px";
      chatBoxRef.current.style.top = newTop + "px";
      currentMousePosition.current = { top: newTop, left: newLeft };
    };

    const onMouseUp = () => {
      initialMousePosition.current = null;
      initialPosition.current = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { id: `${Date.now()}`, role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/chatBot?question=${encodeURIComponent(input)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }
      const data = await response.json();
      const botMessage: Message = { id: `${Date.now() + 1}`, role: "assistant", content: data.ragChainResult };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={chatBoxRef}
      className={cn(
        "z-10 w-[400px] p-1 fixed",
        open ? "opacity-95 transition-opacity duration-300" : "hidden opacity-0 transition-opacity duration-300"
      )}
      onMouseDown={handleMouseDown}
      style={{
        top: open && currentMousePosition.current ? currentMousePosition.current.top : 'initial',
        left: open && currentMousePosition.current ? currentMousePosition.current.left : 'initial',
      }}
    >
      <div className="flex flex-col rounded-xl bg-background border shadow-2xl">
        <button onClick={onClose} className="mt-1 mr-1 ms-auto block">
          <X className="hover:bg-slate-200 rounded-full" size={30} />
        </button>
        <div className="h-[400px] overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <ChatMessage message={{ id: "loading", role: "assistant", content: "Fetching response" }} />}
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!error && messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <Bot className="animate-bounce w-6 h-6 mr-3" />
            Need Help? Start a conversation<span className="loadingNoStyle">...</span>
          </div>)}
          <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your question..."
            ref={inputRef}
            disabled={isLoading}
          />
          <Button type="submit" className="flex-shrink-1" disabled={isLoading}>
            <CircleChevronUp size={30} className="flex-shrink-0" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function ChatMessage({ message: { role, content } }: { message: Message }) {
  const isUser = role === "user";
  const isAiMessage = role === "assistant";

  return (
    <div className={cn("mb-3 flex items-center", isAiMessage ? "justify-start me-5" : "justify-end ms-5")}>
      {isAiMessage && <Bot className="mr-2 shrink-0" />}
      <p className={cn("p-2 rounded-lg", isAiMessage ? "bg-primary text-background" : "bg-secondary text-foreground")}>
        {content}{(content === "Fetching response" && <span className="loadingNoStyle">...</span>)}
      </p>
      {isUser && (
        <Image
          src="https://orlandosydney.com/wp-content/uploads/2023/05/Female-Professional-Headshot.-LinkedIn-Business-Profile.-By-Orlandosydney.com-202300752.jpg"
          alt="Profile Image"
          width={50}
          height={50}
          className="ml-2 rounded-full w-10 h-10 object-cover"
        />
      )}
    </div>
  );
}