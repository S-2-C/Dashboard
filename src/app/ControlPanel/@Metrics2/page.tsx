"use client";
import Link from "next/link";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUserRole } from "@/hooks/useUserRole";

export default function MetricsSlot() {
  const agent = useUserRole();

  return (
    <div className="py-4 ">
      {agent?.role === "SUPERVISOR" ? (
        <>
          <div className="bg-metrics rounded-lg shadow-md p-4">
            <h1 className="text-3xl font-bold text-center p-4">
              Metric 2
            </h1>
          </div>
        </>
      ) : (
        <div className="bg-figma-figma3 hover:bg-figma-figma7 rounded-lg shadow-md overflow-hidden sm:h-56 md:h-64 lg:h-64 sm:p-2 md:p-3 lg:p-16 xl:p-16 xl:h-full">
          <button className="w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <img
                src="images/amaconnect.png"
                alt="connect"
                className="w-20 h-20" />
              <h1 className="text-4xl font-bold text-white text-center pl-3">Amazon Connect</h1>
            </div>
            <div className="flex items-center justify-center">
              <text className="text-white text-xl">Amazon connect instance</text>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}