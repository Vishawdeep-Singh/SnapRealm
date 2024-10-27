import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const postIdes = req.nextUrl.searchParams.get("postId") as string;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!postIdes) {
    return NextResponse.json(
      { message: "This Post doesn't exits" },
      { status: 400 }
    );
  }

  const user = session.user.id as string;
  const userId = parseInt(user);
  const postId = parseInt(postIdes);

  // console.log(numberOfLikes);

  try {
    // Check if the user has already liked the post
    const existingLike = await db.likedby.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      // If already liked, remove the like (unlike)
      const deletedLike = await db.likedby.delete({
        where: {
          userId_postId: { userId, postId },
        },
      });

      if (deletedLike) {
        // console.log("done Deleting the like");
        revalidatePath("/");
        revalidatePath(`/${postId}`);
        return NextResponse.json({ liked: false }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Error unliking" },
          { status: 500 }
        );
      }
    } else {
      // If not liked, create a new like
      const doneliking = await db.likedby.create({
        data: {
          userId,
          postId,
        },
      });

      if (doneliking) {
        // console.log("Liked the post");
        revalidatePath("/");
        revalidatePath(`/${postId}`);
        return NextResponse.json({ liked: true }, { status: 200 });
      } else {
        console.log("Something went wrong while likeing the post");
      }
    }
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const postId = req.nextUrl.searchParams.get("postId");

  if (!userId || !postId) {
    return NextResponse.json(
      { liked: false, error: "User ID and Post ID are required." },
      { status: 400 }
    );
  }

  try {
    const existingLike = await db.likedby.findFirst({
      where: {
        userId: parseInt(userId),
        postId: parseInt(postId),
      },
    });

    if (existingLike) {
      return NextResponse.json({ liked: true });
    } else {
      return NextResponse.json({ liked: false });
    }
  } catch (error) {
    console.error("Error fetching like status:", error);
    return NextResponse.json(
      { error: "Failed to fetch like status." },
      { status: 500 }
    );
  }
}
