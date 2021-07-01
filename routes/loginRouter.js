const express = require("express");
const passport = require("passport");
const loginController = require("../controllers/loginController");

const router = express.Router();

router
  .route("/login")
  .get(loginController.facebookLogin)
  .post(
    passport.authenticate("facebook")
  );
router.get("/faillogin", loginController.failLogin);

router.get("/logout", loginController.facebookLogout);

router.get(
  "/login/callback",
  passport.authenticate("facebook", {
    successRedirect: "/login",
    failureRedirect: "/faillogin",
  })
);

module.exports = router;
