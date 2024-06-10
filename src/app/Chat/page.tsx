"use client";

import React, { useEffect, useState } from "react";
import { App as SendbirdApp } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useUserRole } from "@/hooks/useUserRole";

const Chat = () => {
  const agent = useUserRole();
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (agent) {
      // remove everything after the @ symbol
      const userId = agent?.arn.split("-").pop() || "";
      setUserId(userId);
    }
    if (agent?.name) {
      setNickname(agent.name);
    }
  }, [agent]);

  const myColorSet = {
    "--sendbird-light-primary-500": "#210F34",
    "--sendbird-light-primary-400": "#0E365D",
    "--sendbird-light-primary-300": "#146594",
    "--sendbird-light-primary-200": "#A1D1EC",
    "--sendbird-light-primary-100": "#DEF0FC",
  };

  return (
    // The chat interface can expand up to the dimensions of your parent component.
    // To achieve a full-screen mode, apply the following CSS rules to the parent element.
    <div className="h-screen w-screen bg-background text-foreground relative items-center justify-end flex ">
      {userId && (
        <div className=" w-[95%] h-full ">
          <SendbirdApp
            colorSet={myColorSet}
            // You can find your Sendbird application ID on the Sendbird dashboard.
            appId={"FE360E02-367D-43E1-96BC-EC4E38681455"}
            // Specify the user ID you've created on the dashboard.
            // Or you can create a user by specifying a unique userId.
            userId={userId}
            nickname={nickname}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
