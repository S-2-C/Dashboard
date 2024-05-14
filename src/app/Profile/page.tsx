import React from 'react';
//import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import Home from "../NavBar"
import "@aws-amplify/ui-react/styles.css";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator"
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


const profileData = {
    title: 'Supervisor Walmart® Call Center',
    name: 'Emily Smith',
    email: 'smith.e@walmart.com',
    location: 'Mexico City, Mexico',
    ID: '123456',
    profileImage: 'https://orlandosydney.com/wp-content/uploads/2023/05/Female-Professional-Headshot.-LinkedIn-Business-Profile.-By-Orlandosydney.com-202300752.jpg',
    avatarImages: "images/S2C Logo.svg"
};

export default function Profile() {

    return (
        <div className="flex h-screen bg-background text-foreground relative">
            <Home />
            <div className="flex flex-col bg-background text-foreground h-screen ml-20">
                {/* Sección superior */}
                <div className="flex m-20">
                    {/* Imagen de perfil */}
                    <div>
                        <img
                            src={profileData.profileImage}
                            alt="Imagen de perfil"
                            style={{ width: '250px', height: '250px', borderRadius: '50%', objectFit: 'cover' }}
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
                    </div>
                </div>
                {/* Sección inferior */}
                <div className="flex ml-20">
                    {/* Agentes */}
                    <div className=' p-5 w-3/4 bg-gray-100'>
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
                </div>
            </div>
        </div>
    );
}
