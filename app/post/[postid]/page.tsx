import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import LikeButton from "@/components/LikeButton";
import { PostDropDown } from "@/components/Post/PostDropDown";
import { PostImages } from "@/components/PostImages";
import { IconBookmark } from "@tabler/icons-react";
import Link from "next/link";
import NewCommentsForm from "@/components/Post/NewCommentForm";
import AllComments from "@/components/Post/AllComments";
import CommentButton from "@/components/CommentButton";
import { PostShare } from "@/components/Post/PostShare";
import SaveButton from "@/components/Post/SaveButton";

export default async function PostDetailsPage({
  params,
}: {
  params: { postid: string };
}) {
  const session = await getServerSession(authOptions);
  const { postid } = params;

  if (!session?.user) {
    redirect("/");
  }

  const post = await db.post.findFirst({
    where: {
      id: parseInt(postid),
    },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
      likedby: true,
    },
  });

  if (!post) {
    console.log("no post as such");
    return;
  }

  return (
    <div className="w-full overflow-auto h-screen mt-2 flex flex-col space-y-7">
      <div className="m-auto w-full flex flex-col min-w-[400px] max-w-[960px]">
        <main className="flex-grow w-[80%] m-auto">
          <div className="flex flex-col gap-4 p-4 relative">
            <div className="w-full rounded-md overflow-hidden">
              <PostImages images={post.media} />
            </div>
            <div className="flex items-center gap-2">
              <div>
                <LikeButton postId={post.id} />
              </div>
              <div>
                <CommentButton postid={post.id} />
              </div>
              <button className="focus:outline-none">
                <PostShare postid={post.id} />
              </button>
              <SaveButton postId={post.id} />
            </div>
            <p className="text-sm text-gray-500">
              Liked by
              <strong className="font-medium text-gray-600">user</strong> and
              <strong className="font-medium text-gray-600">others</strong>
            </p>
            <div className="flex flex-col items-center gap-2">
              <NewCommentsForm
                postid={postid}
                userid={session.user.id as string}
              />
              <AllComments postid={postid} />
            </div>
            <div className="text-xs absolute top-[-25] w-full pl-5 pr-9 flex justify-between text-gray-400 z-10">
              <h1 className="flex justify-center items-center h-9">
                <Link href={`/${post.author.username}`}>
                  {post.author.username}
                </Link>
              </h1>
              <PostDropDown author={post.author.id} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
