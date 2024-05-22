import React from 'react';

interface ChatListProps {
    members: { name: string, lastMessage: string, avatar: string }[];
}

const ChatList: React.FC<ChatListProps> = ({ members }) => {
    return (
        <div style={{ width: '100%', padding: '10px', overflowY: 'auto' }}>
            <input type="text" placeholder="Search" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
            {members.map(member => (
                <div key={member.name} style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                    <img src={member.avatar} alt={member.name} style={{ borderRadius: '50%', width: '40px', height: '40px', marginRight: '10px' }} />
                    <div>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{member.name}</p>
                        <p style={{ margin: 0, color: '#666' }}>{member.lastMessage}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatList;
