import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId") as string;

  if (!postId) {
    return NextResponse.json({ messsage: "Invalid Post!" }, { status: 400 });
  }

  try {
    const numberOfLikes = await db.likedby.count({
      where: {
        postId: parseInt(postId),
      },
    });

    return NextResponse.json({ numberOfLikes }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error connecting to the db" },
      { status: 500 }
    );
  }
}
