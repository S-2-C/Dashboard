'use client';
import React, { useEffect, useState } from 'react';
import { Heading } from "@aws-amplify/ui-react";
import DateInputComponent from '@/components/DateInputComponent';
import SearchBar from '../searchBar';

const App: React.FC = () => {
    const [dateResponse, setDateResponse] = useState<any>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [transcript, setTranscript] = useState<any>(null);
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

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
        if (selectedContactId === contactId) {
            setSelectedContactId(null);
            setTranscript(null);
            return;
        }
        const response = await fetch(`/historicCalls/getCallAnalysis?date=${date}&contactId=${contactId}`, {
            method: "GET"
        });
        const data = await response.json();
        setTranscript({
            contactId: contactId,
            data: data.data
        });
        setSelectedContactId(contactId);
    };

    return (
        <div className="flex h-screen bg-background text-foreground relative">
            <div className="flex flex-col items-center justify-start flex-1 p-10 ml-20">
                <div className="flex justify-between items-center mb-6 w-full">
                    <Heading level={1} fontWeight="bold">
                        Historic Calls
                    </Heading>
                    <SearchBar />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full w-full">
                    {/* Date selection and audio files column */}
                    <div className="col-span-1 w-full flex flex-col">
                        <div className="w-full mb-4 h-20">
                            <DateInputComponent setResponse={setDateResponse} date={date} setDate={setDate} />
                        </div>
                        <div className="w-full mb-4">
                            <Heading level={4} fontWeight="semibold">
                                Audio Files
                            </Heading>
                        </div>
                        <div className="w-full flex-grow">
                            {dateResponse ? (
                                <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
                                    {dateResponse.data.contactIds.map((contactId: string, index: number) => (
                                        <div
                                            key={contactId}
                                            className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedContactId === contactId ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-blue-50'}`}
                                            onClick={() => handleTranscript(contactId)}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-md font-bold">
                                                    Call number {index + 1}
                                                </p>
                                            </div>
                                            <div className="w-full flex justify-center items-center">
                                                <audio id={`audioPlayer${contactId}`} controls preload="metadata" className="w-full h-12">
                                                    Your browser does not support the audio element.
                                                </audio>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 rounded-lg border border-gray-300 bg-blue-50 text-center shadow-md w-full h-full flex items-center justify-center">
                                    <p className="text-gray-500">Select a date</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Transcript column */}
                    <div className="col-span-1 lg:col-span-2 flex flex-col">
                        <div className="w-full mb-4">
                            <Heading level={4} fontWeight="semibold">
                                Transcript
                            </Heading>
                        </div>
                        <div className={`flex-grow w-full rounded-lg overflow-y-auto border border-gray-300 ${transcript && selectedContactId ? 'bg-gray-100' : 'bg-white'} shadow-md`} style={{ padding: '1rem', minHeight: '70vh' }}>
                            {transcript && selectedContactId ? (
                                transcript.data && transcript.data.map((t: any, index: number) => (
                                    <div key={index} className="my-2">
                                        <p className="text-gray-700">
                                            <span className="font-bold">
                                                {t.ParticipantId}:{" "}
                                            </span>
                                            <span
                                                className={
                                                    t.Sentiment === 'POSITIVE' ? 'text-green-500' :
                                                        t.Sentiment === 'NEGATIVE' ? 'text-red-500' :
                                                            'text-gray-500' // default color
                                                }
                                            >
                                                {t.Content}
                                            </span>
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 rounded-lg border border-gray-300 bg-blue-50 text-center shadow-md w-full h-full flex items-center justify-center">
                                    <p className="text-gray-500">{selectedContactId ? "Select an audio file" : "Select a date"}</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
