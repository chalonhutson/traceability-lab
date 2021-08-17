// const axios = require("axios");
const baseURL = "http://localhost:5000/api/"

const lUser = document.getElementById("login-user");
const lPass = document.getElementById("login-pass");
const lBtn = document.getElementById("login-btn");


const rFn = document.getElementById("reg-fname");
const rLn = document.getElementById("reg-lname");
const rUser = document.getElementById("reg-user");
const rPass = document.getElementById("reg-pass");
const rBtn = document.getElementById("reg-btn");

const notification = document.getElementById("notification");

const upNot = (string) => {notification.innerText = string};

const clearRFields = () => {
    rFn.value = "";
    rLn.value = "";
    rUser.value = "";
    rPassd.value = ""
}


const attemptLogin = () => {
    let body = {"username": `${lUser.value}`, "password": `${lPass.value}`};

    axios.post("http://localhost:5000/api/login", body)
        .then((res) => {upNot(res.data)})
        .catch(({response}) => {upNot(response.data)})
};

const attemptRegister = () => {
    let body = {"fname": rFn.value, "lname": rLn.value, "username": rUser.value, "password": rPass.value}

    axios.post(`${baseURL}register`, body)
        .then((res) => {upNot(res.data); clearRFields()})
        .catch(({response}) => {upNot(response.data)})
};





lBtn.addEventListener("click", attemptLogin);
rBtn.addEventListener("click", attemptRegister);
