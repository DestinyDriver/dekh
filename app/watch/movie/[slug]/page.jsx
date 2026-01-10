"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState();
  const router = useRouter();

  const id = searchParams.get("ep");

  async function fetchData() {
    if (!id || id.trim() == "") {
      router.replace("/not-found");
      return;
    }

    try {
      const result = await axios.get(`/api/details/movie?id=${id}`);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <div className="bg-[var(--background-color)] min-h-screen  flex flex-col items-center   ">
        <Navbar></Navbar>
        <div className="bg-[var(--helper-color2)] flex-[0.95]  w-[96%] mt-4 rounded-xl grid grid-cols-1 md:grid-cols-[1fr_2.5fr]">
          {/* episodes */}
          <div className=" h-full w-full rounded-l-xl grid grid-rows-[1.4fr_5fr] ">
            <div className="bg-black rounded-tl-xl"></div>
            <div className="bg-white rounded-bl-xl"></div>
          </div>
          {/* playback video and controls */}
          <div className=" h-full w-full rounded-r-xl grid grid-rows-[5fr_1fr] ">
            {/* video */}
            <div className="bg-black rounded-tr-xl">
              <iframe
                className="h-full rounded-tr-xl w-full"
                allowFullScreen={true}
                src={`https://www.2embed.cc/embed/${id}`}
                frameborder="0"
              ></iframe>
            </div>
            {/* controls */}
            <div className=" rounded-br-xl"></div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--helper-color2)] w-full h-[100vh]"></div>
    </>
  );
};

export default page;

{
}
