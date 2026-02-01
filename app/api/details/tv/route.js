import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const season = Number(searchParams.get("season") || 1);

  if (!id || id.trim() === "") {
    return NextResponse.json({ err: "Missing TV id" }, { status: 400 });
  }

  const headers = {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const [detailsRes, creditsRes, recRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`,
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

    const seasonRes = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );

    const seasonData = await seasonRes.json();

    return NextResponse.json({
      result: {
        details,
        credits,
        recommendations,
        season: seasonData, // contains episodes[]
        activeSeason: season,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "TV API Fetch Failed" }, { status: 500 });
  }
}
