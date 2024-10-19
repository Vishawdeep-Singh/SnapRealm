import { db } from "@/lib/db";
import { PostImages } from "../PostImages";
import { Loader } from "rsuite";
import {
  IconBookmark,
  IconHeart,
  IconMessageCircle,
  IconSend,
} from "@tabler/icons-react";
import { PostDropDown } from "./PostDropDown";
import Link from "next/link";

export default async function AllPost() {
  const allPosts = await db.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  if (allPosts.length === 0) {
    return <Loader size="sm" content="Small" />;
  }

  //   console.log(allPosts);

  return (
    <div className="w-full h-screen mt-2 flex flex-col space-y-7">
      {allPosts.map((post) => {
        return (
          <div
            key={post.id}
            className="w-full h-full flex flex-col min-w-[360px] max-w-[960px]"
          >
            <main className="flex-grow w-[80%] m-auto">
              <div className="flex flex-col gap-4 p-4 relative">
                <div className="w-full rounded-md overflow-hidden">
                  <PostImages images={post.media} />
                </div>
                <div className="flex items-center gap-2">
                  <button className="focus:outline-none">
                    <IconHeart />
                  </button>
                  <button className="focus:outline-none">
                    <IconMessageCircle />
                  </button>
                  <button className="focus:outline-none">
                    <IconSend />
                  </button>
                  <button className="focus:outline-none ml-auto">
                    <IconBookmark />
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Liked by
                  <strong className="font-medium text-gray-600">
                    user
                  </strong>{" "}
                  and
                  <strong className="font-medium text-gray-600">others</strong>
                </p>
                <div className="flex items-center gap-2">
                  <strong className="font-medium text-gray-600">user</strong>
                  <p className="text-sm text-gray-500">Great post!</p>
                </div>
                <p className="text-xs absolute top-[-25] w-full pl-5 pr-9 flex justify-between text-gray-400 z-10">
                  <h1 className="flex justify-center items-center h-9">
                    <Link href={`/${post.author.username}`}>
                      {post.author.username}
                    </Link>
                  </h1>
                  <PostDropDown author={post.author.id} />
                </p>
              </div>
            </main>
          </div>
        );
      })}
    </div>
  );
}
