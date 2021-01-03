var express = require("express");
var router = express.Router();
var userController = require("../controller/UserController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    message: "ok",
  });
});

router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/forgot-request", userController.forgotRequest);
router.put("/forgot/:token", userController.forgotPassword);

module.exports = router;
