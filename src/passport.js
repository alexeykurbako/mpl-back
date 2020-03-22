const passport = require('passport');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('config');


passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.get('auth.jwt.accessTokenSecret'),
        passReqToCallback: true,
    },
    (req, jwtPayload, cb) => {
        if (jwtPayload) {
            req.userId = jwtPayload.id;
        }
        return cb(null, jwtPayload);
    }));
