var PostModel = require("../model/PostModel");
var slugify = require("slugify");

var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dhan",
  api_key: "472493636738921",
  api_secret: "FKbfMuJXz3jekZki8OEuyNxwY1Q",
});

exports.getPosts = function (req, res) {
  PostModel.find()
    .populate("author")
    .then((result) => {
      res.status(200).json({
        message: "ok",
        data: result,
      });
    });
};

exports.searchPost = function (req, res) {
  const search = req.query.title;

  var regex = new RegExp(search, "i");

  PostModel.find({ title: regex })
    .then((result) => {
      res.json({
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addPost = function (req, res) {
  const { title, body } = req.body;
  console.log(req.file.filename);
  const image = req.file.filename;

  const filepath = req.file.path;

  async function imageUpload() {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result.url);
    const newPost = new PostModel({
      title,
      body,
      author: req.user,
      thumb: result.url,
      slug: slugify(title),
    });
    newPost
      .save()
      .then((result) => {
        res.status(201).json({
          message: "ok",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json("err");
      });
  }

  try {
    imageUpload();
  } catch (error) {
    res.json({
      err: "err",
      message: "error in uploading",
    });
  }
};

exports.getPostData = function (req, res) {
  const id = req.params.id;
  PostModel.findById(id)
    .populate("author")
    .then((result) => {
      res.status(200).json({
        message: "ok",
        data: result,
      });
    });
};

exports.updatePost = function (req, res) {
  const id = req.params.id;
  const { body, title } = req.body;

  async function dataUpdate() {
    const dataObj = {
      id,
      title,
      body,
    };

    if (!req.file) {
      const updateObj = {
        title,
        body,
        author: req.user,
        slug: slugify(title),
      };
      PostModel.findByIdAndUpdate(id, updateObj)
        .then((result) => {
          res.status(200).json({
            message: "ok",
            data: dataObj,
          });
        })
        .catch((err) => {
          res.status().json({
            message: "err",
          });
        });
    } else {
      const result = await cloudinary.v2.uploader.upload(req.file.path);

      const updateObj = {
        title,
        body,
        author: req.user,
        thumb: result.url,
        slug: slugify(title),
      };

      PostModel.findByIdAndUpdate(id, updateObj)
        .then((result) => {
          res.status(200).json({
            message: "ok",
            data: updateObj,
          });
        })
        .catch((err) => {
          res.status().json({
            message: "err",
          });
        });
    }
  }

  dataUpdate();
};

exports.deletePost = function (req, res) {
  const id = req.params.id;

  PostModel.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        message: "ok",
        data: result,
      });
    })
    .catch((err) => {
      res.status().json({
        message: "err",
      });
    });
};
