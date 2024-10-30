import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json(
      { message: "No such post exists!" },
      { status: 401 }
    );
  }

  try {
    const deletePost = await db.post.delete({
      where: {
        id: parseInt(postId),
      },
    });

    if (deletePost) {
      return NextResponse.json(
        { message: "Post Deleted Successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Couldn't delete this post" },
      { status: 500 }
    );
  }
}
