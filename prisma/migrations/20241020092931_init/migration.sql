-- CreateTable
CREATE TABLE "Likedby" (
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "liked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Likedby_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "Likedby" ADD CONSTRAINT "Likedby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likedby" ADD CONSTRAINT "Likedby_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
