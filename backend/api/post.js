const router = require("express").Router();

const { authMiddleware } = require("../middlewares/auth");
const { createPost, getPosts, like, comment } = require("../services/post");

router.get("/", authMiddleware(true), (req, res) => {
  getPosts().then((posts) => res.json(posts));
});

router.post("/", authMiddleware(true), (req, res) => {
  const authorId = req.user._id;
  const { image, content } = req.body;
  createPost(authorId, content, image).then((newPost) => res.json(newPost));
});

router.post('/:id/like', authMiddleware(true), (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  like(userId, id).then((updatedPost) => res.json(updatedPost));
});

router.post('/:id/comment', authMiddleware(true), (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const { content } = req.body;
  comment(userId, id, content).then((updatedPost) => res.json(updatedPost));
});

module.exports = router;
