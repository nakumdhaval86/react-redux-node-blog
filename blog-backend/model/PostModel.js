const mongoose = require("mongoose");

var url =
  "mongodb+srv://admin:ZogvY18wZOEwj1Ad@node-react-blog.kstym.mongodb.net/node-react-blog?retryWrites=true&w=majority";

mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Database Connected");
});

const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  thumb: {
    type: String,
  },
  author: {
    type: ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const postModel = mongoose.model("post", PostSchema);

module.exports = postModel;
