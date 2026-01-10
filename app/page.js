"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import axios from "axios";

const page = () => {
  // configDotenv();
  const [search, setsearch] = useState("");
  const [queryResult, setQueryResult] = useState("");

  // Debouncing the Search Results to minimise the API CALLS to TMDB
  useEffect(() => {
    //to get rid of the empty call
    if (search == "" || search.trim() == "") {
      setQueryResult("");
      return;
    }

    const timerID = setTimeout(async () => {
      await GetSearchResult();
    }, 500);

    return () => {
      clearTimeout(timerID);
    };
  }, [search]);

  //To Fetch the Search Results on query by User
  async function GetSearchResult() {
    try {
      const data = await axios.get(`/api/search?query=${search}`);
      setQueryResult(data.data);
      console.log("Data:");
      console.log(data.data);
      console.log(data.data.result.results[4]);
      console.log(data.data.result.results[3]);
      console.log(data.data.result.results[5]);
    } catch (err) {
      console.log(err);
    }
  }

  // function

  // return (
  //   <div className="flex justify-center items-center h-[100vh] bg-green-400">
  //     <input
  //       className="center h-20 w-40 bg-gray-600 pl-1 text-center"
  //       onChange={(e) => {
  //         changeSearchName(e.target.value);
  //       }}
  //     ></input>
  //     <br></br>
  //     <br></br>
  //     <iframe
  //       src="https://www.2embed.cc/embed/1593311"
  //       height={500}
  //       width={500}
  //     ></iframe>
  //   </div>
  // );

  return (
    <div>
      <Hero
        searchItem={search}
        setSearchItem={setsearch}
        data={queryResult}
      ></Hero>
    </div>
  );
};

export default page;
