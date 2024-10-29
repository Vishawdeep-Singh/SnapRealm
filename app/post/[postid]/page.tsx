import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
//ui
import { PostDropDown } from "@/components/Post/PostDropDown";
//next stuff
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
//database prisma
import { db } from "@/lib/db";
//my add-ons
import PostImages from "@/components/PostImages";
import LikeButton from "@/components/LikeButton";
import NewCommentsForm from "@/components/Post/NewCommentForm";
import AllComments from "@/components/Post/AllComments";
import CommentButton from "@/components/CommentButton";
import PostShare from "@/components/Post/PostShare";
import SaveButton from "@/components/Post/SaveButton";

export default async function PostDetailsPage({
  params,
}: {
  params: { postid: string };
}) {
  const session = await getServerSession(authOptions);
  const { postid } = params;

  if (!session?.user) {
    redirect("/signin");
  }

  if (!postid) {
    console.log("Something went wrong!!");
    return;
  }

  //this is pure idea and i know it wouldn't work in professional life
  //getting the user follower who liked it
  // const currentUser = await db.user.findFirst({
  //   where: {
  //     id: parseInt(session.user.id as string),
  //   },
  //   include: {
  //     followedBy: {
  //       include: {
  //         following: true,
  //       },
  //     },
  //   },
  // });

  const currentUser = await getFollowerList(session.user.id as string);

  if (currentUser.error) {
    return <div>{currentUser.error}</div>;
  }

  const followingUserIds = currentUser.data?.map(
    (follow) => follow.followingId
  );
  // console.log("All the id", followingUserIds);

  const post = await getCurrentPost(postid, followingUserIds as number[]);

  if (post.error) {
    return (
      <div className="flex text-center justify-center items-center h-screen pt-auto">
        Post not found.
      </div>
    );
  }

  if (post.data) {
    return (
      <div className="w-full overflow-auto h-screen mt-2 flex flex-col space-y-7">
        <div className="m-auto w-full flex flex-col min-w-[400px] max-w-[960px]">
          <main className="flex-grow w-[80%] m-auto">
            <div className="flex flex-col gap-4 p-4 relative">
              <div className="w-full rounded-md overflow-hidden">
                <PostImages images={post.data?.media} />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <LikeButton
                    userId={session.user.id as string}
                    postId={post.data?.id}
                  />
                </div>
                <div>
                  <CommentButton postid={post.data.id} />
                </div>
                <button className="focus:outline-none">
                  <PostShare postid={post.data.id} />
                </button>
                <SaveButton
                  userId={session.user.id as string}
                  postId={post.data.id}
                />
              </div>
              <p className="text-sm text-gray-500">
                Liked by{" "}
                {post.data.likedby.length > 0 && (
                  <>
                    <strong className="font-medium text-gray-600">
                      {post.data.likedby[0].user.username}
                    </strong>{" "}
                    and
                  </>
                )}
                <strong className="font-medium text-gray-600">
                  {" "}
                  many others
                </strong>
              </p>
              <div className="flex flex-col items-center gap-2">
                <NewCommentsForm
                  postid={postid}
                  userid={session.user.id as string}
                />
                <AllComments postid={postid} />
              </div>
              <div className="text-xs absolute top-[-25] rounded-md w-[96%] px-1 flex justify-between text-gray-400 z-10 items-center bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),transparent)]">
                <Link
                  className="flex justify-start items-center w-[200px]"
                  href={`/${post.data.author.username}`}
                >
                  <div className="w-11 h-11 rounded-full mr-2 flex justify-center overflow-hidden">
                    <Image
                      src={
                        post.data.author.image !== null
                          ? post.data.author.image
                          : "/defaultuser.svg"
                      }
                      alt="user image"
                      height={20}
                      width={35}
                    />
                  </div>
                  {post.data.author.username}
                </Link>
                <PostDropDown author={post.data.author.id} />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

async function getFollowerList(userid: string) {
  if (!userid) {
    return { error: "Unauthorized" };
  }

  try {
    const currentUser = await db.follows.findMany({
      where: {
        followedById: parseInt(userid),
      },
    });
    return { data: currentUser };
  } catch (err) {
    console.error(err);
    return { error: "Not able to get follower list at the moment" };
  }
}

async function getCurrentPost(postid: string, followingUserIds: number[]) {
  if (!postid) {
    return { error: "No such post exists" };
  }

  try {
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
        likedby: {
          where: {
            userId: {
              in: followingUserIds, // Only include users who are in the following list
            },
          },
          include: {
            user: true, // Include user details
          },
        },
      },
    });
    return { data: post };
  } catch (err) {
    console.error(err);
    return { error: "Not able to get current post at the moment!" };
  }
}
