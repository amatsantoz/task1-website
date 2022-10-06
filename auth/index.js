// 'use strict'; //sinle instance


const auth = function (req, res, next) {
  if (req.session && req.session.islogin) {
    // sudah login
    // tambahin logic

    return next();
  } else {
    // belum login
    return res.sendStatus(401);
  }
};


module.exports = auth;


// const passport = require('passport');
// var JwtStrategy = require('passport-jwt').Strategy,
//   ExtractJwt = require('passport-jwt').ExtractJwt;


// const db = require('../models');
// const User = db.users;
// const Op = db.Sequelize.Op;

// var config = require('../config')
// var opts = {}

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = config.secret;

// passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
//   //logic

//   User.findByPk(jwt_payload.userid)
//     .then(data => {
//       if (data) {
//         return done(null, data);
//       } else {
//         //http 404 not found
//         return done("user tidak terdaftar", false);
//       }
//     })
//     .catch(err => {
//       return done("user tidak terdaftar", false);
//     })
// }))