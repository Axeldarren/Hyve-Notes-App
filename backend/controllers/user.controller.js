import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getUser = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    // assume req.userId is set by your auth middleware (e.g. from Clerk token)
    const user = await User.findOne({ clerkUserId });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId });

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};

export const getUserSavedPostsDetails = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;

    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }

    // Find the user by Clerk user ID
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json("User not found!");
    }

    // Fetch posts using the IDs stored in savedPosts
    const savedPosts = await Post.find({
      _id: { $in: user.savedPosts }, // Match posts with IDs in savedPosts
    }).populate("user", "username img"); // Populate the user field in each post

    res.status(200).json({ savedPosts });
  } catch (error) {
    console.error("Error fetching saved posts details:", error);
    res.status(500).json("Internal server error");
  }
};
