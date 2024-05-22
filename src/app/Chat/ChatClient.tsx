import React from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import Home from '../NavBar';
import StoryTypeMenu from './StoryTypeMenu';
import ChatList from './ChatList'; // Import ChatList component
import ChatWindow from './ChatWindow'; // Import ChatWindow component

interface ChatClientProps {
    isConnected: boolean;
    members: { name: string, lastMessage: string, avatar: string }[];
    chatRows: React.ReactNode[];
    onPublicMessage: () => void;
    onPrivateMessage: (to: string) => void;
    onConnect: () => void;
    onDisconnect: () => void;
}

export const ChatClient: React.FC<ChatClientProps> = ({
    isConnected,
    members,
    chatRows,
    onPublicMessage,
    onPrivateMessage,
    onConnect,
    onDisconnect
}) => {

    const [seeListOfUsers, setSeeListOfUsers] = React.useState(false);

    const handleSendMessage = (message: string) => {
        // Implement the logic to handle sending a message
    };

    return (
        <Flex direction="column" style={{ height: '100vh', width: '100%' }}>
            <Flex direction="row" style={{ height: '100%', backgroundColor: '#FFFFFF' }}>
                <Flex direction="column" style={{ zIndex: 10 }}><Home /></Flex>
                <Flex direction="column" style={{ flex: 1, marginLeft: '65px', padding: '30px', position: 'relative', zIndex: 5 }}>
                    <Text style={{ fontWeight: 600, fontSize: 25, marginLeft: '10px' }}>Messages</Text>
                    <Flex style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <Flex direction="column" style={{ width: '36vw', marginRight: '20px'}}>
                            <StoryTypeMenu />
                            <ChatList members={members} />
                        </Flex>
                        <ChatWindow chatRows={chatRows} onSendMessage={handleSendMessage} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ChatClient;
