const express = require("express");
const app = express();
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const mongoose = require("mongoose");
const cors = require("cors");



app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/notesDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/api/notes", require("./routes/noteRoutes"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});