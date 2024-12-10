import express from "express"
import { getUserSavedPosts, savePost, getUser, getUserSavedPostsDetails } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/me", getUser)
router.get("/saved", getUserSavedPosts)
router.patch("/save", savePost)
router.get("/save", getUserSavedPostsDetails)

export default router 