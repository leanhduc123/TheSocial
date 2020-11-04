const { db } = require("../models/post");
const Post = require("../models/post");

const getPosts = () => {
  return Post.find()
    .populate("author")
    .populate({
      path: "comments",
      populate:"user",
    })
    .exec()
    .then((posts) => posts.map((post) => post._doc));
};

const createPost = (authorId, content, image) => {
  const newPost = new Post({ author: authorId, content, image });
  return newPost.save().then((newPost) => newPost._doc);
};

const like =  async(userId, postId) => {
  const post = Post.findById(postId).exec();

  const hasLiked = post.likes.some(likeUserId => {
    return likeUserId.equals(userId);
  });
  if (hasLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }
  return (await post.save())
  .populate('author')
  .populate({
    path: "comments",
    populate: "user",
  })
  .execPopulate()
  .then((updatedPost) => updatedPost._doc);
}

const comment = async (userId, postId, content) => {
  const post = await Post.findById(postId).exec();
  post.comments.push({
    user: userId,
    content: content,
  });
  return (await post.save()).populate('author').populate({
    path: "comments",
    populate:"user",
  }).execPopulate().then((updatedPost) => updatedPost._doc);
};

module.exports = { createPost, getPosts, like, comment };
