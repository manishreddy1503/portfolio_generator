import { Router, Request, Response } from 'express';
import passport from 'passport';
import { ENV } from '../config/env';
import { signToken } from '../utils/jwt';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${ENV.CLIENT_URL}/login?error=oauth` }),
  (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=no_user`);
    }
    const token = signToken({ userId: user.id });
    res.cookie(ENV.COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.redirect(ENV.CLIENT_URL);
  }
);

router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie(ENV.COOKIE_NAME, { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ ok: true });
});

export default router;


