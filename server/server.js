const express = require("express");
// const cors = require("cors");
// const ctrl = require("./controller.js");

const path = require("path");

const app = express();


app.use(express.json());
// app.use(cors());



let Rollbar = require("rollbar");
let rollbar = new Rollbar({
    accessToken: '3d7f98e1119d4e658467f6bd7f7b33d2',
    captureUncaught: true,
    captureUnhandledRejections: true
});



app.get("/", (req, res) => {
    try {
        console.log("testing 232342")
        rollbar.log("Test 1223123")
        res.sendFile(path.join(__dirname, "../client/index.html"))
    } catch(err){
        console.log(err)
        rollbar.error(err)
    }
});

app.use(express.static("client"));
const port = process.env.PORT || 5050;

// app.get("/api/getPass/:password", ctrl.passEncrypt)
// app.post("/api/login", ctrl.login)
// app.post("/api/register", ctrl.register)



app.listen(port, ()=> {
    rollbar.log(`Running on Port ${port}.`);
    console.log(`Running on Port ${port}.`)
});