"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateRangeType } from "react-tailwindcss-datepicker";
import DownloadPdfButton from "./downloadPdfButton";

const NewReport = ({ props, onSave, onDelete }: any) => {
  const [value, setValue] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(11))
  });

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(props.attributes || []);
  const [selectedChannel, setSelectedChannel] = useState<string>(props.channel?.id || "46bf33f7-3381-4db1-a3f7-85eafdf04578");

  const handleValueChange = (newValue :any) => {
    setValue(newValue);
  };

  const queueAttributes = [
    "AGENT_ANSWER_RATE",
    "AVG_CONTACT_DURATION",
    "AVG_HANDLE_TIME",
    "AVG_HOLD_TIME",
    "CONTACTS_HANDLED",
    "AVG_INTERRUPTIONS_AGENT",
    "AGENT_OCCUPANCY",
    "SUM_NON_PRODUCTIVE_TIME_AGENT",
    "AGENT_NON_RESPONSE",
  ];

  const channelIds = [
    { id: "46bf33f7-3381-4db1-a3f7-85eafdf04578", name: "Walmart Delivery" },
    { id: "4948d5e2-1434-44dd-a78f-37cbeb96d1d9", name: "Walmart Online" },
    { id: "f617a7d6-2be6-4f9b-b365-600fd3fc8646", name: "Walmart Physical Store" },
    { id: "fe0bd989-c3d1-4959-a47c-b7d27def9a99", name: "Walmart Pass" },
  ];

  const handleSave = () => {
    onSave({
      ...props,
      title,
      description,
      attributes: selectedAttributes,
      channel: channelIds.find(channel => channel.id === selectedChannel),
      date: new Date().toDateString(), // Set the date to the current date
      dateRange: value,
    });
    setIsEditing(false);
    setIsReportModalOpen(false);
  };

  const handleAttributeSelect = (attribute: string) => {
    if (!selectedAttributes.includes(attribute)) {
      setSelectedAttributes([...selectedAttributes, attribute]);
    }
  };

  const handleAttributeRemove = (attribute: string) => {
    setSelectedAttributes(selectedAttributes.filter(attr => attr !== attribute));
  };

  const filteredAttributes = queueAttributes.filter(attr =>
    attr.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedAttributes.includes(attr)
  );

  return (
    <div key={props.index} className="flex flex-col pb-4 px-5">
      <button
        className="bg-figma-figma4 h-60 w-64 m-2 p-4 flex flex-col justify-center items-center rounded-2xl shadow-lg text-center hover:bg-blue"
        onClick={() => setIsReportModalOpen(true)}
      >
        <div className="text-3xl font-bold mb-2">
          {props.title.length > 10 ? props.title.substring(0, 25) + "..." : props.title}
        </div>
        <div className="font-bold mb-2">
          {props.description.length > 30 ? props.description.substring(0, 50) + "..." : props.description}
        </div>
        <div className="text-sm text-left justify-end">
          Last Updated: {props.date}
        </div>
      </button>
      {isReportModalOpen && (
        <div className="flex justify-center items-center left-0 top-0 fixed w-screen h-screen">
          <div className="absolute w-screen h-screen backdrop-blur-lg bg-black bg-opacity-50" onClick={() => setIsReportModalOpen(false)} />
          <div className="relative w-2/3 rounded-lg shadow-white overflow-y-scroll no-scrollbar shadow-md bg-stone-200 border-white z-[9999] p-10">
            <button className="absolute top-5 right-5 hover:scale-125 hover:text-red-600 transition-all ease-in" onClick={() => setIsReportModalOpen(false)}>X</button>
            <div className="sticky -top-10 py-5 bg-stone-200">
              {isEditing ? (
                <div className="flex flex-col">
                  <p className="text-base font-extralight pb-1">
                    {new Date().toDateString()}
                  </p>
                  <input
                    className="text-2xl font-bold"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br/>
                  <textarea
                    className="text-base font-extralight pb-1"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className=" py-3">
                    <h2>Select range</h2>
                    <Datepicker value={value} onChange={handleValueChange} />
                  </div>
                  <h3>Select Queue</h3>
                  <div className="flex justify-between pb-1">
                    {channelIds.map(channel => (
                      <button 
                        key={channel.id} 
                        className={`flex w-full border border-black justify-center items-center mb-2 ${selectedChannel === channel.id ? 'bg-neutral-300 shadow-md' : 'bg-neutral-100'}`}
                        onClick={() => setSelectedChannel(channel.id)}
                      >
                        <span>{channel.name}</span>
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Search attributes"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2 p-2 border border-gray-300 rounded"
                  />
                  <div className="mb-4 overflow-y-scroll h-28">
                    {filteredAttributes.map(attr => (
                      <div key={attr} className="flex justify-between items-center mb-2">
                        <span>{attr}</span>
                        <button
                          className="ml-2 p-1 bg-green-500 text-white rounded"
                          onClick={() => handleAttributeSelect(attr)}
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Selected Attributes:</h2>
                    <div className=" h-28 overflow-y-scroll">
                    {selectedAttributes.map(attr => (
                      <div key={attr} className="flex justify-between items-center mb-2">
                        <span>{attr}</span>
                        <button
                          className="ml-2 p-1 bg-red-500 text-white rounded"
                          onClick={() => handleAttributeRemove(attr)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    </div>  
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{props.title}</h1>
                  <p className="text-base font-extralight pb-1">{props.description}</p>
                  <h2 className=" font-bold text-lg">Queue:</h2>
                  <p className="text-base font-extralight pb-1"> {props.channel?.name}</p>
                  <h2 className=" font-bold text-lg">Date Range:</h2>
                  <p className="text-base font-extralight pb-3">  {value?.startDate?.toString()} - {value?.endDate?.toString()}</p>
                  <div>
                    <h2 className="text-lg font-bold">Selected Attributes:</h2>
                    {selectedAttributes.map(attr => (
                      <div key={attr} className="flex justify-between items-center mb-2">
                        <span>{attr}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-base font-extralight pb-1">Last updated at: {props.date}</p>

                  <DownloadPdfButton rangeDate={value} relevantKPI={selectedAttributes} title={props.title} description={props.description} date={props.date} />
                </>
              )}
            </div>
            <div className="flex justify-between items-center">
              {isEditing ? (
                <button className="text-lg rounded-sm bg-slate-500 p-2 text-white hover:scale-105 ease-in transition-all" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="text-lg hover:text-neutral-400" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              )}
              <button className="text-lg text-red-600 hover:text-red-800 " onClick={onDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default NewReport;
