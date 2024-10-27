"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IconHeart } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLiking } from "@/states/atom";

export default function LikeButton({ postId }: { postId: number }) {
  const AllLikeState = useRecoilValue(isLiking);
  const setLikedAtom = useSetRecoilState(isLiking);
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numLikes, setNumLikes] = useState<number>(0);

  useEffect(() => {
    async function checkIfLiked() {
      if (!session?.user?.id) return;
      const userId = parseInt(session.user.id);
      try {
        const res = await fetch(
          `/api/posts/like?userId=${userId}&postId=${postId}`,
          { method: "GET" }
        );
        const data = await res.json();

        if (res.ok) {
          setLiked(data.liked); // Set liked based on the response
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching like status:", error);
      }
    }
    checkIfLiked();
  }, []);

  useEffect(() => {
    async function GetCount() {
      const res = await fetch(`/api/posts/like/count?postId=${postId}`);
      const { numberOfLikes } = await res.json();
      setNumLikes(numberOfLikes);
    }
    GetCount();
  }, [postId, AllLikeState]);

  const handleLike = async () => {
    if (!session) {
      alert("You must be logged in to like posts.");
      redirect("/");
    }
    setLoading(true);
    setLiked((prev) => !prev);

    try {
      const response = await fetch(`/api/posts/like?postId=${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      const data = await response.json();
      setLiked(data.liked);
      setLikedAtom((prev) => !prev);
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="focus:outline-none"
        onClick={handleLike}
        disabled={loading}
      >
        <IconHeart
          className={`h-6 w-6`}
          stroke="red"
          fill={liked ? "red" : "none"}
        />
      </button>
      <p className="text-center">{numLikes}</p>
    </>
  );
}