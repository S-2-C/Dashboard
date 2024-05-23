"use client";
import Link from "next/link";
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
        <div className="bg-metrics rounded-lg shadow-md p-4">
        <h1 className="text-3xl font-bold text-center p-4">
          Chat bot
        </h1>
    </div>
    
    
    )}
  </div>
    );
  }