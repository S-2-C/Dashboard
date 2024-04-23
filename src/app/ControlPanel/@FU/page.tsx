export default async function Frequently() {
  return (
    <div className="flex justify-between">
      <div className="flex justify-center items-center">
        <div className="bg-teal-FU p-4 rounded-tl-lg rounded-bl-lg">
          <h1 className="text-4xl font-bold text-white">Frequently Used</h1>
        </div>
      </div>
      <div className="flex-grow flex justify-center items-center">
  <div className="max-w-screen-xl w-full bg-teal-background p-4 rounded-tr-lg rounded-br-lg">
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Agent Management
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8">
        Notifications
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8">
        Metrics
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8">
        Reports
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8">
        Chat
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-8">
        Channels
      </button>
    </div>
  </div>
</div>

    </div>
  );
}
