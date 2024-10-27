import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  // Changed to POST
  const userId = req.nextUrl.searchParams.get("userId");
  const postId = req.nextUrl.searchParams.get("postId");

  if (!userId || !postId) {
    return NextResponse.json(
      { message: "No such post or user exists" },
      { status: 401 }
    );
  }

  try {
    // Check if the post is already saved by the user
    const user = await db.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        savedPosts: {
          where: { id: parseInt(postId) },
        },
      },
    });

    let isAlreadySaved;

    if (user?.savedPosts) {
      isAlreadySaved = user?.savedPosts.length > 0;
    }

    const updatedUser = await db.user.update({
      where: { id: parseInt(userId) },
      data: {
        savedPosts: isAlreadySaved
          ? {
              disconnect: { id: parseInt(postId) }, // If saved, remove
            }
          : {
              connect: { id: parseInt(postId) }, // If not saved, add
            },
      },
    });

    return NextResponse.json(
      {
        SavedPost: isAlreadySaved ? false : true,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error connecting!" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") as string;
  const postId = req.nextUrl.searchParams.get("postId") as string;

  try {
    const user = await db.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        savedPosts: {
          where: { id: parseInt(postId) },
        },
      },
    });
    if (user) {
      return NextResponse.json({ SavedPost: true }, { status: 200 });
    } else {
      return NextResponse.json({ SavedPost: false }, { status: 200 });
    }
  } catch (err) {
    console.log("Error getting saved status");
  }
}
