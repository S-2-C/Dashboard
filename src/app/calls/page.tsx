'use client'
import React, { useEffect } from 'react';
import AudioPlayer from './AudioPlayer';
import { Heading } from "@aws-amplify/ui-react";
import DateInputComponent from '@/components/DateInputComponent';
import { useState } from 'react';

const App: React.FC = () => {
    // Date response state
    const [dateResponse, setDateResponse] = useState<any>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [transcript, setTranscript] = useState<any>(null);

    // const handleListen = async (contactId: string) => {
    //     console.log(contactId);
    //     const response = await fetch(`/historicCalls/getCallAudio?date=${date}&contactId=${contactId}`, {
    //         method: "GET"
    //     });

    //     const audio = await response.blob();
    //     const audioUrl = URL.createObjectURL(audio);
    //     const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement; // Casteo a HTMLAudioElement

    //     if (!audioPlayer) {
    //         console.error("Audio player element not found");
    //         return;
    //     }
    //     audioPlayer.src = audioUrl;
    //     audioPlayer.play();
    // };

    useEffect(() => {
        const fetchAudios = async () => {
            if (dateResponse && dateResponse.data && dateResponse.data.contactIds) {
                for (const contactId of dateResponse.data.contactIds) {
                    // set sources of every audio element
                    const audioPlayer = document.getElementById(`audioPlayer${contactId}`) as HTMLAudioElement;
                    if (!audioPlayer) {
                        console.error(`Audio player element not found for contactId: ${contactId}`);
                        return;
                    }
                    const response = await fetch(`/historicCalls/getCallAudio?date=${date}&contactId=${contactId}`, {
                        method: "GET"
                    });

                    const audio = await response.blob();
                    const audioUrl = URL.createObjectURL(audio);
                    audioPlayer.src = audioUrl;
                }
            }
        };

        fetchAudios();
    }, [dateResponse]);



    const handleTranscript = async (contactId: string) => {
        const response = await fetch(`/historicCalls/getCallAnalysis?date=${date}&contactId=${contactId}`, {
            method: "GET"
        });
        // Get data from response
        const data = await response.json();
        console.log(data);

        setTranscript(data.data);
    }


    return (
        <div className="flex h-screen bg-background text-foreground relative " >
            <div className="flex flex-col flex-1 p-10 ml-20">
                <div className="flex justify-between items-center mb-6">

                    <Heading level={1} fontWeight="Bold">
                        Historic Calls
                    </Heading>
                </div>

                <h1>Audio Player</h1>
                <AudioPlayer />
                <DateInputComponent setResponse={setDateResponse} date={date} setDate={setDate} />
                {
                    dateResponse && dateResponse.data.contactIds.map((contactId: string) => (
                        <div key={contactId}>
                            <p>{contactId}</p>
                            <audio
                                id={`audioPlayer${contactId}`}
                                controls
                                preload="metadata"
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleTranscript(contactId)}
                            >
                                Transcript
                            </button>
                        </div>
                    ))
                }
                <div className="flex flex-col w-full gap-2 h-[600px]  overflow-y-scroll no-scrollbar">
                    {
                        transcript &&
                        transcript.map((t: any, index: any) => {
                            console.log(t);
                            if (!t) return;
                            return (
                                <div>
                                    <h1>Transcript {index + 1}</h1>
                                    <p>{t.content}</p>
                                </div>
                            );
                        })}
                </div>
            </div>

        </div>
    );
};

export default App;
