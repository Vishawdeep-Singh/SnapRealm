import { db } from "@/lib/db";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { PostImages } from "./PostImages";
import { Loader } from "rsuite";

export default async function AllPost() {
  const allPosts = await db.post.findMany();

  if (allPosts.length === 0) {
    return <Loader size="sm" content="Small" />;
  }

  //   console.log(allPosts);

  return (
    <div className="w-full mt-2">
      {allPosts.map((post) => {
        return (
          <Card key={post.id} className="w-[500px] m-auto">
            <CardContent>
              <div className="w-[100%] m-auto">
                <PostImages images={post.media} />
              </div>
            </CardContent>
            <CardHeader>{post.title}</CardHeader>
            <CardFooter>{post.description}</CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
