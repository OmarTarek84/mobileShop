const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const User = require('./models/user');
const config = require('./config/keys');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
  }, async (payload, done) => {
    try {
      // Find the user specified in token
      const user = await User.findById(payload.sub);
  
      // If user doesn't exists, handle it
      if (!user) {
        return done(null, false);
      }
  
      // Otherwise, return the user
      done(null, user);
    } catch(error) {
      done(error, false);
    }
  }));

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    return User.findOne({googleId: profile.id}).then(user => {
        if (user) {
            console.log('user exists');
            return done(null, user);
        }
        const newUser = new User({
            email: profile.emails[0].value,
            googleId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            createdMobiles: [],
            cart: [],
            orders: []
        });
        return newUser.save().then(res => {
            return done(null, res);
        });
    })
    .catch(err => {
        console.log(err);
    });
}));