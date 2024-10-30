import { ExplorePosts } from "@/actions/ExplorePosts"; // Adjust the path to your getPosts action

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const YourComponent = () => {
  const { posts, loading, hasMore } = useInfiniteScroll(ExplorePosts);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more posts available.</p>}
    </div>
  );
};
