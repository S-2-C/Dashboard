import React from 'react';
import { Button, Flex, Text, View } from '@aws-amplify/ui-react';
import Home from '../NavBar';
import StoryTypeMenu from './StoryTypeMenu';

interface ChatClientProps {
    isConnected: boolean;
    members: string[];
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

    return (
        <Flex direction="column" style={{ height: '100vh', width: '100%' }}>
            <Flex direction="row" style={{ height: '100%', backgroundColor: '#FFFFFF' }}>
                <Flex direction="column" style={{ zIndex: 10 }}><Home /></Flex>
                <Flex direction="column" style={{flex: '1', marginLeft: '65px', padding: '10px', position: 'relative', zIndex: 5 }}>
                    <Text style={{ fontWeight: 600, fontSize: 25, marginLeft: '10px'}}>Messages</Text>
                    <Flex style={{ width: '100%', display: 'flex', justifyContent: 'left' }}>
                        <StoryTypeMenu />
                    </Flex>
                    <View style={{ overflowY: 'scroll', marginBottom: '20px' }}>
                        {chatRows.map((item, index) => (
                            <Text key={index} style={{ margin: '10px 0' }}>
                                {item}
                            </Text>
                        ))}
                    </View>
                    <Flex direction="row" justifyContent="space-between">
                        <Button onClick={onPublicMessage} disabled={!isConnected}>Send Public Message</Button>
                        <Button onClick={onDisconnect} disabled={!isConnected}>Disconnect</Button>
                        <Button onClick={onConnect} disabled={isConnected}>Connect</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ChatClient;
