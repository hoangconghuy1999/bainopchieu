// var userModel = require("../models/userModel")
var userbookExports = require("../models/userbook")

function getUser() {
    return userbookExports.find()
        // hàm hiển thị tất cả dữ liệu 
}

function getUserID(data) {
    return userbookExports.find({
        _id: data
            // hàm hiển thi dữ liêu theo id
    })
}

function existsSignUp(data) {
    return userbookExports.exists({
        // hàm check xem email tồn tại hay ko
        email: data
    })
}

function existsLogin(data1, data2) {
    return userbookExports.exists({
        email: data1,
        password: data2
    })
}

function existsId(data) {
    return userbookExports.exists(data)
}

function createUser(data) {
    return userbookExports.create(data)
        // hàm tạo mới dữ liệu
}

function updateUser(data1, data2) {
    return userbookExports.updateOne({
        // hàm cập nhật dữ liệu theo id
        _id: data1
    }, data2)
}

function deleteUser(data) {
    return userbookExports.deleteOne({
        // hàm xóa theo id
        _id: data
    })
}

module.exports = {

    getUser: getUser,
    getUserID: getUserID,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    existsId: existsId,
    existsSignUp: existsSignUp,
    existsLogin: existsLogin
}