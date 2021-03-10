const express = require('express')
const router = express.Router()
const path = require('path')

const userRouter = require('./userRouter')

router.use('/user', userRouter)

router.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"))
})
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/home.html"))
})
router.get('/detail/:id', (req, res) => {
    res.sendFile(path.join(__dirname, "../views/detail.html"))
})
module.exports = router