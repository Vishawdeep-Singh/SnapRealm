import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") as string);
  const limit = parseInt(req.nextUrl.searchParams.get("limit") as string);

  if (!page || !limit) {
    return NextResponse.json({ message: "No params given" }, { status: 401 });
  }

  try {
    const posts = await db.post.findMany({
      include: {
        likedby: true, // Include likedby relations if needed
      },
      orderBy: {
        likedby: {
          _count: "desc", // Sort posts by like count in descending order
        },
      },
      take: limit, // Limits the number of posts to fetch per request
      skip: (page - 1) * limit, // Skips the posts based on the page number
    });

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong on the db!" },
      { status: 500 }
    );
  }
}
