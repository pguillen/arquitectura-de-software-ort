const passport = require('passport');
const user = require('../models/mongooseUser');
const log = require("../../Utils/logger");

exports.postSignup = (req, res, next) => {
  const nuevoUsuario = new user({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password
  });

  user.findOne({email: req.body.email}, (err, usuarioExistente) => {
    if (usuarioExistente) {
      return res.status(400).send('Ese email ya está registrado');
    }
    nuevoUsuario.save((err) => {
      if (err) {
        next(err);
      }
      req.logIn(nuevoUsuario, (err) => {
        if (err) {
          next(err);
        }
        res.send('Usuario creado exitosamente');
        log.info(`Nuevo usuario creado: { ${nuevoUsuario.nombre} | ${nuevoUsuario.email} }`);
      })
    })
  })
}

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, usuario, info) => {
    if (err) {
      next(err);
    }
    if (!usuario) {
      return res.status(400).send('Email o contraseña no válidos');
    }
    req.logIn(usuario, (err) => {
      if (err) {
        next(err);
      }
      res.send('Login exitoso');
      log.info(`Login de usuario: { ${usuario.nombre} | ${usuario.email} }`);
    })
  })(req, res, next);
}

exports.logout = (req, res) => {
  log.info(`Logout de usuario: { ${req.user.nombre} | ${req.user.email} }`);
  req.logout();
  res.send('Logout exitoso');
}
