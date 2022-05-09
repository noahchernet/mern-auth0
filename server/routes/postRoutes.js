import express from "express";
import {
  create,
  likePost,
  deleteAll,
  deletePost,
  update,
  findOne,
  findAll,
} from "../controller/postController.js";
import checkJWT from "../controller/checkJWT.js";
import fileUpload from "../controller/fileUpload.js";

router = express.Router();

export default (app) => {
  // Create a new Post
  router.post("/", [checkJWT, fileUpload.single("img")], create);

  // Retrieve all Posts. No middleware needed since it's unnecessary when
  // viewing posts
  router.get("/", findAll);

  // Retrieves a single Post.
  // No middleware needed since it's unnecessary when viewing posts
  router.get("/:id", findOne);

  // Update a post with specified id
  // fileUpload middleware needed since the post's image could get updated
  router.put("/:id", [checkJWT, fileUpload.single("img")], update);

  // Delete a Post with id
  router.delete("/:id", checkJWT, deletePost);

  // Delete all Posts
  router.delete("/", checkJWT, deleteAll);

  // Like a Post
  router.patch("/:id/likePost", checkJWT, likePost);

  app.use("/api/posts", router);
};
