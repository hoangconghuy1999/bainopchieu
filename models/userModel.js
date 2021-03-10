const { Schema } = require("mongoose")
var mongoose = require("../config/dbConfig")
var schema = mongoose.Schema
var userSchema = new schema({
    username: String,
    email: String,
    password: String,
    roles: {
        default: "user",
        type: String
    }
})
var userModel = mongoose.model("user", userSchema)

module.exports = userModel
    // hh