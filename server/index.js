require("dotenv").config({ path: require("find-config")(".env") });
const port = process.env.PORT || 8080;
const path = require("path");
const express = require("express");
const api = require("./api/index");

const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(express.urlencoded());
app.use(express.json());

app.use("/api", api);
app.get("*", (req, res) => res.sendFile(path.resolve("build", "index.html")));

app.listen(port);
console.log("Server successfully started on PORT " + port);
