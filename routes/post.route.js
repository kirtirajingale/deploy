const { post } = require("../models/book.model");
const { Router } = require("express");

const postRouter = Router();

// GET REQUEST

postRouter.get("/api/books", async (req, res) => {
  try {
    const { _id } = req.body;
    const {category} = req.query;
    const posts = await post.find({$and:[{_id},{category:{$in:category}}]});
    res.json({ posts, mesg: "Your Posts" });
  } catch (err) {
    res.send(err.message);
  }
});

postRouter.get("/api/books/:id", async (req, res) => {
  try {
    const id = req.params._id;
    const post = await post.findById(id);
    res.send({ post });
  } catch (err) {
    res.send({ mesg: err.message });
  }
});

// POST REQUEST

postRouter.post("/api/books", async (req, res) => {
  try {
    const dataReq = req.body;
    const newPost = new Post(dataReq);
    await newPost.save();
    res.send({ msg: "Post Created", post: newPost });
  } catch (err) {
    res.send(err.message);
  }
});

// PATCH REQUEST

postRouter.patch("/api/books/:id", async (req, res) => {
  try {
    const dataReq = req.body;
    const id = req.params._id;
    const updated = await post.findByIdAndUpdate(id, dataReq);
    res.send({ msg: "Post Updated", post: updated });
  } catch (err) {
    res.send(err.message);
  }
});


// DELETE REQUEST

postRouter.delete("/api/books/:id", async (req, res) => {
  try {
    const id = req.params._id;
    const deletedId = await post.findByIdAndDelete(id);
    if (deletedId) {
      res.send({ msg: "Post Has Been Deleted", post: deletedId });
    } else {
      res.send({ msg: "Post Not Found" });
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = {
  postRouter,
};
