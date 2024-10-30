import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import UserProfile from "@/components/UserProfile";
import UserMemories from "@/components/User/UserMemories";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);
  const { username } = params;

  if (!session?.user) {
    redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      username: decodeURIComponent(username),
    },
    include: {
      posts: {
        select: {
          id: true,
          media: true,
        },
      },
      followedBy: true,
      following: true,
      savedPosts: {
        select: {
          id: true,
          media: true,
        },
      },
    },
  });

  if (!user) {
    console.log("No Such user");
    return;
  }
  if (user) {
    const numFollower = user.followedBy.map((follow) => follow.followingId);
    const numFollowing = user.following.map((follow) => follow.followedById);
    return (
      <div className="overflow-auto w-full">
        <main className="flex flex-col items-center h-full space-y-9 w-[70%] m-auto">
          <UserProfile
            image={user.image!}
            name={user.name!}
            username={user.username!}
            numPosts={user.posts.length!}
            followers={numFollower.length}
            following={numFollowing.length}
            bio={user.bio ? user.bio : "Tell something about yourself"}
          />
          <section className="w-full border-t-2 border-t-[rgba(255,255,255,0.3)] p-3 pt-0">
            <UserMemories
              userid={user.id!}
              allposts={user.posts!}
              savedposts={user.savedPosts!}
            />
          </section>
        </main>
      </div>
    );
  }
}
