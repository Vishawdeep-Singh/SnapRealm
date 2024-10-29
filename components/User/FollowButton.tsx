"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function FollowButton({ userId }: { userId: number }) {
  const [followStatus, setFollowStatus] = useState<boolean>(false);

  // console.log("This is a follow button");

  useEffect(() => {
    async function getFollowState() {
      const res = await fetch(`/api/user/follow?targetId=${userId}`, {
        method: "GET",
      });
      if (!res.ok) {
        toast.error("Couldn't get intial state", {
          closeButton: true,
        });
      }
      const { followStatus } = await res.json();
      setFollowStatus(followStatus);
    }
    getFollowState();
  }, []);

  async function handleFollow() {
    setFollowStatus((prev) => !prev); //show
    const res = await fetch(
      `/api/user/follow?targetId=${userId}&followStatus=${followStatus}`,
      {
        method: "POST",
      }
    );
    if (!res.ok) {
      toast.error("Couldn't follow this account!!", {
        closeButton: true,
      });
      console.log(res);
      setFollowStatus((prev) => !prev); //db actual status
      return;
    }
  }

  return (
    <button
      onClick={handleFollow}
      className="bg-transparent rounded-full outline-none px-2 text-blue-500"
    >
      {followStatus ? "Unfollow" : "+Follow"}
    </button>
  );
}
