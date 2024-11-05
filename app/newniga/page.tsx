import { db } from "@/lib/db";
import { toast } from "sonner";

export default async function newNiggaPage() {
  const allstories = await getStories();

  const date = new Date(
    allstories?.[0].createdAt.getTime()! + 24 * 60 * 60 * 1000
  );

  if (date > new Date()) {
    console.log("Shown");
  } else {
    console.log("Hidden");
  }
  return <div>newnigga</div>;
}

async function getStories() {
  try {
    const allstories = await db.story.findMany({
      where: {
        userId: 9,
      },
    });
    return allstories;
  } catch (err) {
    toast.error("alskhdf", { closeButton: true });
  }
}
