import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import Stories from "@/components/Stories";
import AllPost from "@/components/Post/AllPost";
import AllUsers from "@/components/AllUsers";
import { Dashboard } from "@/components/HomeSidebar";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="text-white w-full dark overflow-y-auto flex flex-wrap space-y-7">
      <Suspense fallback={<Dashboard />}>
        <div className="w-full">
          <Stories stories={[]} />
        </div>
        <div className="text-white flex-grow dark flex justify-center items-center h-screen">
          <AllPost />
        </div>
        <div className="w-[30%]">
          <AllUsers />
        </div>
      </Suspense>
    </div>
  );
}
