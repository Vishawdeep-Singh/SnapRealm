"use client";

import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    

  }

  return (
    <form className="flex items-center rounded-full w-full shadow-[0_4px_10px_rgba(19,19,19,0.9)] px-5 py-4">
      <input
        value={searchTerm}
        onChange={handleChange}
        className="outline-none border-0 bg-transparent flex-grow h-full"
        type="text"
        placeholder="Search for a post...."
      />
      <button type="submit">
        <IconSearch />
      </button>
    </form>
  );
}
