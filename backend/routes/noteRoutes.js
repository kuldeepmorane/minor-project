const express = require("express");
const multer = require("multer");
const note = require("../models/note");

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cd) => {
        cd(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Upload note
router.post("/upload", upload.single("file"), async(req, res) => {
    const newNote = new Note({
        title: req.body.title,
        subject: req.body.subject,
        file: req.file.filename
    });

    await newNote.save();
    res.json({ message: "Note uploaded successfully" });
});

// Get all notes
router.get("/", async(req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

module.exports = router;