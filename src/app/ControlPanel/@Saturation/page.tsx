import React from "react";
import Notifications from "../../Channels/page";
import { Button, Flex, Heading, Text } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faTasks,
  faUsers,
  faCalendar,
  faComments,
  faUserTie,
  faChartLine,
  faBell,
  faBook,
  faFileAlt,
  faCog,
  faSignOutAlt,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link'

export function Saturation() {
  return (
    <div>
      <div className="w-full overflow-y-auto p-4">
        <Accordion className="" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center">
              Online Store
              <div className="bg-figma-figma8 h-4 w-4 flex justify-end rounded-2xl items-center m-1"></div>
              <div className="w-3/4 "></div>
            </AccordionTrigger>
            <div className="w-full bg-figma-figma6 rounded-full overflow-hidden shadow-md ">
              <div className="h-4 bg-figma-figma8 rounded-full w-1/2"></div>
            </div>
            <AccordionContent>
              <div className="h-20 p-1 bg-figma-figma6 flex w-full rounded-2xl shadow-md mt-2">
                <div className="mr-4  p-2 w-1/3">
                  <div>Calls in queue</div>
                  <div className="flex flex-row justify-end">
                    <div className="pr-4 w-1/3">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-figma-figma5 my-1 text-2xl"
                      />
                    </div>
                    <div className=" pt-4 w-2/3 flex justify-center">
                      <b className="text-xl">5</b>
                    </div>
                  </div>
                </div>
                <div className="mr-4  p-2 w-1/3">
                  <div>Total Agents</div>
                  <div className="flex">
                    <div className="pr-4 w-1/3">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-figma-figma5 my-1 text-2xl"
                      />
                    </div>
                    <div className=" pt-4 w-2/3 flex justify-center">
                      <b className="text-xl">5</b>
                    </div>
                  </div>
                </div>
                <div className="mr-4 p-2 w-1/3">
                  <div>Available Agents</div>
                  <div className="flex">
                    <div className="pr-4 w-1/3">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-figma-figma5 my-1 text-2xl"
                      />
                    </div>
                    <div className=" pt-4 w-2/3 flex justify-center">
                      <b className="text-xl">5</b>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion className="" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center">
              Fisical Store
              <div className="bg-figma-figma9 h-4 w-4 flex justify-end rounded-2xl items-center m-1"></div>
              <div className="w-3/4 "></div>
            </AccordionTrigger>
            <div className="w-full bg-figma-figma6 rounded-full overflow-hidden shadow-md ">
              <div className="h-4 bg-figma-figma9 rounded-full w-3/5"></div>
            </div>
            <AccordionContent>
              <div className="h-20 p-1 bg-figma-figma6 flex w-full rounded-2xl shadow-md mt-2">
                <div className="mr-4  p-2 w-1/3">
                  <div>Calls in queue</div>
                  <div className="flex flex-row justify-end">
                    <div className="pr-4 w-1/3">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-figma-figma5 my-1 text-2xl"
                      />
                    </div>
                    <div className=" pt-4 w-2/3 flex justify-center">
                      <b className="text-xl">5</b>
                    </div>
                  </div>
                </div>
                <div className="mr-4  p-2 w-1/3">
                  <div>Total Agents</div>
                  <div className="flex">
                    <div className="pr-4 w-1/3">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-figma-figma5 my-1 text-2xl"
                      />
                    </div>
                    <div className=" pt-4 w-2/3 flex justify-center">
                      <b className="text-xl">5</b>
                    </div>
                  </div>
                </div>
                <div className="mr-4 p-2 w-1/3">
                  <div>Available Agents</div>
                  <div className="flex">
                    <div className="pr-4 w-1/3">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-figma-figma5 my-1 text-2xl"
                      />
                    </div>
                    <div className=" pt-4 w-2/3 flex justify-center">
                      <b className="text-xl">5</b>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}


export default async function SaturationSlot() {
  return (
    <div className="bg-blue-dark flex flex-col rounded-lg shadow-md h-96">
      <Link href="/Channels">
        <div className="text-center p-4 bg-blue-darkhighlight rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-white text-center px-4 py-2">
            Saturation in channels
          </h1>
        </div>
    </Link>
    <div className=" overflow-scroll  no-scrollbar h-[65%]">
      <div className=" justify-center items-center text-white w-[calc(60vw-32rem)]">
        <Saturation /> 
      </div>
      <div className="flex items-center px-8 py-7">
      <span className="text-white text-xl">Physical Store</span>
      <div className="bg-figma-figma9 h-4 w-4 flex justify-end rounded-2xl items-center mx-8"></div>
      {/* <div className="w-3/4"></div> */}
    </div>
    <div className="flex items-center px-8 py-4">
      <span className="text-white text-xl">Walmart®.com</span>
      <div className="bg-figma-figma10 h-4 w-4 flex justify-end rounded-2xl items-center mx-8"></div>
      {/* <div className="w-3/4"></div> */}
    </div>
    <div className="flex items-center px-8 py-4">
      <span className="text-white text-xl">Walmart Express</span>
      <div className="bg-figma-figma8 h-4 w-4 flex justify-end rounded-2xl items-center mx-8"></div>
      {/* <div className="w-3/4"></div> */}
    </div>
    <div className="flex items-center px-8 py-4">
      <span className="text-white text-xl">Delivery</span>
      <div className="bg-figma-figma8 h-4 w-4 flex justify-end rounded-2xl items-center mx-8"></div>
      {/* <div className="w-3/4"></div> */}
    </div>
    </div>
  </div>
  
  );
}
