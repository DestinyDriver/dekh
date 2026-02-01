import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const time_window = searchParams.get("time_window") || "day"; // day | week
  const page = searchParams.get("page") || "1";

  const headers = {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const [moviesRes, webseriesRes, animeRes] = await Promise.all([
      // ✅ Trending Movies
      fetch(
        `https://api.themoviedb.org/3/trending/movie/${time_window}?page=${page}`,
        { headers, next: { revalidate: 1800 } },
      ),

      // ✅ Trending Webseries (TV)
      fetch(
        `https://api.themoviedb.org/3/trending/tv/${time_window}?page=${page}`,
        { headers, next: { revalidate: 1800 } },
      ),

      // ✅ Trending Anime (best practical way -> TV Animation genre)
      fetch(
        `https://api.themoviedb.org/3/discover/tv?with_genres=16&sort_by=popularity.desc&page=${page}`,
        { headers, next: { revalidate: 1800 } },
      ),
    ]);

    const [moviesData, webseriesData, animeData] = await Promise.all([
      moviesRes.json(),
      webseriesRes.json(),
      animeRes.json(),
    ]);

    return NextResponse.json({
      result: {
        trendingMovies: moviesData?.results?.slice(0, 10) || [],
        trendingWebseries: webseriesData?.results?.slice(0, 10) || [],
        trendingAnime: animeData?.results?.slice(0, 10) || [],
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "Trending API Failed" }, { status: 500 });
  }
}
