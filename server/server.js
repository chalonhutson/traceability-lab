const express = require("express");
const cors = require("cors");
const ctrl = require("./controller.js");

const app = express();

app.use(express.json());
app.use(cors());


app.get("/api/getPass/:password", ctrl.passEncrypt)
app.post("/api/login", ctrl.login)
app.post("/api/register", ctrl.register)



app.listen(5000, ()=> console.log("Running on Port 5000."))