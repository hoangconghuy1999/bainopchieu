var userRouter = require('./userRouter');
var routerBook = require("./routerBook")
var display = require('./display')
var userbook = require("./")

function initRouter(app) {
    app.use("/user", userRouter);
    app.use("/", display);
    app.use("/book", routerBook)

    return app;
}

module.exports = initRouter
    // llllllll