import {
  AlertTriangle,
  ArrowRight,
  Copy,
  Trash,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { CopyButton } from "./ShareButtons.tsx/ShareButtons";
import Link from "next/link";

export async function PostDropDown({
  postid,
  author,
}: {
  postid: number;
  author: number;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-center items-center w-9 h-9">
            <MoreHorizontal />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Post Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {(session?.user?.id as unknown as number) == author ? (
              <>
                <DropdownMenuItem>
                  <Trash className="text-red-500" />
                  <span className="text-red-500">Delete</span>
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            ) : null}
            <DropdownMenuItem>
              <AlertTriangle className="text-red-500" />
              <span className="text-red-500">Report</span>
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link
              className="flex items-center space-x-2"
              href={`/post/${postid}`}
            >
              <DropdownMenuItem>
                <ArrowRight size={18} />
                <span>Goto Post</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CopyButton postid={postid}>
                <div className="flex items-center space-x-2">
                  <Copy size={18} />
                  <span>Copy Link</span>
                </div>
              </CopyButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>About this account</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
