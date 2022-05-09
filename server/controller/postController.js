import fs from "fs";
import Post from "../model/postModel.js";

// Create and save new post
export const create = () => {
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
        message: err.message || "Some error occerred while creating the post.",
      });
    });
};

// Find a single post with an id

export const findOne = async (req, res) => {
  const { id } = req.params;

  await Post.findById(id).then((post) => {
    if (!post)
      res.status(404).send({ message: "No post found with id ${id}" });
    else
      res
        .status(200)
        .send(post)
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occerred while creating the post.",
          });
        });
  });
};
