import { Router } from "express";
import { userRouter } from "./users/users.router";

export const router = Router();
router.use("/user", userRouter);
