import express  from "express";
import userController from "../controllers/user.mjs";
import express from 'express'

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.post('/users', userController.post);
userRouter.get('/usersHere', userController.get);



export default userRouter;
