import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function AllUsers() {
  const users = await db.user.findMany();
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id as string;

  return (
    <div className="w-full">
      <ul className="flex flex-col space-y-7 flex-nowrap">
        {users.map((user) => {
          if (user.id === parseInt(currentUserId)) return;
          return (
            <li
              className="px-5 py-2 border-2 shadow-[0_5px_15px_2px_rgba(255,255,255,0.3)] text-white w-[80%] rounded-full flex items-center justify-between"
              key={user.id}
            >
              <div className="w-[80%] flex justify-start items-center">
                <div className="w-9 h-9 border-gray-100 border-2 rounded-full mr-2 flex justify-center overflow-hidden">
                  <Image
                    src={user.image ? user.image : "./defaultuser.svg"}
                    alt="user image"
                    height={20}
                    width={35}
                  />
                </div>
                {user.username}
              </div>
              <div className="w-[25%]">
                <button className="bg-transparent rounded-full outline-none border-2 border-gray-500 px-2">
                  +Follow
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
