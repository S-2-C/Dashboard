import { Button } from "@/components/ui/button"

export default async function Frequently() {
  return (
    <div className="h-full">
    <div className="flex justify-between">
      {/* <div className="flex justify-center items-center"> */}
        <div className="bg-teal-FU p-4 rounded-tl-lg rounded-bl-lg">
          <h1 className="text-4xl font-bold text-white">Frequently Used</h1>
        </div>
      {/* </div> */}
      <div className="flex-grow flex justify-center items-center">
  <div className="max-w-screen-xl w-full bg-teal-background p-6 rounded-tr-lg rounded-br-lg">
  <div className="flex items-center justify-between">
  <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded">
    Agent Management
  </button>
  <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
    Notifications
  </button>
  <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
    Metrics
  </button>
  <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
    Reports
  </button>
  <button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
    Chat
  </button>
  <Button className="bg-background focus:bg-blue-teal active:bg-blue-teal text-gray focus:text-background active:text-background font-bold py-2 px-4 rounded ml-8">
    Channels
  </Button>
</div>

  </div>
</div>

    </div>
    </div>
  );
}
