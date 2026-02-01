import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const page = searchParams.get("page") || 1;

  if (!id) return NextResponse.json({ result: null }, { status: 400 });

  const headers = {
    Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const [detailsRes, creditsRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        headers,
        next: { revalidate: 3600 }, // ✅ cache for 1 hour
      }),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    const [details, credits] = await Promise.all([
      detailsRes.json(),
      creditsRes.json(),
    ]);

    return NextResponse.json({
      result: { details, recommendations: null, credits },
    });
  } catch (err) {
    return NextResponse.json({ err: "API Fetch Failed" }, { status: 500 });
  }
}
