//Chat
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

const conversations = [
  { id: 1, sender:'you', message: "Hello agent!", time: "6:17 PM" },
  { id: 2, sender:'you', message: "How can I help you?", time: "6:17 PM" },
  { id: 3, sender:'me', message: "I cant locate the package", time: "6:17 PM" },
  { id: 4, sender:'you', message: "I will check, please wait", time: "6:18 PM" },
  { id: 5, sender:'me', message: "I will be waiting", time: "6:18 PM" },
  { id: 6, sender:'me', message: "Thank you!", time: "6:18 PM" }
];

export default async function ChatSlot() {
  return (
    <div className='flex flex-col mb-5 bg-figma-figma3 rounded p-2 shadow-lg'>
      <div className='flex'>
        <FontAwesomeIcon icon={faMessage} className='text-white w-6 h-6 p-3' />
        <h1 className='text-2xl text-white font-bold py-2'>Chat</h1>
      </div>
      <div className='bg-white py-1 px-2 rounded'>
        <div className="">
          {conversations.map(conversation => (
            <div key={conversation.id} className={`flex flex-col mb-2 ${conversation.sender === "you" ? "items-start" : "items-end"}`}>
              <div className= 'flex'>
              <span className={`bg-${conversation.sender === "you" ? "figma-figma1" : "figma-figma6"} px-3 py-1 text-white mt-1 p-1 rounded-tl-md text-xs ${conversation.sender === "you" ? "self-start" : "self-end"}`}>{conversation.message} </span>
              <span className={`bg-${conversation.sender === "you" ? "figma-figma1" : "figma-figma6"} text-white mt-1 p-1 pt-2 rounded-tr-md text-[8px] ${conversation.sender === "you" ? "self-start" : "self-end"}`}>{conversation.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}