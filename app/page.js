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

  async function GetSearchResult() {
    try {
      const data = await axios.get(`/api/search?query=${search}`);
      setQueryResult(data.data);
    } catch (err) {
      console.log(err);
    }
  }

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
