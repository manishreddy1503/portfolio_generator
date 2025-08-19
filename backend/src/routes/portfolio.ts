import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { AppDataSource } from '../config/data-source';
import { Portfolio } from '../entities/Portfolio';
import { ObjectId } from 'mongodb';

const router = Router();

router.get('/portfolio', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
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
    } as any);
  }
  res.json(portfolio);
});

router.put('/portfolio', requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  const payload = req.body as Partial<Portfolio>;
  const repo = AppDataSource.getMongoRepository(Portfolio);
  let portfolio = await repo.findOne({ where: { userId: new ObjectId(userId) } });
  if (!portfolio) {
    portfolio = await repo.save({ ...payload, userId: new ObjectId(userId) } as any);
    return res.json(portfolio);
  }
  // Merge profile to avoid dropping nested fields like avatarUrl/socials when some are missing in payload
  const next: any = { ...payload };
  if (payload.profile) {
    next.profile = { ...(portfolio as any).profile, ...payload.profile };
  }
  await repo.update(portfolio.id as any, next as any);
  const updated = await repo.findOne({ where: { _id: portfolio.id } });
  res.json(updated);
});

export default router;


