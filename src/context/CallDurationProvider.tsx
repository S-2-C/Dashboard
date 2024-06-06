'use client';
// context/CallDurationContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface CallDurationContextProps {
    callDuration: number;
    setCallDuration: React.Dispatch<React.SetStateAction<number>>;
}

const CallDurationContext = createContext<CallDurationContextProps | undefined>(undefined);

interface CallDurationProviderProps {
    children: ReactNode;
}

export const CallDurationProvider: React.FC<CallDurationProviderProps> = ({ children }) => {
    const [callDuration, setCallDuration] = useState<number>(0); // Adjust the initial state as needed

    return (
        <CallDurationContext.Provider value={{ callDuration, setCallDuration }}>
            {children}
        </CallDurationContext.Provider>
    );
};

export const useCallDuration = () => {
    const context = useContext(CallDurationContext);
    if (!context) {
        throw new Error('useCallDuration must be used within a CallDurationProvider');
    }
    return context;
};
