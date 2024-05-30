"use client";
import React, { useState } from "react";

const NewReport = ({ props, onSave, onDelete }: any) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const handleSave = () => {
    onSave({
      ...props,
      title,
      description,
      date: new Date().toDateString(), // Set the date to the current date
    });
    setIsEditing(false);
    setIsReportModalOpen(false);
  };

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
          <div className="relative w-2/3 h-2/3 rounded-lg shadow-white overflow-y-scroll no-scrollbar shadow-md bg-stone-200 border-white z-[9999] p-10">
            <button className="absolute top-5 right-5 hover:scale-125 hover:text-red-600 transition-all ease-in" onClick={() => setIsReportModalOpen(false)}>X</button>
            <div className="sticky -top-10 py-5 bg-stone-200">
              {isEditing ? (
                <div className="flex flex-col">
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
                  <br/>
                  <p className="text-base font-extralight pb-1">
                    {new Date().toDateString()}
                  </p>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{props.title}</h1>
                  <p className="text-base font-extralight pb-1">{props.description}</p>
                  <p className="text-base font-extralight pb-1">{props.date}</p>
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
