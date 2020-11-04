const router = require('express').Router();
const { authMiddleware } = require("../middlewares/auth");
const { getAllUser } = require("../services/user")

router.get("/", (req, res) => {
    getAllUser().then((users) => res.json(users));
})

module.exports = router;