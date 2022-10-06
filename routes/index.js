var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path')
const sequelize = require("sequelize");
const { newss } = require('../models');
const auth = require('../auth');

const db = require('../models');
const News = db.newss;
const Comment = db.comments;
const User = db.users;

var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config = require('../config')
const passport = require('passport');


// Configure multer
const storageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images')
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({ storage: storageEngine })


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'Tentang Kami',
    session: req.session.islogin
  });
});

router.get('/register', function (req, res, next) {
  res.render('register', {
    title: 'Form Register',
    session: req.session.islogin
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
    })
    .catch(err => {
      res.render('register', {
        title: 'Form Register'
      });
    });
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Form Login',
    session: req.session.islogin
  });
});

router.post('/login', function (req, res, next) {
  User.findOne({ where: { username: req.body.username } })
    .then(data => {
      if (data) {
        var loginValid = bcrypt.compareSync(req.body.password, data.password);
        if (loginValid) {
          req.session.islogin = true;
          req.session.username = req.body.username;
          res.redirect('/news');
        } else {
          res.redirect('/login');
        }
      } else {
        res.redirect('/login');
      }
    })
    .catch(err => {
      res.redirect('/login');
    });
});

router.get('/news', function (req, res, next) {
  News.findAll({
    order: [[sequelize.literal('"updatedAt"'), 'DESC']],
    include: Comment
  })
    .then(data => {
      console.log(data)
      res.render('news', {
        title: 'Z NEWS Portal Berita Terupdate',
        newss: data,
        session: req.session.islogin
      });
    })
    .catch(err => {
      res.json({
        info: "Error",
        message: err.message
      });
    });
});

router.get('/add', auth, function (req, res, next) {
  res.render('add', {
    title: 'Add News',
    session: req.session.islogin
  });
});

router.post('/add', upload.single('gambar'), function (req, res, next) {
  filegambar = req.file.destination + '/' + req.file.filename;
  var news = {
    judul: req.body.judul,
    category: req.body.category,
    gambar: filegambar,
    desc: req.body.desc
  }
  News.create(news)
    .then(data => {
      res.redirect('/news');
      console.log(req.body)
    })
    .catch(err => {
      res.render('add', {
        title: 'Add News'
      });
    });
});

router.get('/detailnews/:id', function (req, res, next) {
  var id = parseInt(req.params.id); // productdetail?id=xxx
  console.log(id)
  const detail = News.findByPk(id, { include: Comment })
    .then(data => {
      if (data) {
        console.log(data)
        console.log(data.comments)
        res.render('detailnews', {
          title: 'Detail News',
          newss: data,
          komen: data.comments,
          session: req.session.islogin
        });
      } else {
        // http 404 not found
        res.render('data', {
          title: 'Detail News',
          newss: {}
        });
      }
    })
    .catch(err => {
      res.render('detailnews', {
        title: 'Detail News',
        newss: {}
      });
    });

});

router.get('/editnews/:id', auth, function (req, res, next) {
  var id = parseInt(req.params.id); // /detail/2, /detail/3
  News.findByPk(id)
    .then(detailNews => {
      if (detailNews) {
        res.render('edit', {
          title: 'Detail News',
          id: detailNews.id,
          judul: detailNews.judul,
          category: detailNews.category,
          gambar: detailNews.gambar,
          desc: detailNews.desc,
          session: req.session.islogin
        });
      } else {
        // http 404 not found
        res.redirect('/news');
      }
    })
    .catch(err => {
      res.redirect('/news');
    });
});

router.post('/editnews/:id', upload.single('gambar'), function (req, res, next) {
  filegambar = req.file.destination + '/' + req.file.filename;
  var id = parseInt(req.params.id); // /detail/2, /detail/3
  var news = {
    judul: req.body.judul,
    category: req.body.category,
    gambar: filegambar,
    desc: req.body.desc
  }
  News.update(news, {
    where: { id: id }
  })
    .then(num => {
      res.redirect('/news');
    })
    .catch(err => {
      res.json({
        info: "Error",
        message: err.message
      });
    });
});

router.get('/deletenews/:id', auth, function (req, res, next) {
  var id = parseInt(req.params.id); // /detail/2, /detail/3
  News.destroy({
    where: { id: id },
  })
    .then(num => {
      res.redirect('/news');
    })
    .catch(err => {
      res.json({
        info: "Error",
        message: err.message
      });
    });
});

router.post('/addcomment/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  console.log(id)
  var komen = {
    description: req.body.description,
    newsId: id,
    session: req.session.islogin
  }
  Comment.create(komen)
    .then(data => {
      res.redirect('/detailnews/' + id);
    })
    .catch(err => {
      res.redirect('/news');
    });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
