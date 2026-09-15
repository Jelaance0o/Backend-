require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes")

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoter);
app.use("/api/posts", postRouter);

module.exports = app;
