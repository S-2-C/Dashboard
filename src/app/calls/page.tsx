'use client'
import React from 'react';
import AudioPlayer from './AudioPlayer';
import { Heading } from "@aws-amplify/ui-react";
import DateInputComponent from '@/components/DateInputComponent';
import { useState } from 'react';

const App: React.FC = () => {
    // Date response state
    const [dateResponse, setDateResponse] = useState<any>(null);

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
                <DateInputComponent setResponse={setDateResponse} />
            </div>

        </div>
    );
}

export default App;
