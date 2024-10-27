import { atom } from "recoil";

export const isCommentPosted = atom<boolean>({
  key: "commentAtom",
  default: false,
});

export const isLiking = atom<boolean>({
  key: "likeAtom",
  default: false,
});
