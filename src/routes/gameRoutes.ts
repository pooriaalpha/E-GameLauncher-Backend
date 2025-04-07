// src/routes/gameRoutes.ts
import { Router } from 'express';
import { getGames, getGameById, createGame, updateGame, deleteGame } from '../controllers/gameController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getGames);
router.get('/:id', getGameById);

// Protected routes
router.post('/', authMiddleware, createGame);
router.put('/:id', authMiddleware, updateGame);
router.delete('/:id', authMiddleware, deleteGame);

export default router;