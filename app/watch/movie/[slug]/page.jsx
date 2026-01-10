"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const page = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState({
    result: {
      details: {
        adult: false,
        backdrop_path: "/cKvDv2LpwVEqbdXWoQl4XgGN6le.jpg",
        belongs_to_collection: {
          id: 131292,
          name: "Iron Man Collection",
          poster_path: "/fbeJ7f0aD4A112Bc1tnpzyn82xO.jpg",
          backdrop_path: "/rI8zOWkRQJdlAyQ6WJOSlYK6JxZ.jpg",
        },
        budget: 140000000,
        genres: [
          {
            id: 28,
            name: "Action",
          },
          {
            id: 878,
            name: "Science Fiction",
          },
          {
            id: 12,
            name: "Adventure",
          },
        ],
        homepage: "https://www.marvel.com/movies/iron-man",
        id: 1726,
        imdb_id: "tt0371746",
        origin_country: ["US"],
        original_language: "en",
        original_title: "Iron Man",
        overview:
          "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        popularity: 18.811,
        poster_path: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
        production_companies: [
          {
            id: 420,
            logo_path: "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
            name: "Marvel Studios",
            origin_country: "US",
          },
          {
            id: 7505,
            logo_path: "/837VMM4wOkODc1idNxGT0KQJlej.png",
            name: "Marvel Entertainment",
            origin_country: "US",
          },
          {
            id: 7297,
            logo_path: "/l29JYQVZbTcjZXoz4CUYFpKRmM3.png",
            name: "Fairview Entertainment",
            origin_country: "US",
          },
        ],
        production_countries: [
          {
            iso_3166_1: "US",
            name: "United States of America",
          },
        ],
        release_date: "2008-04-30",
        revenue: 585174222,
        runtime: 126,
        spoken_languages: [
          {
            english_name: "English",
            iso_639_1: "en",
            name: "English",
          },
          {
            english_name: "Persian",
            iso_639_1: "fa",
            name: "فارسی",
          },
          {
            english_name: "Urdu",
            iso_639_1: "ur",
            name: "اردو",
          },
          {
            english_name: "Arabic",
            iso_639_1: "ar",
            name: "العربية",
          },
        ],
        status: "Released",
        tagline: "Heroes aren't born. They're built.",
        title: "Iron Man",
        video: false,
        vote_average: 7.655,
        vote_count: 27617,
      },
    },
  });
  const router = useRouter();

  const id = searchParams.get("ep");

  // async function fetchData() {
  //   if (!id || id.trim() === "") {
  //     router.replace("/not-found");
  //     return;
  //   }

  //   try {
  //     const result = await axios.get(`/api/details/movie?id=${id}`);
  //     setData(result.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [id]);

  return (
    <>
      <div className="bg-[var(--background-color)] min-h-screen  flex flex-col items-center   ">
        <Navbar></Navbar>
        <div className="bg-[var(--helper-color2)] flex-[0.94]  w-[96%] mt-4 rounded-xl grid grid-cols-1 md:grid-cols-[1fr_2.5fr]">
          {/* episodes */}
          <div className=" h-full w-full rounded-l-xl grid grid-rows-[1.4fr_5fr] ">
            <div className="rounded-tl-xl grid grid-cols-[1fr_3fr]">
              {/* poster */}
              <div className=" w-full h-full">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.result.details.poster_path}`}
                  className="object-cover h-full w-full px-2 py-2 rounded-xl"
                ></img>
              </div>
              <div className="grid grid-rows-2 bg-black">
                <div className="bg-blue-600 text-center ">
                  {data.result.details.title}
                </div>
                <div className="bg-blue-400">helo</div>
              </div>
            </div>
            <div className=" rounded-bl-xl"></div>
          </div>
          {/* playback video and controls */}
          <div className="  rounded-r-xl grid grid-rows-[5fr_1fr] ">
            {/* video */}
            <div className="bg-black rounded-tr-xl">
              <iframe
                className="h-full rounded-tr-xl w-full"
                allowFullScreen={true}
                // src={`https://www.2embed.cc/embed/${id}`}
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
