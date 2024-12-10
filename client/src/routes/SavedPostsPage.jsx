import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostListItem from "../components/PostListItem"; // Adjust path to your PostListItem component

const SavedPostsPage = () => {
  const { getToken } = useAuth();
  const { isLoaded, isSignedIn } = useUser();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/save`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data); // Debugging log to inspect the API response
      return res.data;
    },
    enabled: isLoaded && isSignedIn, // Only fetch if user is signed in
  });

  if (!isSignedIn) {
    return <div className="mt-8 text-center">Please login to see your saved posts.</div>;
  }

  const posts = data?.savedPosts || []; // Ensure fallback to an empty array if undefined
  console.log(posts); // Debugging log to inspect the posts

  if (isLoading) return <div className="mt-8 text-center">Loading your saved posts...</div>;
  if (isError) return <div className="mt-8 text-center">Something went wrong! Unable to load saved posts.</div>;

  // Safely access savedPosts

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Your Saved Posts</h1>
      {posts.length === 0 ? (
        <div>You haven't saved any posts yet.</div>
      ) : (
        posts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))
      )}
    </div>
  );
};

export default SavedPostsPage;
