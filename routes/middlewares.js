module.exports = {
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/");
    }
    next();
  },
  requireStudent(req, res, next) {
    if (req.session.accountType !== "student") {
      return res.redirect("/");
    }
    next();
  },
};
