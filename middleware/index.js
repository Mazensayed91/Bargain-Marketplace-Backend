const express = require("express");
const jwt = require("jsonwebtoken");
const proxy = require("http-proxy");
const cors = require("cors");

let proxies = [
    proxy.createProxyServer({
        host: "http://localhost",
        port: 5000
    }),
    proxy.createProxyServer({
        host: "http://localhost",
        port: 5001
    })
];

const app = express();
app.use(cors());
app.use(express.json());
const auth = new Set(["/login", "/signup"])


app.use("*", async (req, res, next) => {
    let region = "";
    if(auth.has(req.path)){
        region = req.body.region;
    }else{
        const token = req.headers["x-auth-token"];
        if (!token) return res.status(401).send("UnAuthorized");
        const payload = jwt.decode(token).payload;
        region = payload.region;
    }
    // payload.region is going to be an integer from 0 to n
    proxies[payload.region].web(req, res, next);

})