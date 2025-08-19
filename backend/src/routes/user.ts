import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { ObjectId } from 'mongodb';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  const repo = AppDataSource.getMongoRepository(User);
  const user = await repo.findOne({ where: { _id: new ObjectId(userId) } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({
    id: user.id.toString(),
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl
  });
});

export default router;


