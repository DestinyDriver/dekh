import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const page = url.searchParams.get("page") ?? 1;

  if (!id || id.trim() === "") {
    return NextResponse.json({ result: [] });
  }

  const headers = {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };

  let details, recommendations, credits;

  try {
    const axiosInstance = axios.create({
      timeout: 10000, // 10s
      headers,
    });

    [details, recommendations, credits] = await Promise.all([
      axiosInstance.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`
      ),
      axiosInstance.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=${page}`
      ),
      axiosInstance.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
      ),
    ]);
  } catch (err) {
    console.log("error");

    console.log(err);
    return NextResponse.json(
      {
        err: "API Fetch Failed",
      },
      { status: 500 }
    );
  }

  const dat = {
    result: {
      details: details.data[0],
      recommendations: recommendations.data[0],
      credits: credits.data[0],
    },
  };

  console.log(dat.result);

  return NextResponse.json({
    result: {
      details: details.data,
      recommendations: recommendations.data,
      credits: credits.data,
    },
  });
}
