"use client";
import { useState, useEffect, useRef } from "react";
import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@aws-amplify/ui-react/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faTasks,
  faUsers,
  faCalendar,
  faComments,
  faUserTie,
  faChartLine,
  faBell,
  faBook,
  faFileAlt,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { GetUserQuery } from "@/API";
import { useCCP } from "@/context/ccp";

import { usePathname } from "next/navigation";
interface HomeProps {
  children?: React.ReactNode;
}

export default function Home({ children }: HomeProps) {
  const { signOut } = useAuthenticator((context) => [context.signOut]);
  const { logOut } = useCCP();
  const [isNavOpen, setIsNavOpen] = useState(false);
  // const [hoveredItem, setHoveredItem] = useState(null); // Track hovered item
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [agent, setAgent] = useState<GetUserQuery["getUser"]>();
  const route = usePathname();

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

  useEffect(() => {
    async function fetchAgent() {
      const user = await fetchAuthSession(); //Funcion que me da la información del user tokens.signInDetails.loginId
      // @ts-ignore
      const email = user?.tokens?.signInDetails?.loginId;
      // @ts-ignore
      const agent = await fetchOneAgent(email);
      setAgent(agent);
    }

    fetchAgent();
  }, []);

  const handleSignOut = async () => {
    signOut(); // Amplify sign out
    await logOut(); // ccp connect logout

    console.log("Signing out...");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div>
      {agent?.role === "SUPERVISOR" ? (
        <div>
          {route !== "/" && (
            <div className="fixed z-10 h-screen">
              {/* Blue line (Clickable area to show the nav bar) */}
              <div
                className="min-h-full w-20 bg-blue absolute left-0 flex flex-col justify-start items-center"
                onMouseEnter={() => setIsNavOpen(true)}
                onMouseLeave={() => setIsNavOpen(false)}
                style={{ paddingTop: "2rem" }} // Added padding from the top
              >
                {isNavOpen ? null : (
                  <div className="text-white flex flex-col justify-between h-full">
                    {/* Upper column with only the logo */}
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="images/S2C_Logo.svg"
                        alt="Logo"
                        className="w-12 h-12"
                      />
                      <FontAwesomeIcon
                        icon={faChartBar}
                        className="text-teal my-4 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faComments}
                        className="text-teal my-4 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="text-teal my-4 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faChartLine}
                        className="text-teal my-4 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        className="text-teal my-4 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faBook}
                        className="text-teal my-4 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faUserTie}
                        className="text-teal my-4 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faCog}
                        className="text-teal my-4 text-2xl"
                      />
                    </div>
                    {/* Lowest column with only sign out */}
                    <div className="flex items-center justify-center pb-8">
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="text-teal text-2xl"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Bar (conditionally rendered based on isNavOpen state) */}
              {isNavOpen && (
                <nav
                  ref={navRef}
                  className={`h-full bg-blue-highlight px-6 py-8 absolute left-0 transition-all ${
                    isNavOpen
                      ? "transform translate-x-0"
                      : "transform -translate-x-full"
                  }`}
                  onMouseEnter={() => setIsNavOpen(true)}
                  onMouseLeave={() => setIsNavOpen(false)}
                >
                  <ul>
                    <li className="mt-8 flex items-center">
                      <Link href="/" className="text-teal-dark">
                        HOME
                      </Link>
                    </li>
                    <li className="mt-4 flex items-center ml-4">
                      <Link
                        href="/ControlPanel"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Control Panel")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faChartBar}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Control Panel
                          {hoveredItem === "Control Panel" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>
                    <li className="mt-1 flex items-center ml-4">
                      <Link
                        href="/Chat"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Chat")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faComments}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Chat
                          {hoveredItem === "Chat" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>

                    <li className="mt-1 flex items-center ml-4">
                      <Link
                        href="/AgentManagement"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Agent Management")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faUsers}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Agent Management
                          {hoveredItem === "Agent Management" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>
                    <li className="mt-1 flex items-center ml-4">
                      <Link
                        href="/Metrics"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() =>
                          setHoveredItem("Performance Metrics")
                        }
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faChartLine}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Performance Metrics
                          {hoveredItem === "Performance Metrics" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>
                    <li className="mt-1 flex items-center ml-4">
                      <Link
                        href="/ManageReports"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Reports")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Reports
                          {hoveredItem === "Reports" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>
                    <li className="mt-1 flex items-center ml-4">
                      <Link
                        href="/Documentation"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Documentation")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faBook}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Documentation
                          {hoveredItem === "Documentation" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>
                    <li className="mt-1 flex items-center ml-4">
                      <Link
                        href="/Channels"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Channels")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faUserTie}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Channels
                          {hoveredItem === "Channels" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>
                    <li className="mt-6 flex items-center">
                      <a href="#" className="text-teal-dark">
                        OTHERS
                      </a>
                    </li>

                    <li className="mt-1 flex items-center ml-4">
                      <a
                        href="#"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Logout")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <button
                          className="w-max h-max p-2 text-teal hover:text-teal-highlight relative"
                          onClick={() => handleSignOut()}
                        >
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Logout
                          {hoveredItem === "Logout" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </button>
                      </a>
                    </li>

                    {/* Add more navigation items as needed */}
                  </ul>
                </nav>
              )}
            </div>
          )}
          {children}
        </div>
      ) : (
        <div>
          {route !== "/" && (
            <div className="fixed z-10 h-screen">
              {/* Blue line (Clickable area to show the nav bar) */}
              <div
                className=" min-h-full w-20 bg-blue absolute left-0 flex flex-col justify-start items-center"
                onMouseEnter={() => setIsNavOpen(true)}
                onMouseLeave={() => setIsNavOpen(false)}
                style={{ paddingTop: "2rem" }} // Added padding from the top
              >
                {isNavOpen ? null : (
                  <div className="text-white flex flex-col justify-between h-full">
                    {/* Upper column with only the logo */}
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="images/S2C_Logo.svg"
                        alt="Logo"
                        className="w-12 h-12"
                      />
                      <FontAwesomeIcon
                        icon={faChartBar}
                        className="text-teal my-4 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faComments}
                        className="text-teal my-4 text-2xl"
                      />
                      <FontAwesomeIcon
                        icon={faBook}
                        className="text-teal my-4 text-2xl"
                      />
                    </div>
                    {/* Lowest column with only sign out */}
                    <div className="flex items-center justify-center pb-8">
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="text-teal text-2xl"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Bar (conditionally rendered based on isNavOpen state) */}
              {isNavOpen && (
                <nav
                  ref={navRef}
                  className={`h-full bg-blue-highlight px-6 py-8 absolute left-0 transition-all ${
                    isNavOpen
                      ? "transform translate-x-0"
                      : "transform -translate-x-full"
                  }`}
                  onMouseEnter={() => setIsNavOpen(true)}
                  onMouseLeave={() => setIsNavOpen(false)}
                >
                  <ul>
                    <li className="mt-8 flex items-center">
                      <Link href="/" className="text-teal-dark">
                        HOME
                      </Link>
                    </li>
                    <li className="mt-4 flex items-center ml-4">
                      <Link
                        href="/ControlPanel"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Control Panel")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faChartBar}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Control Panel
                          {hoveredItem === "Control Panel" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>
                    <li className="mt-1 flex items-center ml-4">
                      <Link
                        href="/Chat"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Chat")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faComments}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Chat
                          {hoveredItem === "Chat" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>

                    <li className="mt-1 flex items-center ml-4">
                      <Link
                        href="/Documentation"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Documentation")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="w-max h-max p-2">
                          <FontAwesomeIcon
                            icon={faBook}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Documentation
                          {hoveredItem === "Documentation" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </div>
                      </Link>
                    </li>

                    <li className="mt-6 flex items-center">
                      <a href="#" className="text-teal-dark">
                        OTHERS
                      </a>
                    </li>

                    <li className="mt-1 flex items-center ml-4">
                      <a
                        href="#"
                        className={`text-teal hover:text-teal-highlight relative`}
                        onMouseEnter={() => setHoveredItem("Logout")}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <button
                          className="w-max h-max p-2 text-teal hover:text-teal-highlight relative"
                          onClick={() => handleSignOut()}
                        >
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="text-teal hover:text-teal-highlight mr-2"
                          />
                          Logout
                          {hoveredItem === "Logout" && (
                            <div className="absolute inset-0 bg-teal-highlight opacity-30 rounded-lg w-52 h-10"></div>
                          )}
                        </button>
                      </a>
                    </li>

                    {/* Add more navigation items as needed */}
                  </ul>
                </nav>
              )}
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
