"use client";
import Link from "next/link";
// import a question mark icon
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserRole } from "@/hooks/useUserRole";

export default function MetricsSlot() {
  const agent = useUserRole();


  return (
    <div className="py-4">
      {agent?.role === "SUPERVISOR" ? (
        <>
          <div>
            <div className="bg-metrics rounded-lg shadow-md p-4">
              <h1 className="text-3xl font-bold text-center p-4">Metric 1</h1>
              <div className="h-full flex justify-center items-center text-white"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-red-500 hover:bg-figma-figma9 rounded-lg shadow-md p-4 overflow-hidden sm:h-56 md:h-64 lg:h-64 xl:h-full">
          <button className="w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center p-4">
              <FontAwesomeIcon
                icon={faQuestion}
                className="text-white text-4xl mr-4"
              />
              <h1 className="text-4xl font-bold text-white">Ask for help</h1>
            </div>
            <div className="flex items-center justify-center px-3">
              <text className="text-white">Ask your supervisor for help with a call or anything needed.</text>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
