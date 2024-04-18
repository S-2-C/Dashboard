"use client";
import { useState, useEffect, useRef } from "react";
import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@aws-amplify/ui-react/styles.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faChartBar, 
//   faTasks, 
//   faUsers, 
//   faCalendar, 
//   faComments, 
//   faUserTie, 
//   faChartLine, 
//   faBell, 
//   faBook, 
//   faFileAlt, 
//   faCog, 
//   faSignOutAlt 
// } from '@fortawesome/free-solid-svg-icons';
// import { useAuthenticator } from "@aws-amplify/ui-react";
import Home from "./NavBar.tsx" // Importing the NavBar component

export default function Home2() {
  // const { signOut } = useAuthenticator((context) => [context.signOut]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  // const [hoveredItem, setHoveredItem] = useState(null); // Track hovered item
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNavOpen && navRef.current) {
      // Calculate the width of the navigation bar based on the width of the longest text inside it
      const maxWidth = Array.from(navRef.current.querySelectorAll("a")).reduce(
        (maxWidth, link) => Math.max(maxWidth, link.offsetWidth),
        0
      );
      navRef.current.style.width = `${maxWidth + 120}px`; // Adding extra padding for aesthetics
    } else if (navRef.current) {
      navRef.current.style.width = "120px"; // Default width when the navigation bar is closed
    }
  }, [isNavOpen]);

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <Home/>
      {/* Main Content */}
      <div className={`flex flex-col flex-1 p-10 ml-20`}>
        <Flex direction="column" gap="2rem">
          <Heading level={1}>Control Panel</Heading>
          <Text className="text-sans">Here is some text</Text>
          <Button>Click Me</Button>
        </Flex>
        <div className="absolute top-0 right-0 mt-4 mr-4">
          {/* Position popover in the upper right corner */}
          <Popover>
            <PopoverTrigger>
              <Button>Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="bg-popover text-popover-foreground rounded-lg shadow-lg p-4">
              <Flex direction="column" gap="2rem">
                <Heading level={3}>Popover Content</Heading>
                <Text>Here is some content for the popover</Text>
              </Flex>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
  
                  }