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

router = express.Router();

export default (app) => {
  router.post("/", create);
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", deletePost);
  router.delete("/", deleteAll);
  router.patch("/:id/likePost", likePost);
  app.use("/api/posts", router);
};
