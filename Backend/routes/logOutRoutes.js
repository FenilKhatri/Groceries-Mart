import express from 'express';
import { logout } from '../controllers/logout.controller.js';

const logOutRouter = express.Router();

logOutRouter.post("/logout", logout);

export default logOutRouter;