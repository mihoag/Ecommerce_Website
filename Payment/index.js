require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const https = require("https");
const http = require('http');
const route = require('./routes/index.r')

const port = process.env.PORT_GD;
//console.log(port);
app.use(
    cors({
        origin: process.env.ROOT_SERVER,
        credentials: true,
    }),
);
//console.log(process.env.PORT_SERVER);
const credentials = {
    key: process.env.PRIVATE_KEY,
    cert: process.env.CERTIFICATE,
};
//console.log(process.env.PRIVATE_KEY)
//console.log(process.env.CERTIFICATE)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

const server = https.createServer(
    credentials
    , app)

//const server = http.createServer(app);
server.listen(port, () =>
    console.log(`Auth server listening on port ${port}`),
);
