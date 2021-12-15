require("dotenv").config({ path: require("find-config")(".env") });
const port = process.env.PORT || 8080;

const express = require("express");
const cors = require("cors");
const api = require("./api/index");

const app = express();

app.use(cors());
app.use("/", express.static("build"));
app.use(express.urlencoded());
app.use(express.json());

app.use("/api", api);

app.listen(port);
console.log("Server successfully started on PORT " + port);
