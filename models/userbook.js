const { Schema } = require("mongoose")
var mongoose = require("../config/dbConfig")
var schema = mongoose.Schema
let userbook = new Schema({
    name: String,
    email: String


})
var userbookExports = mongoose.model("book", userbook)
module.exports = userbookExports