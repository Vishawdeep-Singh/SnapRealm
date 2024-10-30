import { useEffect, useState } from "react";

export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  media: string[];
  authorId: number;
  content: string; // Ensure this is included
}

export function useInfiniteScroll(
  fetchPosts: (cursor: string | null) => Promise<Post[]>
) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  const loadPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newPosts = await fetchPosts(cursor);

    // If no new posts are returned, set hasMore to false
    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      // Append new posts to existing ones
      setPosts((prev) => [...prev, ...newPosts]);
      // Set the cursor to the last post's id for the next fetch
      setCursor(newPosts[newPosts.length - 1].id.toString());
    }

    setLoading(false);
  };

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      )
        return;
      loadPosts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, cursor]);

  return { posts, loading, hasMore, loadPosts };
}
