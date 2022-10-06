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
