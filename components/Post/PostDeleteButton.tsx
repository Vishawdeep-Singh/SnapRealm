import { DeletePostAction } from "@/actions/DeletePostAction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

export default function PostDeleteButton({ postid }: { postid: number }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="cursor-pointer border-none p-0 flex space-x-2 m-0 w-full">
          <Trash className="text-red-500" size={20} />
          <span className="text-red-500">Delete</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure You want to delete this post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={DeletePostAction}>
            <input type="hidden" name="postId" value={postid} />
            <button
              type="submit"
              className="cursor-pointer border-none p-0 m-0"
            >
              <AlertDialogAction>Continue</AlertDialogAction>
            </button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
