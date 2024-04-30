import React from "react";
import Home from "../NavBar"
import "@aws-amplify/ui-react/styles.css";

export default function DocumentationAgent() {

    return (
        <div className="flex h-screen bg-background text-foreground relative">
            <Home />
            <div className='flex flex-col ml-40 mr-40'>
                <h1 className='mt-20 mb-5 text-5xl font-bold'>Documentation</h1>
                <div className="h-12 flex mb-5 ">
                    <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                        All
                    </button>
                    <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                        Sales
                    </button>
                    <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                        Walmart.com
                    </button>
                    <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                        Walmart Express
                    </button>
                    <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                        Agent Training
                    </button>
                    <button className="w-36 bg-blue p-2 text-figma-figma1 rounded-2xl shadow-md mr-2 flex justify-center items-center hover:bg-figma-figma6">
                        FAQ
                    </button>
                </div>
                <div className='flex bg-figma-figma4 p-4 rounded-lg shadow-lg'>
                    <div className='flex flex-col w-1/2 pl-8 items-center justify-center items-center'>
                        <h1 className='text-figma-figma7 text-5xl font-bold text-center'>FAQ</h1>
                        <h1 className='text-figma-figma7 pt-2 w-auto text-2xl font-bold text-center'>Phone Sales</h1>
                    </div>
                    <p className='text-figma-figma7 px-20 text-l font-bold justify-center'>Here, you’ll find answers to some of the most common
                        questions regarding our phone sales services. Whether you're interested in
                        signing up for new services, need details about our product offerings,
                        or have questions about the security of your transactions, we've
                        got you covered.
                    </p>
                </div>
                <div className='flex bg-figma-figma4 p-4 pl-8 mt-5 rounded-lg shadow-lg justify-center items-center'>
                    <h1 className='text-figma-figma7 w-1/2 text-5xl font-bold text-center'>Sentiment Analysis</h1>
                    <p className='text-figma-figma7 px-5 text-l font-bold'>Within these pages, you will embark on a
                        journey through the fundamentals of sentiment analysis, unraveling its significance and exploring effective strategies
                        to leverage this powerful tool for your benefit. Sentiment analysis, at its core, offers a window into the emotions and
                        opinions expressed in text data, enabling businesses and individuals alike to glean insights that were once hidden in plain sight.
                    </p>
                </div>
                <div className='flex bg-figma-figma4 p-4 mt-5 rounded-lg shadow-lg'>
                    <div className='flex flex-col w-1/3 items-center justify-center text-center'>
                        <h1 className='text-figma-figma7 w-60 text-5xl font-bold'>In Store</h1>
                        <h1 className='text-figma-figma7 w-60 pt-2 text-xl font-bold'>Need to check stock?</h1>
                    </div>
                    <p className='text-figma-figma7 pl-10 text-l font-bold justify-center'>This meticulously crafted
                        manual is your step-by-step companion for efficiently determining the
                        availability of items in our store, specifically designed to streamline
                        your call resolution process.
                    </p>
                </div>
                <div className='flex bg-figma-figma4 p-4 mt-5 rounded-lg shadow-lg'>
                    <div className='flex flex-col pl-5 items-center justify-center text-center'>
                        <h1 className='text-figma-figma7 text-5xl font-bold'>FAQ</h1>
                        <h1 className='text-figma-figma7 pt-2 text-3xl font-bold'>Walmart®.com</h1>
                    </div>
                    <p className='text-figma-figma7 pl-10 text-l font-bold justify-center'>Here are frequently asked questions about Walmart®.com</p>
                </div>
            </div>
        </div>
    );
}

