"use client";
import { useEffect, useState } from "react";
import { IconBookmark } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function SaveButton({ postId }: { postId: number }) {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;

  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    async function getInitalState() {
      const res = await fetch(
        `/api/posts/savepost?userId=${userId}&postId=${postId}`,
        {
          method: "GET",
        }
      );
      const { SavedPost } = await res.json();
      setIsSaved(SavedPost);
    }
    getInitalState();
  }, []);

  async function handleClick() {
    setIsSaved((prev) => !prev);
    try {
      const res = await fetch(
        `/api/posts/savepost?userId=${userId}&postId=${postId}`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setIsSaved(data.SavedPost);
        toast.success(data.message, {
          closeButton: true,
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <button className="focus:outline-none ml-auto" onClick={handleClick}>
      <IconBookmark fill={isSaved ? "white" : "none"} />
    </button>
  );
}
