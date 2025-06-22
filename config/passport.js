import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AppDataSource } from "../database/db.js";
import { User } from "../entities/userEntity.js";

const configurePassport = () => {
    passport.serializeUser((user, done) =>{
        done(null, user.id)
    }) //tells Passport to store only user.id in the session

    passport.deserializeUser(async (id, done) => {
        try{
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOneBy({ id });
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
 // Configuring Google OAuth strategy
 passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
 }, async (accessToken, refreshToken, profile, done) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        let user = await userRepository.findOneBy({ googleId: profile.id });

        if (user) {
            done(null, user);
        } else {
            // If the user doesn't exist, create a new one
            user = userRepository.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                profilePicture: profile.photos ? profile.photos[0].value : null,
                // You can add more fields as needed
            });
            await userRepository.save(user);
            done(null, user);
        }
    } catch (error) {
        console.error("Error during Google authentication:", error);
        done(error, null);
    }
 }));
};

export default configurePassport;