'use client'
import React from 'react';
import AudioPlayer from './AudioPlayer';
import { Heading } from "@aws-amplify/ui-react";
import DateInputComponent from '@/components/DateInputComponent';
import { useState } from 'react';

const App: React.FC = () => {
    // Date response state
    const [dateResponse, setDateResponse] = useState<any>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const handleListen = async (contactId: string) => {
        console.log(contactId);
        // call http://localhost:3000/historicCalls/getCallAudio?date=2024-06-01&contactId=aa023c65-e1b0-4465-8fa8-fe2670ed362e
        const response = await fetch(`/historicCalls/getCallAudio?date=${date}&contactId=${contactId}`, {
          method: "GET"
        });

        const audio = await response.blob();
        const audioUrl = URL.createObjectURL(audio);
        const audioPlayer = document.getElementById("audioPlayer");
        if (!audioPlayer) {
            return;
        }
        if (!audioPlayer.src || !audioPlayer.play) {
            return;
        }
        audioPlayer.src = audioUrl;
        audioPlayer.play();
    };

    return (
        <div className="flex h-screen bg-background text-foreground relative ">
            <div className="flex flex-col flex-1 p-10 ml-20">
                <div className="flex justify-between items-center mb-6">

                    <Heading level={1} fontWeight="Bold">
                        Historic Calls
                    </Heading>
                </div>

                <h1>Audio Player</h1>
                <AudioPlayer />
                <DateInputComponent setResponse={setDateResponse} date
                {
                    dateResponse && dateResponse.data.contactIds.map((contactId: string) => (
                        <div key={contactId}>
                            <p>{contactId}</p>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleListen(contactId)}
                            >
                                Listen
                            </button>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default App;
