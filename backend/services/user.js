const { User } = require("../models/user")

const getAllUser = () => {
    return User.find({})
        .exec();
}

module.exports = { getAllUser }