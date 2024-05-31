import React from 'react';
import { Resizable } from 're-resizable'; 
interface ChatWindowProps {
    chatRows: React.ReactNode[];
    onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatRows, onSendMessage }) => {
    const [message, setMessage] = React.useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className='rounded-lg' style={{ height: '80vh', flex: 1, display: 'flex', flexDirection: 'column', padding: '10px', backgroundColor: '#ECECEC'}}>
            <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '30px',paddingTop:'15px', marginBottom: '10px', display: 'flex', alignItems: 'center', paddingLeft:'15px' }}>
                <img className="h-14 w-14 rounded-full" src="https://randomuser.me/api/portraits/women/8.jpg" alt="Lindsay Ferguson" style={{ borderRadius: '50%', marginRight: '10px' }} />
                <div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>Jaxon Elridge</p>
                    <p style={{ margin: 0, color: '#e74c3c' }}>On call</p>
                </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
                {chatRows}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Start writing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ flex: 1, padding: '10px' }}
                />
                <button onClick={handleSendMessage} style={{ padding: '10px', marginLeft: '10px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
