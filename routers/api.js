const express = require("express");
const app = express();
const fs = require("fs");
const QRCode = require('qrcode')

const PREDEFINED_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generate_qrcode(link) {
    QRCode.toDataURL(link, function (err, url) {
        res.send(url);
    });
}

function generateId(len_string) {
    let id = "";
    for (var i = 0; i < len_string; i++) {
        let random_num = Math.floor(Math.random() * (len_string - 0) + 0);
        id += PREDEFINED_STRING[random_num];
    }
    
    return id;
}

app.post("/add_pet", function(req, res) {
    fs.readdir("./database/pets", function(err, items) {
        let pet_id = 0;
        let existing_ids = items.map((v) => v.split(".")[0]);
        let generated_id = "";
        
        //res.send(
        
        do {
            generated_id = generateId(8);
        } while (existing_ids.includes(generated_id));
        
        fs.writeFile(`./database/pets/${generated_id}.json`, req.body.pet_data);
        
        res.json({
            id: generated_id,
            data: req.body.pet_data
        });
    });
});

module.exports = app;