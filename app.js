var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser")
var initRouter = require('./routers/index')
var logger = require("morgan");
const router = require('./routers/routerBook');
let rouerUser = require("./routers/userRouter")

app.use(express.static("publics"))
    // app.use(express.static(__dirname + "/publics"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

initRouter(app);
app.use("/user", rouerUser)

app.listen(3000, function() {
        console.log("ddang ket noi tai cong 3000");
    })
    // cho
    // ghghyfyfg