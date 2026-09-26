import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

import {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL,
} from "./envConfig.js";

import {
    findUserByProvider,
    findUserByEmail,
    createOAuthUser,
    linkProvider,
} from "../repository/userRepository.js";
logger.info("GitHub OAuth env check:", {
    clientId: Boolean(GITHUB_CLIENT_ID),
    clientSecret: Boolean(GITHUB_CLIENT_SECRET),
    callbackUrl: Boolean(GITHUB_CALLBACK_URL),
});

passport.use(
    new GitHubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: GITHUB_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const provider = "github";
                const providerId = profile.id;

                const email = profile.emails?.[0]?.value;
                const name = profile.displayName || profile.username;

                if (!email) {
                    return done(
                        new Error("GitHub account does not have an email"),
                        null
                    );
                }

                // Existing GitHub user
                let user = await findUserByProvider(provider, providerId);

                if (user) {
                    return done(null, user);
                }

                // Existing account with same email
                user = await findUserByEmail(email);

                if (user) {
                    user = await linkProvider(user.id, provider, providerId);

                    return done(null, user);
                }

                // New OAuth user
                user = await createOAuthUser(email, name, provider, providerId);

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;
