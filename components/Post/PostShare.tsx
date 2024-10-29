"use client";

import { Copy, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconSend,
} from "@tabler/icons-react";
import {
  AboutUserLink,
  CopyButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "./ShareButtons.tsx/ShareButtons";

export default function PostShare({ postid }: { postid: number }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-center items-center w-9 h-9">
            <IconSend />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-transparent backdrop:blur-md data-[side=bottom]">
          <DropdownMenuGroup className="flex w-full justify-evenly items-center">
            {/* code start */}
            <DropdownMenuItem className="w-fit">
              <WhatsappShareButton postid={postid}>
                <IconBrandWhatsapp size={30} />
              </WhatsappShareButton>
            </DropdownMenuItem>

            <DropdownMenuItem className="w-fit">
              <FacebookShareButton postid={postid}>
                <IconBrandFacebook size={30} />
              </FacebookShareButton>
            </DropdownMenuItem>

            {/* <DropdownMenuItem>
              <ArrowRight />
              <span>Goto Post</span>
            </DropdownMenuItem> */}

            <DropdownMenuItem className="w-fit">
              <CopyButton postid={postid}>
                <Copy size={30} />
              </CopyButton>
            </DropdownMenuItem>

            <DropdownMenuItem className="w-fit">
              <AboutUserLink username="34RajnishKumar">
                <User size={30} color="currentColor" />
              </AboutUserLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
