"use server";

import { db } from "@/lib/db";

export async function DeletePostAction(formData: FormData) {
  const postId = formData.get("postId") as string;

  if (!postId) {
    return;
  }

  try {
    const deletePost = await db.post.delete({
      where: {
        id: parseInt(postId),
      },
    });

    if (deletePost) {
      console.log("Post Deleted Successfully");
    }
  } catch (err) {
    console.error(err);
  }
}
