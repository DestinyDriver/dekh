import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  //convert the string first to url object
  const url = new URL(req.url);
  //to get the value of the search params query
  const query = url.searchParams.get(`query`);
  const include_adult = url.searchParams.get("include_adult") ?? "false";
  const page = url.searchParams.get("page") ?? "1";

  if (!query || query.trim() == "") {
    return NextResponse.json({ result: [] });
  }

  try {
    const data = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query,
      )}&include_adult=${include_adult}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const result = data.data;
    return NextResponse.json({ result: result });
  } catch (err) {
    return NextResponse.json(
      { err: "API Fetch Error", err_msg: err },
      { status: 500 },
    );
  }
}
