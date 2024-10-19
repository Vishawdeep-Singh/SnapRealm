"use client";

import { useFormStatus } from "react-dom";

export default function NewPostSubmitButton() {
  const status = useFormStatus();

  return (
    <>
      <button
        className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(255,79,79,0.9)] px-8 py-2 bg-[#f30059] rounded-md text-white font-light transition duration-200 ease-linear"
        type="reset"
      >
        Cancel
      </button>

      <button disabled={status.pending} className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          {status.pending ? "Posting....." : "Post"}
        </div>
      </button>
    </>
  );
}
