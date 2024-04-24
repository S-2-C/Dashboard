"use client";
import React from 'react';
import Home from "../NavBar";
import { Flex, Heading, Text } from "@aws-amplify/ui-react";

export default function Metrics() {
    return (
        <div className="flex h-screen bg-background text-foreground relative">
            
            <Home />
            
            <div className="flex flex-col flex-1 p-10 ml-20">
                <Flex direction="column" gap="2rem">
                    <Heading level={1} fontWeight='Bold' >Performance Metrics</Heading>
                    <Text className="text-sans">Here are some metrics</Text>
                </Flex>
                
                {/* Añadiendo bloques de color para las métricas */}
                <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-6 flex-1">
                    {/* Bloque 1 */}
                    <div className="bg-blue-300 rounded-xl p-4 shadow-md flex flex-col">
                        <p className="text-xl font-bold mb-auto">Minutes on Call Per Agent </p>
                    </div>
                    
                    {/* Bloque 2 */}
                    <div className="bg-green-300 rounded-xl p-4 shadow-md flex flex-col">
                        <p className="text-xl font-bold mb-auto">Agent Average Performance </p>
                    </div>
                    
                    {/* Bloque 3 */}
                    <div className="bg-red-300 rounded-xl p-4 shadow-md flex flex-col">
                        <p className="text-xl font-bold mb-auto">Call Type Distribution </p>
                    </div>
                    
                    {/* Bloque 4 */}
                    <div className="bg-yellow-300 rounded-xl p-4 shadow-md flex flex-col">
                        <p className="text-xl font-bold mb-auto">Call Volume </p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
