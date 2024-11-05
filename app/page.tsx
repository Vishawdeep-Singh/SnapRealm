import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Stories from "@/components/Stories/Stories";
import AllPost from "@/components/Post/AllPost";
import AllUsers from "@/components/User/AllUsers";
import { UserLoader } from "@/components/User/UserLoader";
import { PostLoader } from "@/components/Post/PostLoader";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="text-white w-full bg-black overflow-y-auto flex flex-wrap space-y-7">
      <div className="w-full">
        <Stories />
      </div>
      <div className="text-white flex-grow dark flex justify-center items-center h-screen">
        <Suspense
          fallback={
            <div className="w-full h-screen mt-2 p-2 flex items-center flex-col space-y-7">
              <PostLoader />
            </div>
          }
        >
          <AllPost />
        </Suspense>
      </div>
      <div className="w-[30%] md:flex md:flex-col md:space-y-5 hidden">
        <Suspense fallback={<UserLoader />}>
          <AllUsers />
        </Suspense>
      </div>
    </div>
  );
}
