"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChatClient } from './ChatClient';
import { Button, Flex, View, Text } from '@aws-amplify/ui-react';

const URL = 'wss://6roylhz4w6.execute-api.us-east-1.amazonaws.com/production/';

function extractEmailsFromLocalStorage() {

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('CognitoIdentityServiceProvider') && key.endsWith('signInDetails')) {
      console.log("Key found:", key);
      // Get json from local storage
      const json = JSON.parse(localStorage.getItem(key) || '{}');
      return json.loginId;
    }
  }
  return '';
}

const Chat = () => {
  const socket = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState<string[]>(['']);
  const [chatRows, setChatRows] = useState<React.ReactNode[]>([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = extractEmailsFromLocalStorage();
    if (email) {
      setUserEmail(email);
      console.log("Email found:", email);
    }
  }
    , []);

  useEffect(() => {
    console.log("Attempting to connect to WebSocket...");
    socket.current = new WebSocket(URL);
    socket.current.onopen = () => {
      console.log("WebSocket connection established.");
      console.log("User email:", userEmail);
      setIsConnected(true);
      if (userEmail) {
        console.log(`Setting name: ${userEmail}`);

        const payload = { action: 'setName', "name": userEmail };
        console.log("Sending payload:", payload);
        socket.current?.send(JSON.stringify(payload));
      }
    };
    socket.current.onmessage = (event) => {
      console.log("Message received:", event.data);
      const data = JSON.parse(event.data);
      if (data.members) {
        console.log("Updating members list:", data.members);
        setMembers(data.members);
      } else if (data.publicMessage) {
        console.log("Displaying public message:", data.publicMessage);
        setChatRows(oldArray => [...oldArray, <Text key={oldArray.length}><b>{data.publicMessage}</b></Text>]);
      } else if (data.privateMessage) {
        console.log("Displaying private message:", data.privateMessage);
        alert(data.privateMessage);
      }
    };
    socket.current.onclose = () => {
      console.log("WebSocket connection closed.");
      setIsConnected(false);
      setMembers([]);
      setChatRows([]);
    };

    return () => {
      console.log("Cleaning up WebSocket connection...");
      socket.current?.close();
    };
  }, [userEmail]);

  const sendPublicMessage = useCallback(() => {
    const message = prompt('Enter public message');
    if (message) {
      console.log(`Sending public message: ${message}`);
      socket.current?.send(JSON.stringify({ action: 'sendPublic', message }));
    }
  }, []);

  const sendPrivateMessage = useCallback((to: string) => {
    const message = prompt(`Enter private message for ${to}`);
    if (message) {
      console.log(`Sending private message to ${to}: ${message}`);
      socket.current?.send(JSON.stringify({ action: 'sendPrivate', message, to }));
    }
  }, []);

  const disconnect = useCallback(() => {
    console.log("Disconnecting WebSocket...");
    socket.current?.close();
  }, []);

  console.log("Rendering Chat component...");

  return (
    <ChatClient
      isConnected={isConnected}
      members={members}
      chatRows={chatRows}
      onPublicMessage={sendPublicMessage}
      onPrivateMessage={sendPrivateMessage}
      email={userEmail}
      onConnect={() => { }}
      onDisconnect={disconnect}
    />
  );
}

export default Chat;
