import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Frequently() {
  return (
      <div className="flex justify-between ">
        <div className="bg-teal-FU p-4 rounded-tl-lg rounded-bl-lg ">
          <h1 className="text-4xl font-bold text-white">Frequently Used</h1>
        </div>
        <div className="flex-grow flex justify-center items-center  bg-teal-background rounded-tr-lg rounded-br-lg ">
          <div>
            <div className="flex items-center justify-between">
              <Link href="/AgentManagement">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded">
                  Agent Management
                </button>
              </Link>
              <Link href="/Notifications">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Notifications
                </button>
              </Link>
              <Link href="/Metrics">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Metrics
                </button>
              </Link>
              <Link href="/Reports">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Reports
                </button>
              </Link>
              <Link href="/Chat">
                <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Chat
                </button>
              </Link>
              <Link href="/Channels">
                <Button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
                  Channels
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
