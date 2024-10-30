import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import FollowButton from "./FollowButton";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AllUsers() {
  const users = await db.user.findMany();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  const currentUserId = session?.user?.id!;

  return (
    <div className="w-full">
      <ul className="flex w-[400px] flex-col space-y-1 flex-nowrap">
        {users.map((user) => {
          if (user.id === parseInt(currentUserId)) return;
          return (
            <li
              className="px-3 py-2 text-white w-[80%] rounded-lg flex items-center justify-between"
              key={user.id}
            >
              <Link href={`/${user.username}`}>
                <div className="flex flex-grow items-center">
                  <div className="w-11 h-11 rounded-full mr-2 flex justify-center overflow-hidden">
                    <Image
                      src={
                        user.image
                          ? user.image
                          : `https://api.multiavatar.com/${user.name}.svg` ||
                            "./defaultuser.svg"
                      }
                      alt="user image"
                      width={45}
                      height={20}
                    />
                  </div>
                  <div className="text-xs flex flex-col justify-center">
                    <p>{user.username}</p>
                    <p className="text-[rgba(255,255,255,0.5)] pl-1">
                      {user.name}
                    </p>
                  </div>
                </div>
              </Link>

              <FollowButton userId={user.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
