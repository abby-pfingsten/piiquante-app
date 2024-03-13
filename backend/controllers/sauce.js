const Sauce = require("../models/sauce");
const fs = require("fs");

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
  //  Sauces in the database
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

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      userId: req.body.sauce.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + "/images/" + req.file.filename,
      heat: req.body.sauce.heat,
      likes: req.body.sauce.likes,
      dislikes: req.body.sauce.dislikes,
      usersLiked: req.body.sauce.usersLiked,
      usersDisliked: req.body.sauce.usersDisliked,
    };
  } else {
    sauce = {
      _id: req.params.id,
      userId: req.body.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      usersLiked: req.body.usersLiked,
      usersDisliked: req.body.usersDisliked,
    };
  }
  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.setLikes = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((oldSauce) => {
    let sauce = new Sauce({ _id: req.params._id });

    // initialize the like/dislike counts
    // and users liked/disliked arrays
    let likeCount = 0;
    let dislikeCount = 0;
    let likedUsers = [];
    let dislikedUsers = [];

    if (req.body.like === 1) {
      // you only want a user to be able to like
      // if (req.body.userId !== oldSauce.userId) {
      if (!oldSauce.usersLiked.includes(req.body.userId)) {
        likeCount += 1;
        likedUsers.push(req.body.userId);
      }
    } else if (req.body.like === -1) {
      if (!oldSauce.usersDisliked.includes(req.body.userId)) {
        // if (req.body.userId !== oldSauce.userId) {
        dislikeCount += 1;
        dislikedUsers.push(req.body.userId);
      }
    } else {
      // you only want this chunk to do anything if the
      // user is the same aka they have already liked
      // or disliked something
      // if (req.body.userId == oldSauce.userId) {
      if (oldSauce.usersDisliked.includes(req.body.userId)) {
        // likeCount = -1;
        dislikeCount -= 1;
      } else if (oldSauce.usersLiked.includes(req.body.userId)) {
        likeCount -= 1;
      }
    }

    sauce = {
      _id: req.params.id,
      userId: req.body.userId,
      name: oldSauce.name,
      manufacturer: oldSauce.manufacturer,
      description: oldSauce.description,
      mainPepper: oldSauce.mainPepper,
      imageUrl: oldSauce.imageUrl,
      heat: oldSauce.heat,
      likes: (oldSauce.likes += likeCount),
      dislikes: (oldSauce.dislikes += dislikeCount),
      usersLiked: likedUsers,
      usersDisliked: dislikedUsers,
    };
    // }
    Sauce.updateOne({ _id: req.params.id }, sauce)
      .then(() => {
        res.status(201).json({
          message: "Sauce likes updated successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};
