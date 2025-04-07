
// src/routes/userRoutes.ts
import { Router } from 'express';
import { getProfile, updateProfile, getUserOwnedGames, addGameToUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/games', getUserOwnedGames);
router.post('/games/:gameId', addGameToUser);

export default router;