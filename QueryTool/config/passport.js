const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../models/mongooseUser');

passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
})

passport.deserializeUser((id, done) => {
  user.findById(id, (err, usuario) => {
    done(err, usuario);
  })
})

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    user.findOne({ email }, (err, usuario) => {
      if (!usuario) {
        return done(null, false, { message: `El email ${email} no está registrado.` });
      } else {
        usuario.compararPassword(password, (err, sonIguales) => {
          if (sonIguales) {
            return done(null, usuario); // match exitoso
          } else {
            return done(null, false, { message: 'La contraseña no es válida.' });
          }
        })
      }
    })
  }
))

exports.estaAutenticado = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Debe hacer login para acceder a este recurso.');
}