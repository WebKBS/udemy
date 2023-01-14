module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // isAuthenticated 증명하다. 로그인하지 않으면 redirect시킨다.

    req.session.returnTo = req.originalUrl;
    req.flash("Error", "You must be signed in first");
    return res.redirect("/login");
  }
  next();
};
