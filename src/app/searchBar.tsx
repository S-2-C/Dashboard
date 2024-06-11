'use client'; // searchBar.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchOneAgent } from "@/fetching/fetchingDataFunctions";
import { GetUserQuery } from "@/API";
import { useState, useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

const SearchBar = () => {
  const [agent, setAgent] = useState<GetUserQuery["getUser"]>();
  useEffect(() => {
    async function fetchAgent() {
      const user = await fetchAuthSession(); // Function that gives me the user information tokens.signInDetails.loginId
      // @ts-ignore
      const email = user?.tokens?.signInDetails?.loginId;
      const agent = await fetchOneAgent(email);
      setAgent(agent);
    }

    fetchAgent();
  }, []);
  return (
    <div className="flex items-center max-w-xl">
      {/* <div className="relative w-full">
        <input
          className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-metrics placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
          placeholder="Search"
          type="search"
          name="search"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {/* Use the search icon image from your public folder */}
          {/* <img
            src="images/SearchIcon.svg" // Make sure the path is correct
            className="h-5 w-5" // Adjust the size as needed
            alt="Search"
          />
        </div>
      </div> */}
      <div className="flex pl-16">
        <Link href={agent?.role == "SUPERVISOR" ? "/Profile" : "/ProfileAgent"}>
          <Button className="bg-blue hover:bg-blue-dark text-blue-dark hover:text-white font-bold text-base">
            My Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
