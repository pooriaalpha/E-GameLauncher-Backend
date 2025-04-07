// src/routes/index.ts
import { Router } from 'express';
import gameRoutes from './gameRoutes';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = Router();

// Mount route groups
router.use('/games', gameRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export { router as routes };
