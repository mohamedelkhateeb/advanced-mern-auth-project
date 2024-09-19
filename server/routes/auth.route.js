import express from "express";
const router = express.Router();
import { login, signUp, logout } from "../controllers/auth.controller.js";

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
