import express from 'express';

import { getDefaultUser } from '../controllers/userController';

const router = express.Router();

router.get('/default-user', getDefaultUser);

export {router as userRoutes};