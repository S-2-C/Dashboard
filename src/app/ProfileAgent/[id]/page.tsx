"use client"
import React, { useEffect, useState } from 'react';
//import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import Home from "../../NavBar"
import "@aws-amplify/ui-react/styles.css";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator"
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Badge } from "@/components/ui/badge";
import { fetchAuthSession } from 'aws-amplify/auth';
import { fetchOneAgent } from '@/fetching/fetchingDataFunctions';
import { User } from "@/API";
import { formatDateToMexicanTimezone, timeDifference } from '@/functions/timeFunctions';

// cambiar color del badge por status

const profileData = {
    title: 'Agent Walmart® Call Center',
    name: 'Dinesh Chugtai',
    email: 'dinesh.c@walmart.com',
    location: 'Mexico City, Mexico',
    ID: '123456',
    profileImage: 'https://monteliphotography.com/wp-content/uploads/2022/04/Monteli-Photography-Retrato-Profesional-Barcelona-1.jpg',
    avatarImages: "images/S2C Logo.svg",
    status: 'Available'
};



    const performanceData = {
        takenCalls: '183',
        averageOnCall: '15 minutes'
    }

export default function Profile({ params }: { params: { id: string } }) {
    const [agent, setAgent] = useState<User>();
    const [averageCallTime, setAverageCallTime] = useState<number>(0);

    useEffect(() => {
        async function fetchAgent() {
          // const res = await fetchOneAgent(params.id);
 
          const agent = await fetchOneAgent(params.id);

          let sum = 0

          for (let x of agent.Contacts.items) {
            console.log("x", x);
            sum += timeDifference(x.callStart, x.callEnd);
          }

            setAverageCallTime( Math.ceil(sum / agent.Contacts.items.length));
          setAgent(agent);
        }
    
        fetchAgent();



      }, []);

    if (!agent) return null;

    return (
        <div className="flex h-screen bg-background text-foreground relative items-center">
            <Home />
            <div className="flex flex-col bg-background text-foreground h-screen w-screen items-center">
                {/* Sección superior */}
                <div className="flex ml-20 mr-20 mt-20 mb-10">
                    {/* Imagen de perfil */}
                    <div>
                        <img
                            src={profileData.profileImage}
                            alt="Imagen de perfil"
                            style={{ width: '300px', height: '300px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    </div>
                    {/* Información personal */}
                    <div className="ml-20">
                        <div className='text-3xl font-bold m-5'>
                            <label>{ agent?.name}</label>
                        </div>
                        <Separator />
                        <div className="text-xl m-5">
                            <label>{agent?.role == "AGENT"? "Agent" : "Supervisor"}</label>
                        </div>
                        <div className='flex m-5'>
                            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-7" />
                            <label className='ml-3'> { agent?.id} </label>
                        </div >
                        <div className="m-5">
                            <label>Location: Mexico City, Mexico</label>
                        </div>
                        <div className="m-5">
                            <label>Employee ID: { agent?.arn.split("-").pop()}</label>
                        </div>
                        <div className="m-5 ml-10 ">
                            <Badge className={`text-lg transform w-3/4 justify-center ${agent?.isOnCall? "bg-red-800" : "bg-green-700"} text-white`}>{ agent?.isOnCall? "Occupied" : "Available"}</Badge>
                        </div>
                    </div>
                </div>
                {/* Sección inferior */}
                <div className="flex ml-20 w-3/4 items-center">
                    {/* Agentes */}
                    <div className=' p-5 w-1/2 bg-gray-100 mb-9'>
                        <div className='font-bold text-xl mb-6'>Historic Calls</div>
                        <Accordion type="single" collapsible>
                        {agent?.Contacts?.items.map((call, index) => (
                        <AccordionItem value={`item-${index}`} className='mt-2'>
                            <AccordionTrigger className='ml-2'> {call?.id.split("-")[0]} </AccordionTrigger>
                            <AccordionContent className='bg-gray-300 p-5 hover:bg-gray-400'>
                                <div className='flex justify-between items-center'>
                                    <img
                                        src={profileData.avatarImages}
                                        alt="profile"
                                        className="w-10 h-10 rounded-full object-cover" />
                                    <h3>{formatDateToMexicanTimezone(new Date(call?.createdAt ?? Date.now()))}</h3>
                                    <h3 className={`${call?.callStart && call?.callEnd && (timeDifference(new Date(call.callStart), new Date(call.callEnd)) > 20)  ? "text-red-700" : "text-green-700" }`}>
                                        {call?.callStart && call?.callEnd ? timeDifference(new Date(call.callStart), new Date(call.callEnd)) + "min" : 'N/A'}
                                    </h3>
                                </div>
                            </AccordionContent>
                        </AccordionItem >
                        ))} 
                        </Accordion>

                        
                    </div>
                    <div>
                        {/* Performance */}
                        <div className='flex flex-col'>
                            <div className='ml-10 w-80 h-40 bg-gray-100 flex flex-col justify-center items-center shadow-md'>
                                
                                <label className='text-2xl font-bold p-3'> Taken Calls:</label>
                                <label className='text-4xl font-bold text-figma-figma1'> {agent?.Contacts?.items.length}</label>
                            </div>
                            <div className='ml-10 mt-5 w-80 h-40 bg-gray-100 flex flex-col justify-center items-center shadow-top-md'>
                                
                                <label className='text-2xl font-bold p-3'>Average on Call:</label>
                                <label className='text-3xl font-bold text-figma-figma8'> {averageCallTime} min</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
