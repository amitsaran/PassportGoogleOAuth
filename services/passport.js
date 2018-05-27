const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require ('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        done(null, user);
    });    
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL:'/auth/google/callback'
        }, (accessToken, refreshToken, profile, done) => {
            User.find({userId: profile.id, authSource: 'google'})
            .then((existingUser) => {
                if(existingUser.length < 1){
                    new User(
                        {
                            userId: profile.id,
                            authSource: 'google',
                            name: profile.displayName
                        }
                    ).save()
                    .then((createdUser) => {
                        done(null, createdUser);
                    });
                }
                else{
                    // user already exists
                    done(null, existingUser[0]);
                }
            });
        }
    )
);

