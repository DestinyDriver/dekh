"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Prohibition,
  StarSolid,
  Calendar,
  Language,
  NavArrowDownSolid,
  DirectorChair,
  Search,
} from "iconoir-react";

import Image from "next/image";

const page = () => {
  // const [id, setId] = useState();
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
      credits: {
        id: 1726,
        cast: [
          {
            adult: false,
            gender: 2,
            id: 3223,
            known_for_department: "Acting",
            name: "Robert Downey Jr.",
            original_name: "Robert Downey Jr.",
            popularity: 8.9615,
            profile_path: "/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg",
            cast_id: 19,
            character: "Tony Stark",
            credit_id: "52fe4311c3a36847f8037ee9",
            order: 0,
          },
          {
            adult: false,
            gender: 2,
            id: 18288,
            known_for_department: "Acting",
            name: "Terrence Howard",
            original_name: "Terrence Howard",
            popularity: 2.7132,
            profile_path: "/eZ6uRZOYWZAyjNmWpDKGdLL6WUC.jpg",
            cast_id: 12,
            character: "Rhodey",
            credit_id: "52fe4311c3a36847f8037ecb",
            order: 1,
          },
          {
            adult: false,
            gender: 2,
            id: 1229,
            known_for_department: "Acting",
            name: "Jeff Bridges",
            original_name: "Jeff Bridges",
            popularity: 4.1893,
            profile_path: "/xms1RAY6q7Lzp7wNeRCB0kzhucn.jpg",
            cast_id: 11,
            character: "Obadiah Stane",
            credit_id: "52fe4311c3a36847f8037ec7",
            order: 2,
          },
          {
            adult: false,
            gender: 1,
            id: 12052,
            known_for_department: "Acting",
            name: "Gwyneth Paltrow",
            original_name: "Gwyneth Paltrow",
            popularity: 6.1267,
            profile_path: "/8x3jpWD7DEvyMXO1FOjwNdd1UZT.jpg",
            cast_id: 10,
            character: "Pepper Potts",
            credit_id: "52fe4311c3a36847f8037ec3",
            order: 3,
          },
          {
            adult: false,
            gender: 1,
            id: 57451,
            known_for_department: "Acting",
            name: "Leslie Bibb",
            original_name: "Leslie Bibb",
            popularity: 3.9347,
            profile_path: "/g3a1O9lOTZvrwQupUtg4Fc3CdTd.jpg",
            cast_id: 17,
            character: "Christine Everhart",
            credit_id: "52fe4311c3a36847f8037ee1",
            order: 4,
          },
          {
            adult: false,
            gender: 2,
            id: 17857,
            known_for_department: "Acting",
            name: "Shaun Toub",
            original_name: "Shaun Toub",
            popularity: 1.7585,
            profile_path: "/6fuJ9D50bYuMAhrlEgVqzgqF0LU.jpg",
            cast_id: 9,
            character: "Yinsen",
            credit_id: "52fe4311c3a36847f8037ebf",
            order: 5,
          },
          {
            adult: false,
            gender: 2,
            id: 57452,
            known_for_department: "Acting",
            name: "Faran Tahir",
            original_name: "Faran Tahir",
            popularity: 2.3,
            profile_path: "/dMsD7h6KiZ5dM0f9MegXUOKnqb0.jpg",
            cast_id: 18,
            character: "Raza",
            credit_id: "52fe4311c3a36847f8037ee5",
            order: 6,
          },
          {
            adult: false,
            gender: 2,
            id: 9048,
            known_for_department: "Acting",
            name: "Clark Gregg",
            original_name: "Clark Gregg",
            popularity: 2.0618,
            profile_path: "/mq686D91XoZpqkzELn0888NOiZW.jpg",
            cast_id: 21,
            character: "Agent Coulson",
            credit_id: "52fe4311c3a36847f8037ef3",
            order: 7,
          },
          {
            adult: false,
            gender: 2,
            id: 17200,
            known_for_department: "Acting",
            name: "Bill Smitrovich",
            original_name: "Bill Smitrovich",
            popularity: 1.6259,
            profile_path: "/yzZUYnAdX0MMA8eZMTVsXufRCfU.jpg",
            cast_id: 29,
            character: "General Gabriel",
            credit_id: "52fe4311c3a36847f8037f0f",
            order: 8,
          },
          {
            adult: false,
            gender: 2,
            id: 173810,
            known_for_department: "Acting",
            name: "Sayed Badreya",
            original_name: "Sayed Badreya",
            popularity: 1.0015,
            profile_path: "/sVvwmMsjXd5YqyZEfWcWQEkBScu.jpg",
            cast_id: 23,
            character: "Abu Bakaar",
            credit_id: "52fe4311c3a36847f8037ef7",
            order: 9,
          },
        ],
      },
    },
  });
  const router = useRouter();
  data.result.details.adult = true;

  const id = searchParams.get("ep");

  async function fetchData() {
    if (!id || id.trim() === "") {
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
    <div>
      {/* Navbar */}
      <div className="w-full h-[10vh]  flex justify-center items-center bg-[var(--background-color)]">
        <Navbar></Navbar>
      </div>
      {/* hero - Player and Episodes */}
      <div className="w-full h-[110vh] bg-[var(--background-color)] flex justify-center items-start">
        <div className="bg-[var(--helper-color2)]   w-[96%] rounded-xl grid grid-cols-1 md:grid-cols-[1fr_2.5fr]">
          {/*Left Part -  episodes and Short Details */}
          <div className=" h-full w-full rounded-l-xl grid grid-rows-[1fr_4fr] ">
            {/* Short details */}
            <div className="rounded-tl-xl grid grid-cols-[1fr_3fr] border-b-1  border-[var(--helper-color1)]">
              {/* poster */}
              <div className="  flex justify-center items-center w-full h-full aspect-[2/3]">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.result.details.poster_path}`}
                  className="object-cover h-full w-full px-2 py-2 rounded-xl"
                ></img>
              </div>
              {/* Short Details */}
              <div className="flex  flex-col justify-center items-start gap-2 flex-1 pl-1 pr-2 py-1  ">
                {/* Title and tagline */}
                <div className=" text-2xl font-extrabold text-[var(--background-color)]  max-w-full  flex flex-col justify-center items-start">
                  <div className="line-clamp-2 max-w-full break-all">
                    {data.result.details.title}
                  </div>
                  <i>
                    <div className="text-sm line-clamp-1 break-all max-w-full">
                      ~{data.result.details.tagline}
                    </div>
                  </i>
                </div>
                {/* icons - Ratings,Date of release,adult,language */}
                <div className=" flex items-center justify-center text-sm font-extrabold gap-1">
                  {data.result.details.adult === true && (
                    <div className="  flex justify-center items-center  border-1 gap-1 rounded-full px-1 bg-[var(--background-color)] text-red-400 ">
                      <Prohibition className="size-4"></Prohibition> 18+
                    </div>
                  )}
                  <div className="flex justify-center items-center  border-1 gap-1 rounded-full px-1 bg-[var(--background-color)] text-yellow-400 ">
                    <StarSolid className="size-4"></StarSolid>{" "}
                    {Math.round(data.result.details.vote_average * 10) / 10};
                  </div>
                  <div className="flex justify-center items-center  border-1 gap-1 rounded-full px-1 bg-[var(--background-color)] text-black ">
                    <Calendar className="size-4"></Calendar>{" "}
                    {data.result.details.release_date.slice(0, 4)}
                  </div>
                  <div className="flex justify-center items-center  border-1 gap-1 rounded-full px-1 bg-[var(--background-color)] text-purple-400 ">
                    <Language className="size-4"></Language>{" "}
                    {data.result.details.original_language};
                  </div>
                </div>
              </div>
            </div>
            {/* episodes */}
            <div className=" rounded-bl-xl h-full w-full px-2 pt-2 pb-4 grid grid-rows-[1fr_8fr]  ">
              <div className="text-[var(--background-color)] flex flex-col justify-end items-start">
                <div className="font-bold text-lg w-full">List of Episodes</div>
                <div className="grid grid-cols-2 grid-cols-[1fr_1fr] w-full ">
                  <div className=" w-full flex justify-start items-center gap-2 ">
                    <DirectorChair className="size-4"></DirectorChair>

                    <div className="w-full flex justify-between px-2 items-center flex-[0.6] border font-bold text-sm mt-1 mb-1">
                      <span>EPS: 001-001</span>
                      <NavArrowDownSolid className="size-4"></NavArrowDownSolid>
                    </div>
                  </div>
                  <div className=" w-full flex justify-end items-center  text-bold text-sm ">
                    <div className="flex justify-end items-center border-1 flex-[0.6] box-border mt-1 mb-1 rounded-sm ">
                      <input
                        type="text"
                        className="px-2  box-border text-sm font-bold rounded-md
    outline-none"
                        placeholder="Search Episode"
                      />
                      <Search className="size-4 mr-1"></Search>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[var(--background-color)] bg-black border-1 border-[var(--helper-color1)] rounded-sm mt-1 h-full overflow-y-auto">
                <div className="bg-[var(--primary-color)] p-4">
                  <span>Episode 1</span>
                  <span>Playing </span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Part - playback video and controls */}
          <div className="  rounded-r-xl grid grid-rows-[4fr_1fr] ">
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
            <div className=" rounded-br-xl grid grid-rows grid-rows-[1fr_1fr_2fr] text-[var(--background-color)] font-bold text-sm ">
              <div className="flex justify-start items-center pr-4 border-b-1">
                <div className="w-[80px] ">Overview:</div>
                <div className="w-full line-clamp-2 break-word">
                  {data.result.details.overview}
                </div>
              </div>
              <div className="flex justify-start items-center border-b-1">
                <div className="w-[80px]">Genere:</div>
                <div className="flex justify-start items-center gap-2 w-full">
                  {data.result.details.genres.map((el, i) => {
                    return (
                      <div
                        key={el.id}
                        className="px-2  rounded-full bg-[var(--background-color)] text-black"
                      >
                        {el.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-start items-center">
                <div className="w-[80px]"> Credits</div>
                <div className="flex justify-start items-center gap-x-5">
                  {data.result.credits.cast.slice(0, 4).map((el, i) => {
                    return (
                      <div
                        key={i}
                        className="flex flex-col justify-center items-center gap-y-1"
                      >
                        <div className="h-10 w-10  rounded-full">
                          <img
                            src={`https://image.tmdb.org/t/p/w185${el.profile_path}`}
                            alt={el.name}
                            className="object-cover h-full w-full rounded-full"
                            // placeholder={el.character}
                          />
                        </div>
                        <div className="text-xs">{el.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--helper-color2)] w-full h-[100vh]"></div>
    </div>
  );
};

export default page;

{
}
