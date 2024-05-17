import React from 'react';
import { Button, Flex, Text, View } from '@aws-amplify/ui-react';

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
    return (
        <Flex direction="column" style={{ height: '100vh', width: '100%' }}>
            <Flex direction="row" style={{ height: '100%', backgroundColor: '#f4ede3' }}>
                <Flex direction="column" style={{ width: '20%', backgroundColor: '#3e103f', color: 'white' }}>
                    {members.map((item, index) => (
                        <Button key={index} onClick={() => onPrivateMessage(item)} isFullWidth variation="link">
                            {item}
                        </Button>
                    ))}
                </Flex>
                <Flex direction="column" style={{ flex: '1', padding: '10px' }}>
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