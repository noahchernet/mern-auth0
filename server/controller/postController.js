import fs from "fs";
import Post from "../model/postModel.js";

// Create and save new post
export const create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty" });
  }
  let fileName = "";
  if (req.file) {
    fileName = req.file.fileName;
  }

  // Create a post
  const post = new Post({
    creator: req.user.email,
    title: req.body.title,
    description: req.body.description,
    image: fileName,
    likes: [],
  });

  // Save Post in the database
  post
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occerred while creating the post.",
      });
    });
};

// Retrieves all Posts from the database, filter the retreived posts with regexp
// if query is provided

export const findAll = async (req, res) => {
  const { title } = req.query;
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  await Post.find(condition)
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occerred while finding every post.",
      });
    });
};

// Find a single post with an id

export const findOne = async (req, res) => {
  const { id } = req.params;

  await Post.findById(id).then((post) => {
    if (!post)
      res.status(404).send({ message: `No post found with id ${id}` });
    else
      res
        .status(200)
        .send(post)
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occerred while finding the post.",
          });
        });
  });
};

// Update a Post by the id in the request
export const update = async (req, res) => {
  if (!req.body)
    return res
      .status(400)
      .send({ message: "Data to update cannot be empty." });

  const { id } = req.params;

  await Post.findByIdAndUpdate(
    id,
    { ...req.body, image: req.file ? req.file.fileName : req.body.currentImg },
    { useFindAndModify: false }
  )
    .then((post) => {
      if (!post)
        res.status(404).send({
          message: `Cannot update Post with id ${id}. Post was not found.`,
        });
      else {
        if (req.file && req.body.currentImg)
          fs.unlinkSync("~/www/photoshare/" + req.body.currentImg);
        res.send({ message: "Post updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occerred while finding and updating the post.",
      });
    });
};

// Delete a Post with specific id
export const deletePost = async (req, res) => {
  const { id } = req.params;

  await Post.findByIdAndRemove(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: `Cannot delete Post with id ${id}. Post was not found.`,
        });
      else res.send({ message: "Post deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occerred while deleting the post.",
      });
    });
};

// Delete all Posts from the database
export const deleteAll = async (req, res) => {
  await Post.deleteMany({ creator: req.user.email })
    .then((data) => {
      if (data) {
        fs.rm("~/www/photoshare/", { recursive: true }, () =>
          fs.mkdirSync("~/www/photoshare/")
        );
        res.send({
          message: `${data.deletedCount} posts were deleted successfully.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occerred while deleting all the posts.",
      });
    });
};

// Like a post, or unlike it
export const likePost = async (req, res) => {
  if (!req.user) return res.status(401).send({ message: "Unauthenticated" });

  const { id } = req.params;

  const post = await Post.findById(id).catch((err) => {
    res.status(500).send({
      message:
        err.message ||
        `Some error occerred while retreiving the post with id ${id}.`,
    });
  });

  const index = post.likes.findIndex((id) => id === String(req.user.email));

  // Add the like to the list of users that liked it
  // if the user has liked it already, unlike it
  if (index === -1) post.likes.push(req.user.email);
  else post.likes = post.likes.filter((id) => id !== String(req.user.email));

  // TODO: update the likes of the post only, not the entire post
  await Post.findByIdAndUpdate(id, post, { new: true })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: `Couldn't like post with id = ${id}` });
      else res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occerred while liking post with id = ${id}`,
      });
    });
};
