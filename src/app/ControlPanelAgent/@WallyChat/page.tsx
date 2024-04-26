//Wally Chat
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPerson, faFile } from '@fortawesome/free-solid-svg-icons';

export default async function WallyChatSlot() {
  // Conversaciones precargadas
  const conversations = [
    { id: 1, icon: faRobot, sender: "Wally", message: "How can I help you today?" },
    { id: 2, icon: faPerson, sender: "You", message: "How do I return a product?" },
    { id: 3, icon: faRobot, sender: "Wally", message: "To return a product: 1. Print the return receipt 2. Stamp it to package and take it to nearest Walmart strore" }
  ];

  return (
    <div className="bg-figma-figma4 p-7 rounded-lg shadow-lg">
      <div className="mt-2">
        {conversations.map(conversation => (
          <div key={conversation.id} className={`flex flex-col mb-2 ${conversation.sender === "Wally" ? "items-start" : "items-end"}`}>
            <div className='flex'>
              <FontAwesomeIcon icon={conversation.icon} className='w-4 h-4 pr-2 pl-2 pt-1' />
              <span className="font-semibold">{conversation.sender}:</span>
            </div>
            <span className={`bg-${conversation.sender === "You" ? "figma-figma6" : "gray-300"} rounded-md px-3 py-1 ${conversation.sender === "Wally" ? "self-start" : "self-end"}`}>{conversation.message}</span>
          </div>
        ))}
        <div className='flex bg-white m-2 w-40 rounded'>
          <FontAwesomeIcon icon={faFile} className='w-5 h-5 p-2' />
          <h1 className="text-center text-s font-bold pt-2">Product Return</h1>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white rounded-md shadow-md">
        <input type="text" placeholder="Escribe tu mensaje..." className="w-full rounded-md px-2 py-1 outline-none" />
        <button className=" px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">Enviar</button>
      </div>
    </div>
  );
}