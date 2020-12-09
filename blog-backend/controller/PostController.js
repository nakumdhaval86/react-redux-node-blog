var PostModel = require("../model/PostModel");
var mongoose = require("mongoose");
var slugify = require("slugify");

exports.getPosts = function (req, res) {
  PostModel.find().then((result) => {
    res.status(200).json({
      message: "ok",
      data: result,
    });
  });
};

exports.addPost = function (req, res) {
  const { title, body } = req.body;
  console.log(req.body);

  const newPost = new PostModel({
    title,
    body,
    slug: slugify(title),
  });

  newPost
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "ok",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json("err");
    });
};

exports.getPostData = function (req, res) {
  const id = req.params.id;
  PostModel.findById(id).then((result) => {
    res.status(200).json({
      message: "ok",
      data: result,
    });
  });
};

exports.updatePost = function (req, res) {
  const id = req.params.id;
  const { body, title } = req.body;

  const dataObj = {
    id,
    title,
    body,
  };

  PostModel.findByIdAndUpdate(id, {
    title,
    body,
  })
    .then((result) => {
      res.status(200).json({
        message: "ok",
        data: dataObj,
      });
      console.log(dataObj);
    })
    .catch((err) => {
      res.status().json({
        message: "err",
      });
    });
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
