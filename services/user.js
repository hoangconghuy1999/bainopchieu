var userModel = require("../models/userModel")
    // var userbook = require("../models/userbook")

function getUser() {
    return userModel.find()
        // hàm hiển thị tất cả dữ liệu 
}

function getUserID(data) {
    return userModel.find({
        _id: data
            // hàm hiển thi dữ liêu theo id
    })
}

function checkEmail(email) {
    return userModel.findOne({ email: email })
}

function existsSignUp(data) {
    return userModel.exists({
        // hàm check xem email tồn tại hay ko
        email: data
    })
}

function existsLogin(data1, data2) {
    return userModel.exists({
        email: data1,
        password: data2
    })
}

function existsId(data) {
    return userModel.exists({ _id: data })
}

function createUser(data) {
    return userModel.create(data)
        // hàm tạo mới dữ liệu
}

function updateUser(data1, data2) {
    return userModel.updateOne({
        // hàm cập nhật dữ liệu theo id
        _id: data1
    }, data2)
}

function deleteUser(data) {
    return userModel.deleteOne({
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
    existsLogin: existsLogin,
    checkEmail: checkEmail
}