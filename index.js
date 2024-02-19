const express = require("express");
const fs = require("fs");
const path = require("path");
const gtts = require("gtts");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/HOME/index.html", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/Translator/home.html", (req, res) => {
    res.sendFile(__dirname + "/Translator/home.html");
})

app.get("/Translator/home.html", (req, res) => {
    res.sendFile(__dirname + "/Translator/home.html");
})

app.get("/speech-to-text/index.html", (req, res) => {
    res.sendFile(__dirname + "/speech-to-text/index.html");
})

app.get("/speech-to-text/other/wave.gif",(req,res)=>{
    res.sendFile(__dirname + "/speech-to-text/other/wave.gif");
})

app.get("/voice_ass/wave.gif",(req,res)=>{
    res.sendFile(__dirname + "/voice_ass/wave.gif");
})

app.get("/voice_ass/home.html", (req, res) => {
    res.sendFile(__dirname + "/voice_ass/home.html");
    
    app.get("/download", (req, res) => {
        const file = fs.readFileSync("./voice_ass/home.html");

        const text = req.query.text
        const lang = req.query.language

        var outputFile = path.join(__dirname + "/voice_ass");
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
})
    
app.listen(3000, () => {
    console.log("Serving on 3000");
})