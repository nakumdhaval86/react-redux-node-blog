var express = require("express");
var router = express.Router();
var postController = require("../controller/PostController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "OK",
    data: "Welcome to our system",
  });
});

router.get("/posts", postController.getPosts);

router.post("/add-posts", postController.addPost);

router.get("/posts/:id", postController.getPostData);

router.put("/posts/:id", postController.updatePost);

router.delete("/posts/:id", postController.deletePost);

module.exports = router;
