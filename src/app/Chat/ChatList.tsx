import React, { useState, useEffect } from 'react';

interface ChatListProps {
    members: { name: string, lastMessage: string, avatar: string }[];
}

const ChatList: React.FC<ChatListProps> = ({ members }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMembers, setFilteredMembers] = useState(members);

    useEffect(() => {
        setFilteredMembers(
            members.filter(member =>
                member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, members]);

    return (
        <div className='scroll-smooth scrollbar-hide rounded-lg' style={{ width: '100%', padding: '10px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column',  backgroundColor: '#ECECEC'}}>
            <input
                className='rounded-lg'
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px'}}
            />
            {filteredMembers.map(member => (
                <div className='transition-transform transform hover:scale-105 hover:bg-gray-300' key={member.name} style={{ display: 'flex', alignItems: 'center', padding: '10px 0px 10px 10px' }}>
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
