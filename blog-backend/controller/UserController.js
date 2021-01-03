var UserModel = require("../model/UserModel");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nakumdhaval86@gmail.com",
    pass: "nanosoft01",
  },
});

exports.signUp = function (req, res) {
  const { name, email, password } = req.body;

  console.log(name, email, password);

  UserModel.find({ email }).then(
    (result) => {
      console.log(result.length);

      if (result.length !== 0) {
        res.status(400).json({
          status: 400,
          message: "This email address already registered !",
        });
      } else {
        bcrypt.hash(password, 10, function (err, result) {
          const newUser = new UserModel({
            name,
            email,
            password: result,
          });

          newUser.save().then((result) => {
            const mailoption = {
              from: "Redux Blog System",
              to: email,
              subject: "Creating New Account In Redux Blog ",
              html: `<p>Dear, <strong>${email}</strong>,<br> Thank you for creating user account with our system, 
              <br></p>`,
            };

            transpoter.sendMail(mailoption, function (err, res) {
              if (err) console.log(err);
              else {
                console.log("Email Send" + res.response);
              }
            });

            res
              .json(201)
              .json({
                status: 201,
                message: "user created",
              })
              .catch((err) => {
                console.log("this is new asve erro");
                console.log(err);
              });
          });
        });
      }
    },
    (err) => {
      console.log(err);
    }
  );
};

exports.login = function (req, res) {
  const { email, password } = req.body;

  UserModel.findOne({ email }).then((data) => {
    if (!data) {
      console.log("Sorry ! User not Found");
      res.status(400).json({
        status: 400,
        message: "Sorry ! User not Found",
      });
    } else {
      bcrypt.compare(password, data.password, function (err, result) {
        if (result) {
          console.log("login success");

          var token = jwt.sign(
            { name: data.name, email: data.email, id: data._id },
            "dbsdbsadhdksjdnsalkdjsjkndsandkldnndkasdnaskjd"
          );

          console.log(data);
          const newObj = {
            _id: data._name,
            name: data.name,
            email: data.email,
            token: token,
          };
          console.log("token", token);

          res.cookie(newObj);

          res.status(200).json({
            status: 200,
            message: "login success",
            data: newObj,
          });
        } else {
          console.log("Invalid credentials");
          res.status(400).json({
            status: 400,
            message: "Invalid credentials",
          });
        }
      });
    }
  });
};

exports.forgotRequest = function (req, res) {
  console.log("this is cakked");
  const { email } = req.body;

  UserModel.findOne({ email }).then((result) => {
    const id = result._id;
    console.log(id);
    console.log(result._id);

    var token = jwt.sign({ id }, "dbasdbjsaddbadjkndklj");
    console.log(token);

    const path = "http://127.0.0.1:4000/admin/newpassword/" + id + "/" + token;

    const mailoption = {
      from: "nakumdhaval3211@gmail.com",
      to: email,
      subject: "Redux Blog Forgot Password",
      html: `<p>Dear, <strong>${email}</strong>,<br>Don't worry, you are one step away from forgot password, 
      <br> Click here : <a href=${path}>http://127.0.0.1:3000/forgot/${token}</a> <br></p>`,
    };

    transpoter.sendMail(mailoption, function (err, res) {
      if (err) console.log(err);
      else {
        console.log("Email Send" + res.response);
      }
    });

    res.json({
      id,
      token,
    });
  });
};

exports.forgotPassword = function (req, res) {
  const token = req.params.token;
  const { password, id } = req.body;

  console.log(id);

  jwt.verify(token, "dbasdbjsaddbadjkndklj", function (err, decoded) {
    console.log(decoded.id); // bar
    if (err) {
      res.status(400).json({
        message: "Token expire...",
      });
    } else {
      bcrypt.hash(password, 10, function (err, hash) {
        console.log(hash);

        UserModel.findOneAndUpdate(
          { _id: id },
          {
            password: hash,
          }
        )
          .then((result) => {
            console.log(result);
            console.log("result");
            res.status(200).json({
              message: "Password Updated...",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({
              message: err,
            });
          });
      });
    }
  });
};
