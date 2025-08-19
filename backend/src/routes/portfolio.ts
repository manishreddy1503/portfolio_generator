import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import { AppDataSource } from '../config/data-source';
import { Portfolio } from '../entities/Portfolio';
import { ObjectId } from 'mongodb';

const router = Router();

router.get('/portfolio', requireAuth, async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: 'User ID not found' });
  }
  const repo = AppDataSource.getMongoRepository(Portfolio);
  let portfolio = await repo.findOne({ where: { userId: new ObjectId(userId) } });
  if (!portfolio) {
    portfolio = await repo.save({
      userId: new ObjectId(userId),
      profile: { fullName: '', socials: {} },
      summary: '',
      skills: [],
      projects: [],
      certifications: [],
      education: [],
      experience: [],
      achievements: [],
      theme: 'themeA',
    });
  }
  res.json(portfolio);
});

router.put('/portfolio', requireAuth, async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: 'User ID not found' });
  }
  const payload = req.body as Partial<Portfolio>;
  const repo = AppDataSource.getMongoRepository(Portfolio);
  let portfolio = await repo.findOne({ where: { userId: new ObjectId(userId) } });
  if (!portfolio) {
    portfolio = await repo.save({ ...payload, userId: new ObjectId(userId) });
    return res.json(portfolio);
  }
  // Merge profile to avoid dropping nested fields like avatarUrl/socials when some are missing in payload
  const next: Partial<Portfolio> = { ...payload };
  if (payload.profile && portfolio.profile) {
    next.profile = { ...portfolio.profile, ...payload.profile };
  }
  await repo.update(portfolio.id, next);
  const updated = await repo.findOne({ where: { _id: portfolio.id } });
  res.json(updated);
});

export default router;


