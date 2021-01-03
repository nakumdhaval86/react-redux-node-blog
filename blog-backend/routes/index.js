var express = require("express");
var router = express.Router();
var postController = require("../controller/PostController");
var multer = require("multer");
var jwt = require("jsonwebtoken");

var Storage = multer.diskStorage({});

var upload = multer({ storage: Storage }).single("file");

const LoginCheck = function (req, res, next) {
  let headertoken = req.header("Authorization");
  let token = headertoken.split(" ")[1];

  jwt.verify(
    token,
    "dbsdbsadhdksjdnsalkdjsjkndsandkldnndkasdnaskjd",
    function (err, decoded) {
      req.user = decoded.id;
    }
  );

  next();
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "OK",
    data: "Welcome to our system",
  });
});

router.get("/posts", postController.getPosts);

router.get("/search", postController.searchPost);

router.post("/add-posts", upload, LoginCheck, postController.addPost);

router.get("/posts/:id", LoginCheck, postController.getPostData);

router.put("/posts/:id", upload, LoginCheck, postController.updatePost);

router.delete("/posts/:id", LoginCheck, postController.deletePost);

module.exports = router;
