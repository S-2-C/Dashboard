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

    const [seeListOfUsers, setSeeListOfUsers] = React.useState(false);

    return (
        <Flex direction="column" style={{ height: '100vh', width: '100%' }}>
            <Flex direction="row" style={{ height: '100%', backgroundColor: '#FFFFFF' }}>
                <Flex direction="column" style={{ width: '20%', backgroundColor: '#367BC1', color: 'white' }}>
                    <Button isFullWidth onClick={() => setSeeListOfUsers(!seeListOfUsers)}>
                        + New Chat
                    </Button>
                    {seeListOfUsers &&
                        <ul className="transition-height duration-500 ease-in-out">
                            {members.map((item, index) => (
                                <li>
                                    <Button key={index} onClick={() => onPrivateMessage(item)} isFullWidth>
                                        {item}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    }
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