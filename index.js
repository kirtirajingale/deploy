const express = require("express");
const {postRouter} = require("./routes/post.route");
const {auth} = require("./middleware/authenticate");
const {userRouter} = require("./routes/users.route");
const cors = require("cors");
const {connection} = require("./config/db");
require("dotenv").config();
const app = express();
app.use(express.json())

const PORT = process.env.PORT
app.get("/", (req,res) =>{
    res.send("Welcome to Book Store App");
})

app.use("/users",userRouter);
app.use("/posts",auth)
app.use("/posts",postRouter);


app.listen(PORT, async () => {
    try {
        await connection
        console.log(`Connected to Data Base & Port running on ${PORT}`)
    } catch (error) {
        console.log(error)
        console.log("Failed to connect Data Base")
    }
})