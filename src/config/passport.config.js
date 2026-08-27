const passport = require('passport');
const jwt = require('passport-jwt');
const { PRIVATE_KEY } = require('../utils');

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    // Estrategia para extraer y validar el token JWT
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            // Si el token es válido, pasamos el usuario al objeto req (req.user)
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error);
        }
    }));
};

module.exports = initializePassport;