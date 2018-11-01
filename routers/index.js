const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const QRCode = require('qrcode')
const fs = require("fs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const credentials = {
    "RepeaterCreeper": "password091234956",
    "admin": "admin109253456",
    "eric": "eric10243654",
    "bryan": "bryan17245063",
    "cam": "cam174283"
}

app.get("/", function(req, res){
  res.render("index");
});

app.get("/dashboard", function(req, res) {
    res.render("dashboard");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.get("/profile/:user_id", function(req, res) {
    fs.readFile(`./database/pets/${req.params.user_id}.json`, function(err, data) {
        if (err) throw err;

        let qrCode =
        QRCode.toDataURL(`http://167.99.103.150/profile/${req.params.user_id}`).then(url => {
            res.render("profile", {
                userData: JSON.parse(data),
                qrCode: `<img src='${url}'/>`
            });
        });
    });
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/scan", function(req, res) {
    QRCode.toDataURL("http://167.99.103.150/scan", function (err, url) {
        res.render("scan", {
            qr_code: `<img src="${url}"/>`
        })
    });
});
// POSTS
app.post("/login", function(req, res) {
    let username = req.body.username,
        password = req.body.password;

    if (credentials[username]) { // If it exists
        if (password == credentials[username]) {
            res.json({
                type: "success",
                username: username,
                loggedIn: true
            });
        } else {
            res.json({
                type: "error",
                message: "Incorrect Credentials please try again!"
            });
        }
    } else {
        res.json({
            type: "error",
            message: "This username doesn't exist!"
        })
    }
});

app.post("/register", function(req, res){
    let id = generateId(8);
    res.send(req.body.name);
});

module.exports = app;
