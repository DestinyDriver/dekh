"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const page = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("ep");

  return (
    <div className="bg-[var(--background-color)] min-h-screen  flex flex-col items-center ">
      <Navbar></Navbar>
      <div className="  w-[100vw] md:w-[92vw] mt-6  md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 ">
        {/* episode list */}
        <div className=" bg-black h-[60vh] ">hello</div>
        {/* Player and extra options */}
        <div className="  w-full bg-blue-400 h-[35vh]   row-start-1 col-start-1 md:col-start-2">
          {/* player */}
          <div className="  h-[82%] bg-blue-950 ">
            <div className="h-full  bg-blue-500 ">
              {" "}
              <iframe
                className="h-[40vh] w-full"
                allowFullScreen={true}
                src={`https://www.2embed.cc/embed/${id}`}
                frameborder="0"
              ></iframe>{" "}
            </div>
          </div>
          {/* extra options */}
          <div className="h-full">hello</div>
        </div>
        {/* Informations */}
        <div className="bg-yellow-500 md:col-span-2 lg:col-span-1 h-[40vh]">
          hello
        </div>
      </div>
    </div>
  );
};

export default page;

{
}
