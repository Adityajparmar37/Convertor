const express = require("express");
const gtts = require("gtts");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
// const say = require("say");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('View engine', 'ejs')

const pathName = path.join(__dirname+"/home.html")

app.get("/", (req, res) => {
    // res.render("home.ejs");
    res.sendFile(pathName);
})


var outputFile = path.join(__dirname + "/voice_ass")

app.get('/', (req, res) => {
    const text = req.body.text
    const lang = req.body.language


    var voice = new gtts(text, lang);
    outputFile = Date.now() + "output.mp3";

    voice.save(outputFile, (err, result) => {

        if (err) {
            fs.unlinkSync(outputFile);
            res.send("Unable to convert to audio");
        }

        res.download(outputFile, (err) => {
            if (err) {
                fs.unlinkSync(outputFile);
                res.send("Unable to download");
            }

            fs.unlinkSync(outputFile);
        })
    })
})


app.listen(1500);