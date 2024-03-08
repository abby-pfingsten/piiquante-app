const Sauce = require("../models/sauce");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const fs = require("fs");

// exports.createThing = (req, res, next) => {
//   req.body.thing = JSON.parse(req.body.thing);
//   const url = req.protocol + "://" + req.get("host");
//   const thing = new Thing({
//     title: req.body.thing.title,
//     description: req.body.thing.description,
//     imageUrl: url + "/images/" + req.file.filename,
//     price: req.body.thing.price,
//     userId: req.body.thing.userId,
//   });
//   thing
//     .save()
//     .then(() => {
//       res.status(201).json({
//         message: "Post saved successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// };

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      if (sauce) {
        res.status(200).json(sauce);
      } else {
        res.status(404).json({
          error: "Sauce not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);

      res.status(404).json({
        error: error.message,
      });
    });
};

exports.addOneSauce = (req, res, next) => {
  req.body.sauce = JSON.parse(req.body.sauce);

  const url = req.protocol + "://" + req.get("host");

  const sauce = new Sauce({
    userId: req.body.sauce.userId,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + "/images/" + req.file.filename,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sauce saved successfully!",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: error.message,
      });
    });
  
  //   Sauce.updateOne({ _id: req.params.id }, sauce)
  //     .then(() => {
  //       res.status(201).json({
  //         message: "Sauce added successfully!",
  //       });
  //     })
  //     .catch((error) => {
  //       res.status(400).json({
  //         error: error.message,
  //       });
  //     });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Sauce deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};

exports.getAllSauces = (req, res, next) => {
  // find method returns an array containing all of the
  //  Things in the database
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
