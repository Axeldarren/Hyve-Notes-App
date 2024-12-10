import express from "express"
import { getUserSavedPosts, savePost, getUser } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/me", getUser)
router.get("/saved", getUserSavedPosts)
router.patch("/save", savePost)

export default router 