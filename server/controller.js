const bcrypt = require("bcrypt");

let usersInfo = [
    {fname: "Bob", lname: "Johnson", username: "Bobby", password: "$2b$10$P7TCvHEWQK5b8z4SXsxUV.bPy7KHc36vmzYHlLogMS1fvB3YQTmMm"},
    {fname: "Chalon", lname: "Hutson", username: "chadawg", password: "$2b$10$4tlwkjT/29hJrmRd6/h5UuHkFzK5C7C4l9cdk0ItK7/huWPh1aB1K"}
];

class user{
    constructor(fname, lname, username, password){
        this.fname = fname;
        this.lname = lname;
        this.username = username;
        this.password = password
    }
};



const passEncrypt = (pass) => {
    let salt = bcrypt.genSaltSync(10);
    let passHash = bcrypt.hashSync(pass, salt)
    return passHash
};

const passCompare = (pass, hashedPass) => {return bcrypt.compareSync(pass, hashedPass)};

const checkIfUserDoesntExist = (username) => {
    for (let i=0; i < usersInfo.length; i++){
        if (username === usersInfo[i].username){
            return false
        } else if (i === usersInfo.length-1){
            return true
        }
    }
};

const checkIfPasswordMeetsRequirements = (password) => {
    let len = false;
    let symbols = false;
    let numbers = false;
    let symbolCount = 0;
    let numCount = 0;

    for (let i = 0; i < password.length; i++){
        if (password[i] === "!" || password[i] === "@" || password[i] === "#" || password[i] === "$" || password[i] === "%" || password[i] === "^" || password[i] === "&" || password[i] === "*" || password[i] === "(" || password[i] === ")"){
            symbolCount++
        } else if (password[i] === "1" || password[i] === "2" || password[i] === "3" || password[i] === "4" || password[i] === "5" || password[i] === "6" || password[i] === "7" || password[i] === "8" || password[i] === "9" || password[i] === "0"){
            numCount++
        }
    }



    if (symbolCount >= 2){symbols = true}
    if (numCount >= 2){}
    if (password.length >= 6){len = true}

    if (len && symbols && numbers){return true} else {return false}
};


module.exports = {


    passEncrypt: (req, res) => {
        const {password} = req.params;
        res.status(200).send(passEncrypt(password))   
    },


    login: (req, res) => {
        const {username, password} = req.body;
        for (let i=0; i < usersInfo.length; i++){
            if (usersInfo[i].username === username){
                if (passCompare(password, usersInfo[i].password)){
                    res.status(200).send(`Successful login. Username: ${username}.`)
                    console.log(`Client successfully logged in. Username: ${username}`)
                    {break;}
                } else {
                    res.status(403).send("Incorrect password.")
                    console.log(`Client attempted login with wrong password. Username: ${username}.`)
                    {break;}
                };
            } else if (i === usersInfo.length-1){
                console.log(`Client unsuccessfully logged in with username not found. Username: ${username}.`)
                res.status(404).send("User does not exist.");
            }
        }
    },


    register: (req, res) => {
        const {fname, lname, username, password} = req.body;
        if (checkIfUserDoesntExist(username)){

            if (checkIfPasswordMeetsRequirements(password)){
                const newUser = new user(fname, lname, username, passEncrypt(password))
                usersInfo.push(newUser)
                res.status(200).send(`New user created. Username: ${username}.`)
                console.log(`Client registered new user. User: ${newUser.username}`);
            } else {
                res.status(403).send("Password does not meet requirements.\nMust be at least 6 characters, at least 2 numbers, and at least 2 symbols: !@#$%^&*().")
                console.log(`Client attempted to register with password that does not meet the requirements. Username: ${username}.`);
            }

        } else {
            res.status(403).send("Username already in use.")
            console.log(`Client attempted to register with username already in use. Username: ${username}.`);
        }
    }


};
    
