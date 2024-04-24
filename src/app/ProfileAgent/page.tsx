import React from 'react';
//import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import Home from "../NavBar"
import "@aws-amplify/ui-react/styles.css";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator"
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Badge } from "@/components/ui/badge";

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

export default function Profile() {

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
                            <label>{profileData.name}</label>
                        </div>
                        <Separator />
                        <div className="text-xl m-5">
                            <label>{profileData.title}</label>
                        </div>
                        <div className='flex m-5'>
                            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-7" />
                            <label className='ml-3'> {profileData.email} </label>
                        </div >
                        <div className="m-5">
                            <label>Location: {profileData.location}</label>
                        </div>
                        <div className="m-5">
                            <label>Employee ID: {profileData.ID}</label>
                        </div>
                        <div className="m-5 ml-10 ">
                            <Badge variant="outline" className='text-lg transform w-3/4 justify-center bg-green-600 text-white'>{profileData.status}</Badge>
                        </div>
                    </div>
                </div>
                {/* Sección inferior */}
                <div className="flex ml-20 w-3/4 items-center">
                    {/* Agentes */}
                    <div className=' p-5 w-1/2 bg-gray-100'>
                        <div className='font-bold text-xl mb-2 '>Agents</div>
                        <Separator />
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1" className='mt-2'>
                                <AccordionTrigger className='ml-2'>Walmart®.com </AccordionTrigger>
                                <AccordionContent className='bg-gray-300 p-5 hover:bg-gray-400'>
                                    <div className='flex'>
                                        <img
                                            src={profileData.avatarImages}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover" />
                                        <label className='ml-3 mt-2'> Richard Hendricks </label>
                                    </div>
                                </AccordionContent>
                                <AccordionContent className='bg-gray-300 p-5 hover:bg-gray-400'>
                                    <div className='flex'>
                                        <img
                                            src={profileData.avatarImages}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover" />
                                        <label className='ml-3 mt-2'> Dinesh Chugtai </label>
                                    </div>
                                </AccordionContent>
                            </AccordionItem >
                            <AccordionItem value="item-2" className='mt-2'>
                                <AccordionTrigger className='ml-2'>Walmart® Express </AccordionTrigger>
                                <AccordionContent className='bg-gray-300 p-5 hover:bg-gray-400'>
                                    <div className='flex'>
                                        <img
                                            src={profileData.avatarImages}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover" />
                                        <label className='ml-3 mt-2'> Jared Dunn </label>
                                    </div>
                                </AccordionContent>
                                <AccordionContent className='bg-gray-300 p-5 hover:bg-gray-400'>
                                    <div className='flex'>
                                        <img
                                            src={profileData.avatarImages}
                                            alt="profile"
                                            className="w-10 h-10 rounded-full object-cover" />
                                        <label className='ml-3 mt-2'> Monica Hall </label>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3" className='mt-2'>
                                <AccordionTrigger className='ml-2'>Walmart® Pass </AccordionTrigger>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div>
                        {/* Performance */}
                        <div className='flex flex-col'>
                            <div className='ml-10 w-80 h-40 bg-gray-100 flex flex-col justify-center items-center shadow-md'>
                                
                                <label className='text-2xl font-bold p-3'> Taken Calls:</label>
                                <label className='text-2xl font-bold text-blue-600'> {performanceData.takenCalls}</label>
                            </div>
                            <div className='ml-10 mt-5 w-80 h-40 bg-gray-100 flex flex-col justify-center items-center shadow-top-md'>
                                
                                <label className='text-2xl font-bold p-3'>Average on Call:</label>
                                <label className='text-2xl font-bold text-green-600'> {performanceData.averageOnCall}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
