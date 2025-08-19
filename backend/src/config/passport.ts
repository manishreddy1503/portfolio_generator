import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { ENV } from './env';
import { AppDataSource } from './data-source';
import { User } from '../entities/User';

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
      callbackURL: ENV.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken: string, _refreshToken: string, profile: Profile, done) => {
      try {
        const repo = AppDataSource.getMongoRepository(User);
        const email = profile.emails?.[0]?.value || '';
        const avatarUrl = profile.photos?.[0]?.value;
        let user = await repo.findOne({ where: { googleId: profile.id } });
        if (!user) {
          user = await repo.save({
            googleId: profile.id,
            email,
            name: profile.displayName || email || 'User',
            avatarUrl,
          } as any);
        } else {
          const needsUpdate = user.name !== (profile.displayName || user.name) || user.avatarUrl !== avatarUrl;
          if (needsUpdate) {
            await repo.update(user.id as any, { name: profile.displayName || user.name, avatarUrl });
          }
        }
        return done(null, { id: user.id.toString() });
      } catch (err) {
        return done(err as any, undefined);
      }
    }
  )
);

export default passport;


