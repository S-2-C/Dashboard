"use client"

import React, { useEffect } from 'react';
import 'amazon-connect-streams';

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

    useEffect(() => {
        const ccpContainer = document.getElementById('ccp-container');
        console.log("ccpContainer: ", ccpContainer, ", window.connect:", window.connect);

        if (ccpContainer && !ccpContainer.firstChild && window.connect) {
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
            });
        }
    }, []);

    return (
        <div className="absolute bottom-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg">
            {currentAgent ?
                <p className="px-3 text-center text-gray-500 text-sm mb-2">
                    You are connected to Amazon Connect.
                </p> : <p className="px-3 text-center text-gray-500 text-sm mb-2">
                    Connecting to Amazon Connect...
                </p>
            }
            <div id="ccp-container" style={{ display: 'none' }}></div>
        </div>
    );
};

export default AgentConnectPopup;