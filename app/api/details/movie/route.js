import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const page = url.searchParams.get("page") ?? 1;

  if (!id || id.trim() == "") {
    return NextResponse.json({ result: [] });
  }

  const headers = {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const [details, recommendations, credits] = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        headers,
      }),
      await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=${page}`,
        { headers }
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        {
          headers,
        }
      ),
    ]);
  } catch (err) {
    return NextResponse(
      {
        err: "API Fetch Failed",
        error_msg: err,
      },
      { status: 500 }
    );
  }

  const dat = {
    result: {
      details: details.data,
      recommendations: recommendations.data,
      credits: credits.data,
    },
  };

  console.log(dat);

  return NextResponse.json({
    result: {
      details: details.data,
      recommendations: recommendations.data,
      credits: credits.data,
    },
  });
}
