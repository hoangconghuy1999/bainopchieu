const express = require("express");
var userConBook = require("../services/book")
    // const user = require("../services/user");
var book = require("../services/book")
var router = express.Router();
// var userControl = require("../services/user");

const PAGE_SIRE = 1

const bcrypt = require('bcrypt');
let checkAuth = require("../middlewares/auth")
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { json } = require("body-parser");

router.get("/", function(req, res) {
    userConBook.getUser()
        .then((data) => {
            res.json({
                error: false,
                messenge: "hiển thị dữ liệu thành công",
                value: data,

            })
        })
        .catch((err) => {
            res.json({
                error: true,
                messenge: err,
            })
        })
})

router.get("/:id/:token", function(req, res, next) {
        try {
            var token = req.params.token;
            var decode = jwt.verify(token, "nodemy");
            userConBook.getUserID(decode._id).then((user) => {
                if (user._id === req.params._id || user.roles === "admin") {
                    return next();
                }
            }).catch((err) => {

            });
        } catch (error) {
            return res.json({
                err: "lỗi",
                message: "lỗi tìm kiếm" + error,
            })
        }
    },
    function(req, res) {
        var id = req.params.id;
        userConBook
            .getUserID(id)
            .then((data) => {
                if (data) {
                    return res.json({
                        error: false,
                        messenge: "hiển thị chi tiet dữ liệu thành công",
                        value: data,
                    });
                }
                return res.json("khong ton tai id dos");
            })
            .catch((err) => {
                return res.json(err);
            });
    });
router
    .post("/", (req, res) => {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password
        var obj = {
            name,
            email,
            password,
        }
        userConBook.existsSignUp(email)
            .then((data) => {
                if (!data) {
                    return userControl
                        .createUser(obj)
                        .then((data) => {
                            res.json("taoj moi thanh cong");
                        })
                        .catch((err) => {
                            res.json("chuwa tao duoc");
                        });
                }
                res.json({
                    error: true,
                    messenge: "email này đã tồn tại",
                });


            }).catch((err) => {
                res.json({
                    error: true,
                    messenge: err,
                });
            });
    })

router.post("/sign-up", checkAuth.checkAuthEmail, function(req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var roles = req.body.roles
            // var obj = {
            //         username: username,
            //         email: email,
            //         password: password,
            //         roles: roles
            //     }
            // var roles = req.body.roles;
        console.log("bạn đang ở function sau");
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // return console.log(hash)
                var obj = {
                    username: username,
                    email: email,
                    password: hash,
                    roles: roles
                }
                userConBook
                    .createUser(obj)
                    .then((obj) => {
                        res.json({
                            error: false,
                            message: "đăng kí thành công ",
                            value: obj

                        })
                    }).catch((err) => {
                        res.json({
                            error: true,
                            message: "đăng kí không thành công i"
                        })
                    });
            });
        });

    }),
    router.post("/login", function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        userConBook.checkEmail(email).then((user) => {
            if (!user) {
                return res.json({
                    message: "Nguời dùng không tồn tại",
                    error: true
                })
            }
            bcrypt.compare(password, user.password).then(function(result) {
                if (result) {
                    var token = jwt.sign({ _id: user._id }, "nodemy", { expiresIn: "1d" });
                    // giá trị mà mình sẽ sử dụng sau khi người dùng gửi lại mã token này
                    // privateKey: là thông tin khóa bí mật(khóa này không được tiết lộ ra ngoài)
                    // option: thông tin thuật toán mã hóa, ... thời gian tồn tại của token: expiresIn dưới dạng ms
                    return res.json({
                        message: "Đăng nhập thành công",
                        error: false,
                        user: user,
                        token: token
                    })
                }

                return res.json({
                    message: "Đăng nhập không thành công",
                    error: true,
                })
            });
        }).catch((err) => {
            res.json({
                error: true,
                message: "không thể kết nối được server"
            })
        });
    }),
    router.put("/:id/:token", (req, res, next) => {
            try {
                var token = req.params.token;
                var decode = jwt.verify(token, "nodemy");
                userConBook.getUserID(decode._id).then((user) => {

                    if (user[0]._id == req.params.id || user[0].roles === "admin") {
                        return next();
                    }
                }).catch((err) => {

                });
            } catch (error) {
                return res.json({
                    err: "lỗi",
                    message: "lỗi tìm kiếm" + error,
                })
            }
        },
        function(req, res) {
            var body = {};
            var id = req.params.id;
            if (req.body.email) body.email = req.body.email;
            if (req.body.username) body.username = req.body.username;
            if (req.body.password) body.password = req.body.password;
            if (req.body.phone) body.phone = req.body.phone;
            if (req.body.school) body.school = req.body.school;
            userConBook
                .existsId(id)
                .then((data) => {
                    if (data) {
                        console.log(data)
                        return userControl
                            .updateUser(id, body)
                            .then((data) => {
                                res.json("cap nhat thanh cong");
                            })
                            .catch((err) => {
                                res.json("caapj nhaatj thaats baij");
                            });
                    }
                    res.json("khong co phan tu nay");
                })
                .catch((err) => {
                    res.json("khong co phan tu nay");
                });

        }),
    router.delete("/:id/:token", function(req, res, next) {
            try {
                var token = req.params.token;
                var decode = jwt.verify(token, "nodemy");
                console.log(token)
                userConBook.getUserID(decode._id)
                    .then((user) => {
                        console.log(user)
                        if (user[0]._id == req.params.id || user[0].roles === "admin") {
                            return next();
                        }
                    })
                    .catch((err) => {

                    });
            } catch (error) {
                res.json({
                    err: "lỗi",
                    message: "lỗi tìm kiếm" + error,
                })
            }

        },

        function(req, res) {

            var id = req.params.id;
            userConBook
                .deleteUser(id)
                .then((data) => {
                    console.log(data)
                    return res.json({
                        error: false,
                        messenge: "xóa thamhf công",
                    });
                })
                .catch((err) => {
                    return res.json({
                        error: true,
                        messenge: err,
                    });
                });
        })

router.get("/decode", function(req, res) {
    var token = req.query.token;
    var decode = jwt.verify(token, "huy")
    res.json({
        messenge: "giair max thanhf cong",
        user: decode
    })
})

module.exports = router;