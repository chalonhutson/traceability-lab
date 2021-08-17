const express = require("express");
const cors = require("cors");
const ctrl = require("./controller.js");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

// include and initialize the rollbar library with your access token
let Rollbar = require("rollbar");
let rollbar = new Rollbar({
  accessToken: '3d7f98e1119d4e658467f6bd7f7b33d2',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar


app.get("/", (req, res) => {
    rollbar.log("Homepage hit!");
    res.sendFile(path.join(__dirname, "/client/index.html"))
})


app.get("/api/getPass/:password", ctrl.passEncrypt)
app.post("/api/login", ctrl.login)
app.post("/api/register", ctrl.register)



app.listen(5000, ()=> {
    rollbar.log(`Running on Port ${port}.`);
    console.log(`Running on Port ${port}`)
});