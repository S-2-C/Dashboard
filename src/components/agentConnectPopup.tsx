"use client"

import React, { useEffect } from 'react';
import 'amazon-connect-streams';
import "./agentConnectPopup.css";
import { MicOff, Mic, Phone, PhoneCall, PhoneOff } from 'lucide-react';
import next from 'next';
 
// Extendiendo la interfaz Window para incluir 'connect'
declare global {
    interface Window {
        connect: {
            core: {
                initCCP: (container: HTMLElement, config: any) => void;
            };
        };
    }
}

const AgentConnectPopup: React.FC = () => {
    const [currentAgent, setCurrentAgent] = React.useState<connect.Agent | null>(null);
    const [agentState, setAgentState] = React.useState<string>('');
    const [incomingContact, setIncomingContact] = React.useState<connect.Contact | null>(null);
    const [isContactAccepted, setIsContactAccepted] = React.useState<boolean>(false);

    useEffect(() => {
        const ccpContainer = document.getElementById('ccp-container');
        console.log("ccpContainer: ", ccpContainer, ", window.connect:", window.connect);

        if (!ccpContainer || !window.connect || ccpContainer.firstChild) {
            return;
        }

        window.connect.core.initCCP(ccpContainer, {
            ccpUrl: 'https://ss2cc.my.connect.aws/connect/ccp-v2/',
            loginPopup: true,
            region: 'us-east-1',
            softphone: {
                allowFramedSoftphone: true
            }
        });

        window.connect.agent(function (agent) {
            console.log("agent: ", agent);
            setCurrentAgent(agent);
            agent.onStateChange(function (stateChange) {
                console.log("Agent state changed to: ", stateChange.newState);

                setAgentState(stateChange.newState);
            });
        });

        window.connect.contact(function (contact) {
            console.log("contact: ", contact);
            setIncomingContact(contact);
        });
    }, []);

const MuteButton: React.FC = () => {
    const [isMuted, setIsMuted] = React.useState(false);

    // Function to mute/unmute agent
    const muteAgent = (action: 'mute' | 'unmute') => {
        const agent = new connect.Agent();
        const contact = agent.getContacts(connect.ContactType.VOICE)?.[0];

        // Get all open active connections
        const activeConnections = contact?.getConnections().filter((conn) => conn.isActive()) || [];

        if (activeConnections.length === 0) {
            console.log("No Active Connections to mute");
            return;
        }

        // Check if we are using multiparty and see if there more than 2 active connections
        if (contact.isMultiPartyConferenceEnabled() && activeConnections.length > 2) {
            // if any of those are in connecting mode
            const connectingConnections = contact?.getConnections().filter((conn) => conn.isConnecting()) || [];
            if (connectingConnections.length === 0) {
                console.log("Agent Connection is muted at the server side");
                if (action === 'mute') {
                    // contact.getAgentConnection().muteParticipant();
                } else {
                    // contact.getAgentConnection().unmuteParticipant();
                }
            } else {
                console.log("Agent Connection cannot be muted while multi party participant is connecting");
            }
        } else {
            console.log("Agent connection muted at the client side");
            if (action === 'mute') {
                agent.mute();
            } else {
                agent.unmute();
            }
        }
    };

    const handleClick = () => {
        setIsMuted(prevState => {
            const newState = !prevState;
            muteAgent(newState ? 'mute' : 'unmute');
            return newState;
        });
    };

    return (
        <button onClick={handleClick}>{isMuted ? 'Unmute' : 'Mute'}</button>
    );
};

    const changeAgentState = (targetState: string) => {
        // Usamos la función callback para obtener la referencia del agente
        window.connect.agent(agent => {
            console.log('Agent:', agent);

            const states = agent.getAgentStates();
            console.log('States:', states);

            const desiredState = states.find(state => state.name === targetState);
            if (desiredState && currentAgent) {
                currentAgent.setState(desiredState, {
                    success: () => {
                        setAgentState(desiredState.name);
                        console.log(`State changed to ${desiredState.name}`);
                    },
                    failure: (err) => {
                        console.error('Failed to change state:', err);
                    }
                }, { enqueueNextState: false });
            }
        });
    };

    const [callTime, setCallTime] = React.useState<number>(0); // Estado para almacenar el tiempo de llamada

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isContactAccepted) {
            intervalId = setInterval(() => {
                setCallTime(prevTime => prevTime + 1); // Incrementa el tiempo cada segundo
            }, 1000);
        } else {
            setCallTime(0); // Resetea el tiempo cuando la llamada no está aceptada
        }

        return () => {
            clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta o cambia el estado de aceptación
        };
    }, [isContactAccepted]);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className={`absolute transition-all duration-300 ${incomingContact ? "top-3" : "-top-16"} left-1/2 transform -translate-x-1/2`}>
                <div className="bg-white bg-opacity-90 border border-gray-200 rounded-lg shadow-lg p-3 flex flex-row space-x-4 items-center">
                    {(!isContactAccepted) ?
                        <>
                            <h1 className="text-lg font-semibold text-gray-800 mr-6">
                                Incoming Call
                            </h1>
                            <button
                                onClick={() => {
                                    incomingContact?.accept()
                                    setIsContactAccepted(true)
                                }}
                                className="px-3 text-center text-white text-sm bg-green-800 border border-green-900 rounded-full shadow-lg py-3 cursor-pointer hover:bg-green-600 hover:animate-none transition duration-200"
                            >
                            <PhoneCall className='animate-wiggle'/>
                            </button>
                            <button
                                onClick={() => {
                                    incomingContact?.reject()
                                    setIsContactAccepted(false)
                                    setIncomingContact(null)
                                }}
                                className="px-3 text-center text-white text-sm bg-red-500 border border-red-600 rounded-full shadow-lg py-3 cursor-pointer hover:bg-red-600 transition duration-200"
                            >
                            <Phone className='animate-spinBackAndForth'/>
                            </button>
                        </> : (incomingContact && isContactAccepted) ?
                            <>
                                <h1 className="text-lg font-semibold text-gray-800 mr-6">
                                    Call Accepted &nbsp;
                                    <span className="text-gray-400">({formatTime(callTime)})</span>
                                </h1>
                                <MuteButton />
                                <button
                                    onClick={() => {
                                        incomingContact?.getAgentConnection().destroy()
                                        setIsContactAccepted(false)
                                        setIncomingContact(null)
                                        // wait for 1 second before changing the agent state
                                        setTimeout(() => {
                                            changeAgentState('Available')
                                        }, 1000);
                                    }}
                                    className="px-3 text-center text-white text-sm bg-red-500 border border-red-600 rounded-full shadow-lg py-3 cursor-pointer hover:bg-red-600 transition duration-200"
                                >
                                <Phone className='animate-spinBackAndForth'/>
                                </button>
                            </> : null
                    }
                </div>
            </div>
            <div className="absolute bottom-1 right-1">
                {currentAgent ?
                    <div className="flex flex-col justify-center items-center">
                        {agentState === 'Available' ?
                            <div
                                onClick={() => {
                                    if (incomingContact && isContactAccepted) {
                                        return;
                                    }
                                    changeAgentState('Offline')
                                }}
                                className={`px-3 mb-2 text-center text-sm border rounded-lg shadow-lg py-1 flex items-center ${(incomingContact && isContactAccepted) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'cursor-pointer hover:border-blue-300 hover:shadow-md bg-blue-100 hover:bg-blue-200 transition duration-200 hover:text-blue-800 border-blue-200 text-gray-800'}`}
                            >
                                Go Offline
                                <span className="text-red-500 text-2xl ml-2">
                                    ●
                                </span>
                            </div> :
                            <div
                                onClick={() => {
                                    if (incomingContact && isContactAccepted) {
                                        return;
                                    }
                                    changeAgentState('Available')
                                }}
                                className={`px-3 mb-2 text-center text-sm border rounded-lg shadow-lg py-1 flex items-center ${(incomingContact && isContactAccepted) ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'cursor-pointer hover:border-blue-300 hover:shadow-md bg-blue-100 hover:bg-blue-200 transition duration-200 hover:text-blue-800 border-blue-200 text-gray-800'}`}
                            >
                                Go Available
                                <span className="text-green-500 text-2xl ml-2">
                                    ●
                                </span>
                            </div>
                        }
                        <p className="px-3 text-center text-gray-500 text-sm bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                            You are connected to Amazon Connect.

                        </p>
                    </div>
                    : <p className="px-3 text-center text-gray-500 text-sm bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                        Connecting to Amazon Connect
                        <span className="loadingAnimation">...</span>
                    </p>
                }
                <div id="ccp-container" style={{ display: 'none' }}></div>
            </div>
        </>
    );
};

export default AgentConnectPopup;