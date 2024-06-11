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
    console.log("dateResponse", date);


    const fetchHistoricCalls = async (date: string) => {
        try {
            const response = await fetch(`/historicCalls/listCallsByDate?date=${date}`, {
                method: "GET"
            });
            const data = await response.json();
            setDateResponse(data);
        } catch (error) {
            console.error('Error fetching historic calls:', error);
        }
    };

    useEffect(() => {
        // Fetch the contact IDs for the current date on initial load
        fetchHistoricCalls(date);
    }, []);

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

        setTranscript({
            contactId: contactId,
            data: data.data
        });
        console.log("transcript", transcript);
    };

    return (
        <div className="flex h-screen bg-background text-foreground relative " >
            <div className="flex flex-col items-center justify-start flex-1 p-10 ml-20">
                <div className="flex justify-between items-center mb-6">

                    <Heading level={1} fontWeight="Bold">
                        Historic Calls
                    </Heading>
                </div>

                <DateInputComponent setResponse={setDateResponse} date={date} setDate={setDate} />
                <div className="flex flex-col justify-between items-center w-full py-6">
                    {
                        dateResponse && dateResponse.data.contactIds.map((contactId: string) => (
                            <div key={contactId} className="mb-4 border-b-2 border-gray-200 bg-gray-100 p-4 rounded w-full">
                                <p className="text-xl font-bold mb-2">
                                    Contact Id: {contactId}
                                </p>
                                <div className="w-full flex justify-between items-center">
                                    <audio
                                        id={`audioPlayer${contactId}`}
                                        controls
                                        preload="metadata"
                                        className="border-2 border-gray-200 rounded"
                                    />
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleTranscript(contactId)}
                                    >
                                        Get Transcript
                                    </button>
                                </div>
                                {
                                    transcript &&
                                    transcript.contactId === contactId &&
                                    transcript.data &&
                                    transcript.data.map((t: any, index: number) => {
                                        console.log("t", t);
                                        if (!t) return null;
                                        console.log("t.Content", t.Content);

                                        let textColorClass = 'text-gray-700'; // Default color
                                        if (t.Sentiment === 'POSITIVE') {
                                            textColorClass = 'text-green-500';
                                        } else if (t.Sentiment === 'NEGATIVE') {
                                            textColorClass = 'text-red-500';
                                        }

                                        return (
                                            <div key={index} className="my-2">
                                                <p className="text-gray-700">
                                                    <span className="font-bold">
                                                        {t.ParticipantId}:{" "}
                                                    </span>
                                                    <span className={textColorClass}>
                                                        {t.Content}
                                                    </span>
                                                </p>
                                            </div>
                                        );
                                    })}

                            </div>
                        ))
                    }
                </div>
            </div>

        </div >
    );
};

export default App;
