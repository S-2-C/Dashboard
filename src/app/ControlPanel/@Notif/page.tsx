import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotifSlot() {
  return (
    <div className="bg-teal-background p-4 rounded-lg">
      <h1 className="text-4xl font-bold text-white text-center p-4">
        Notifications
      </h1>
      {/* <p className="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p> */}
      <div className="bg-blue p-4 rounded-lg shadow-md mb-4">
        {" "}
        {/* Added mb-4 for margin-bottom */}
        <text className="font-bold">Notification</text>
      </div>
      <div className="bg-blue p-4 rounded-lg shadow-md mb-4">
        {" "}
        {/* Added mb-4 for margin-bottom */}
        <text className="font-bold">Notification</text>
      </div>
      <div className="bg-figma-figma1 p-4 rounded-lg shadow-md mb-4">
        {" "}
        {/* Added mb-4 for margin-bottom */}
        <text className="text-blue-dark font-bold">
          Notification Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea
        </text>
      </div>
      <div className="bg-blue-dark p-3 rounded-lg shadow-md mb-4 flex flex-col items-center">
  {/* Added mb-4 for margin-bottom */}
  <div className="text-center mb-2 flex">
    <img src="images/AgentRed.svg" className="w-60 h-auto mx-auto"/>
    <text className="font-bold text-white">You should consider reassigning more agents to the Walmart®.com channel</text>
  </div>
  <Link href="/">
    <Button className="bg-figma-figma10 focus:bg-blue-teal active:bg-blue-teal text-background focus:text-blue-dark active:text-background font-bold py-2 px-4 rounded">
      Reassign
    </Button>
  </Link>
</div>
    </div>
  );
}
