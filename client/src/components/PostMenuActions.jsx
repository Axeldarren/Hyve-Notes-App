import { useUser, useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostMenuActions = ({ post }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return axios.get(`${import.meta.env.VITE_API_URL}/users/saved`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const isAdmin = user?.publicMetadata?.role === "admin" || false;
  const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/users/save`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const approveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/approve`,
        { postId: post._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (res) => {
      toast.success("Post approved!");
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error approving post");
    },
  });

  const awardMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/awardNectar`,
        { postId: post._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    },
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries(["post", post.slug]);
    },
    onError: (error) => {
      toast.error(error.response?.data || "Error awarding nectar");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleFeature = () => {
    featureMutation.mutate();
  };

  const handleSave = () => {
    if (!user) {
      return navigate("/login");
    }
    saveMutation.mutate();
  };

  return (
    <div className="">
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Log in first!"
      ) : (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
              stroke="black"
              strokeWidth="2"
              fill={
                saveMutation.isPending
                  ? isSaved
                    ? "none"
                    : "black"
                  : isSaved
                    ? "black"
                    : "none"
              }
            />
          </svg>
          <span>Save this Post</span>
          {saveMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}
      {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleFeature}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              strokeWidth="2"
              fill={
                featureMutation.isPending
                  ? post.isFeatured
                    ? "none"
                    : "black"
                  : post.isFeatured
                    ? "black"
                    : "none"
              }
            />
          </svg>
          <span>Feature</span>
          {featureMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}
      {user && (post.user.username === user.username || isAdmin) && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="red"
            width="20px"
            height="20px"
          >
            <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
          </svg>
          <span>Delete this Post</span>
          {deleteMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}
      {isAdmin && !post.approved && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={() => approveMutation.mutate()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 108.67 122.88"
            width="20px"
            height="20px"
          >
            <path d="M25.14,53.37c-1.51,0-2.75,1.24-2.75,2.77s1.23,2.77,2.75,2.77h20.11c1.51,0,2.75-1.24,2.75-2.77 s-1.23-2.77-2.75-2.77H25.14L25.14,53.37L25.14,53.37z M77.77,0c17.06,0,30.9,13.83,30.9,30.9c0,12.32-7.21,22.95-17.64,27.92 v57.69c0,1.76-0.71,3.35-1.87,4.5c-1.16,1.16-2.75,1.87-4.5,1.87H6.37c-1.76,0-3.35-0.71-4.5-1.87c-1.16-1.16-1.87-2.75-1.87-4.5 V22.4c0-1.76,0.71-3.35,1.87-4.5c1.16-1.16,2.75-1.87,4.5-1.87h44.3C55.93,6.47,66.09,0,77.77,0L77.77,0z M85.55,60.81 c-2.48,0.65-5.09,0.99-7.78,0.99c-17.06,0-30.9-13.83-30.9-30.9c0-3.27,0.51-6.42,1.45-9.38H6.37c-0.24,0-0.47,0.1-0.63,0.26 c-0.16,0.17-0.26,0.39-0.26,0.63v94.09c0,0.24,0.1,0.46,0.26,0.63c0.17,0.16,0.39,0.26,0.63,0.26h78.28c0.24,0,0.47-0.1,0.63-0.26 c0.16-0.17,0.26-0.39,0.26-0.63V60.81L85.55,60.81z M25.14,92.22c-1.51,0-2.74,1.23-2.74,2.74c0,1.51,1.23,2.74,2.74,2.74h38.47 c1.51,0,2.74-1.23,2.74-2.74c0-1.51-1.23-2.74-2.74-2.74L25.14,92.22L25.14,92.22L25.14,92.22z M25.14,72.81 c-1.51,0-2.74,1.23-2.74,2.74s1.23,2.74,2.74,2.74h38.47c1.51,0,2.74-1.23,2.74-2.74s-1.23-2.74-2.74-2.74H25.14L25.14,72.81 L25.14,72.81z M68.71,25.78l5.67,5.4l11.76-11.92c0.97-0.98,1.57-1.77,2.77-0.54l3.87,3.96c1.27,1.26,1.21,1.99,0.01,3.16 l-16.2,15.94c-2.53,2.48-2.09,2.63-4.65,0.09l-9.75-9.7c-0.53-0.58-0.47-1.16,0.11-1.74l4.49-4.66 C67.46,25.07,68.01,25.11,68.71,25.78L68.71,25.78L68.71,25.78z" />
          </svg>
          <span>Approve Post</span>
          {approveMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}
      {isAdmin && post.approved && !post.nectarAwarded && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={() => awardMutation.mutate()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 23.376 23.376"
            width="20px"
            height="20px"
          >
            <path d="M15.554,8.058c0,2.132-1.731,3.861-3.868,3.861c-2.132,0-3.857-1.729-3.857-3.861
			      s1.726-3.865,3.857-3.865C13.823,4.192,15.554,5.926,15.554,8.058z"/>
            <path d="M16.295,12.944l2.516-0.479l-0.608-2.259l1.911-1.508L18.42,6.891l0.917-2.461l-2.566-0.696
			      L16.295,1.13L13.73,2.105L11.863,0l-1.74,1.955L7.477,0.92L6.911,3.507L4.305,4.212l0.827,2.233l-1.87,1.807l1.87,1.608
			      l-0.65,2.324l2.43,0.583l0.23,0.943L4.22,21.921l3.215-0.833l2.432,2.288l1.82-6.589l2.002,6.589l2.169-2.086l3.559,0.148
			      l-3.303-7.767L16.295,12.944z M6.871,8.058c0-2.662,2.16-4.821,4.815-4.821c2.665,0,4.822,2.16,4.822,4.821
			      s-2.157,4.818-4.822,4.818C9.032,12.876,6.871,10.719,6.871,8.058z M9.534,21.726l-1.858-1.924l-2.12,0.743l1.923-5.189
			      l1.196-0.554l0.944-0.381l1.49,1.534L9.534,21.726z M15.702,20.369l-1.621,1.533l-1.793-6.034l1.224-1.27l2.405,0.757l2.361,5.278
			      L15.702,20.369z"/>
          </svg>
          <span>Award Nectar (+5)</span>
          {awardMutation.isLoading && <span className="text-xs">(in progress)</span>}
        </div>
      )}
    </div>
  );
};

export default PostMenuActions;
