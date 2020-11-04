const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth");
const { register, login, updateMe } = require("../services/auth");

router.post("/register", (req, res) => {
  register(req.body.username, req.body.password)
    .then((createdUser) => {
      res.json(createdUser);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  login(username, password)
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(401).json({ error: err.message });
    });
});

router.get("/me", authMiddleware(true), (req, res) => {
  res.json(req.user);
});

router.put("/me", authMiddleware(true), (req, res) => {
  const payload = req.body;
  updateMe(req.user, payload).then((user) => res.json(user));
});

module.exports = router;
