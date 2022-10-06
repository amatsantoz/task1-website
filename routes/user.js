var express = require('express');
var router = express.Router();


const db = require('../models');
const User = db.users;

var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config = require('../config')
const passport = require('passport');



/* GET home page. */
router.get('/',
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    User.findAll({
      attributes: ['name', 'email', 'username']
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.json({
          info: "Error",
          message: err.message
        });
      });
  });


router.post('/register', function (req, res, next) {
  var hashpass = bcrypt.hashSync(req.body.password, 8);

  var user = {
    name: req.body.fullname,
    email: req.body.email,
    username: req.body.username,
    password: hashpass
  }
  User.create(user)
    .then(data => {
      res.redirect('/news');
      // res.send(data);
    })
    .catch(err => {
      res.json({
        info: "Error",
        message: err.message
      });
    });
});

router.post('/login', function (req, res, next) {
  User.findOne({ where: { username: req.body.username } })
    .then(data => {
      if (data) {
        var loginValid = bcrypt.compareSync(req.body.password, data.password);
        if (loginValid) {
          var payload = {
            userid: data.id,
            username: req.body.username
          };
          let token = jwt.sign(
            payload,
            config.secret, {
            expiresIn: '3h'
          }
          );
          let dt = new Date();
          dt.setHours(dt.getHours() + 3);
          res.json({
            success: true,
            token: token,
            expired: dt.toLocaleDateString() + " " + dt.toLocaleString()
          })
        } else {
          res.send({ message: "Login Gagal, Salah Password" });
        }
      }
      else {
        res.send({ message: "Login Gagal, Username Salah" });
      }
    })
    .catch(err => {
      res.json({
        info: "Error",
        message: err.message
      });
    });
});

router.put('/:username', function (req, res, next) {
  const username = req.params.username;
  var hashpass = bcrypt.hashSync(req.body.password, 8);

  var user = {
    name: req.body.name,
    email: req.body.email,
    password: hashpass
  }
  User.update(user, {
    where: { username: username }
  })
    .then(num => {
      if (num > 0) {
        res.send({ message: "data diperbarui" });
      } else {
        // http 404 not found
        res.status(404).send({
          message: "Tidak ada data id = " + id
        })
      }

    })
    .catch(err => {
      res.json({
        info: "Error",
        message: err.message
      });
    });
});

router.get('/logout', function (req, res, next) {
  res.send({ message: "Anda Berhasil Logout" });
});


module.exports = router;
