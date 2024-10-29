import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";
import FollowButton from "./FollowButton";

export default async function AllUsers() {
  const users = await db.user.findMany();
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id as string;

  return (
    <div className="w-full">
      <ul className="flex w-[400px] flex-col space-y-7 flex-nowrap">
        {users.map((user) => {
          if (user.id === parseInt(currentUserId)) return;
          return (
            <li
              className="px-3 py-2 shadow-[0_2px_5px_1px_rgba(0,0,0,0.3)] text-white w-[80%] rounded-lg flex items-center justify-between"
              key={user.id}
            >
              <div className="flex flex-grow items-center">
                <div className="w-11 h-11 rounded-full mr-2 flex justify-center overflow-hidden">
                  <Image
                    src={user.image ? user.image : "./defaultuser.svg"}
                    alt="user image"
                    height={20}
                    width={35}
                  />
                </div>
                <div className="text-sm">{user.username}</div>
              </div>

              <FollowButton userId={user.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
