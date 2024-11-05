"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import Link from "next/link";
import Image from "next/image";

type usertype = {
  name: string;
  username: string;
  image: string;
  bio: string;
};

export default function SearchDialog() {
  const [allUsers, setAllUsers] = useState<usertype[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filtered, setFiltered] = useState<usertype[] | null>();

  useEffect(() => {
    async function getAllusers() {
      const res = await fetch("/api/user/find");
      if (!res.ok) {
        toast.error("couldn't get users");
      }
      const { allusers } = await res.json();
      setAllUsers(allusers);
    }
    getAllusers();
  }, []);

  useEffect(() => {
    const filteredusers = allUsers?.filter((user) =>
      user.username.includes(searchTerm)
    );
    setFiltered(filteredusers);
  }, [searchTerm]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <dialog open>
      <div className="fixed top-0 left-0 w-[20%] h-screen bg-[rbga(0,0,0,0.8)] ">
        <input
          type="text"
          className="border border-white outline-none rounded-full w-full p-2 m-2"
          value={searchTerm}
          onChange={handleChange}
        />
        <div className="h-1 bg-white w-full rounded-full mb-2" />

        <ul className="w-full p-2">
          {filtered && filtered?.length !== 0 ? (
            filtered?.map((user) => {
              return (
                <li>
                  <Link href={`/${user.username}`}>
                    <div className="flex flex-grow items-center">
                      <div className="w-11 h-11 rounded-full mr-2 flex justify-center overflow-hidden">
                        <Image
                          src={
                            user.image
                              ? user.image
                              : `https://api.multiavatar.com/${user.username}.svg` ||
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
                </li>
              );
            })
          ) : (
            <div className="w-full h-full justify-center items-center"></div>
          )}
        </ul>
      </div>
    </dialog>
  );
}
