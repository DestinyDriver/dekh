import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  //convert the string first to url object
  const url = new URL(req.url);
  //to get the value of the search params query
  const query = url.searchParams.get(`query`);
  const include_adult = url.searchParams.get("include_adult") ?? "false";
  const page = url.searchParams.get("page") ?? 1;

  //to prevent edge case
  if (!query || query.trim() == "") {
    return NextResponse.json({ result: [] });
  }

  const fetchData = async () => {
    //must encode the string to uri  i.e
    //URLs break if they contain spaces, &, =, ?, etc.
    //encodeURIComponent replaces them with encoded values.
    //hello world & JS ==> "hello%20world%20%26%20JS"
    const data = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&include_adult=${include_adult}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data.data;
  };

  const result = await fetchData();
  return NextResponse.json({ result: result });
}
