import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const page = searchParams.get("page") || 1;

  if (!id || id.trim() === "") {
    return NextResponse.json({ err: "Missing Movie id" }, { status: 400 });
  }

  const headers = {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const [detailsRes, creditsRes, recRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=${page}`,
        {
          headers,
          next: { revalidate: 3600 },
        },
      ),
    ]);

    const [details, credits, recommendations] = await Promise.all([
      detailsRes.json(),
      creditsRes.json(),
      recRes.json(),
    ]);

    return NextResponse.json({
      result: { details, credits, recommendations },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "API Fetch Failed" }, { status: 500 });
  }
}
