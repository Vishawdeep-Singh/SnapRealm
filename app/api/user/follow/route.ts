import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;

  //   const userId = req.nextUrl.searchParams.get("userId") as string;
  const targetId = req.nextUrl.searchParams.get("targetId") as string;
  const followStatus = req.nextUrl.searchParams.get("followStatus") as string;

  if (!userId || !targetId) {
    return NextResponse.json(
      { message: "Please log in to follow" },
      { status: 401 }
    );
  }

  try {
    // Unfollow logic
    if (followStatus === "true") {
      const removeFollow = await db.follows.deleteMany({
        where: {
          followedById: parseInt(userId),
          followingId: parseInt(targetId),
        },
      });

      if (removeFollow.count > 0) {
        return NextResponse.json({ followStatus: false }, { status: 200 });
      } else {
        throw new Error("Couldn't unfollow");
      }
    }

    const newFollow = await db.follows.create({
      data: {
        followedById: parseInt(userId),
        followingId: parseInt(targetId),
      },
    });

    if (newFollow) {
      return NextResponse.json({ followStatus: true }, { status: 200 });
    } else {
      throw new Error("Couldn't follow");
    }
  } catch (err) {
    console.log("Error Following", err);
    return NextResponse.json(
      { message: "You were caught following!!" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string;
  //   const userId = req.nextUrl.searchParams.get("userId") as string;
  const targetId = req.nextUrl.searchParams.get("targetId") as string;

  if (!userId || !targetId) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  try {
    const isFollowing = await db.follows.findFirst({
      where: {
        followedById: parseInt(userId),
        followingId: parseInt(targetId),
      },
    });

    if (isFollowing) {
      return NextResponse.json({ followStatus: true }, { status: 200 });
    } else {
      return NextResponse.json({ followStatus: false }, { status: 200 });
    }
  } catch (err) {
    console.log("Error", err);
    return NextResponse.json({ message: "Server down" }, { status: 500 });
  }
}
