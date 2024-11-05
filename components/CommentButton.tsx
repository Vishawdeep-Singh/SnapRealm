"use client";

import { IconMessageCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isCommentPosted } from "@/states/atom";
import Link from "next/link";

export default function CommentButton({ postid }: { postid: number }) {
  const AllCommentState = useRecoilValue(isCommentPosted);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function CommentCount() {
      setIsLoading(true);
      const res = await fetch(`/api/posts/comments/count?postId=${postid}`);
      const { num } = await res.json();
      setNumberOfComments(num);
      setIsLoading(false);
    }
    CommentCount();
  }, [postid, AllCommentState]);

  return (
    <>
      <button className="focus:outline-none mb-1" disabled>
        <Link href={`/post/${postid}`}>
          <IconMessageCircle />
        </Link>
      </button>
      <p className="text-center">{isLoading ? "..." : numberOfComments}</p>
    </>
  );
}
