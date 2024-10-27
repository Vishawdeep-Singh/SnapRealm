import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { CardCarousal } from "@/components/CardCarousal";

export default async function UserPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="flex justify-center items-center h-full w-full">
      {/* <main className="w-screen"> */}
      <CardCarousal />
    </main>
  );
}
