"use client";
import { useEffect, useState } from "react";
import { IconBookmark } from "@tabler/icons-react";
import { toast } from "sonner";

export default function SaveButton({
  userId,
  postId,
}: {
  userId: string;
  postId: number;
}) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    async function getInitalState() {
      isLoading(true);
      const res = await fetch(
        `/api/posts/savepost?userId=${userId}&postId=${postId}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) {
        toast.error("Error getting initial state!");
      }
      const { SavedPost } = await res.json();
      isLoading(false);
      setIsSaved(SavedPost);
    }
    getInitalState();
  }, [userId]);

  async function handleClick() {
    setIsSaved((prev) => !prev);
    try {
      const res = await fetch(
        `/api/posts/savepost?userId=${userId}&postId=${postId}&isAlreadySaved=${isSaved}`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        setIsSaved(data.SavedPost);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <button className="focus:outline-none ml-auto" onClick={handleClick}>
      {loading ? (
        "Loading..."
      ) : (
        <IconBookmark fill={isSaved ? "white" : "none"} />
      )}
    </button>
  );
}
