const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req,res) => {
    res.send("Express is here");
})

app.listen(6000, function () {
    console.log("Server is running");
})
