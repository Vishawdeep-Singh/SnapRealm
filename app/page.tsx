import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { Loader } from "rsuite";
import Stories from "@/components/Stories";
import AllPost from "@/components/AllPost";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="text-white w-full dark overflow-y-auto">
      <Suspense fallback={<Loader size="sm" content="Small" />}>
        <Stories stories={[]} />
        <main className="text-white dark flex justify-center items-center h-screen">
          <AllPost />
        </main>
      </Suspense>
    </div>
  );
}
