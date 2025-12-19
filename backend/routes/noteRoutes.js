const express = require("express");
const multer = require("multer");
const Note = require("../models/note"); // ✅ FIXED

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Upload API
router.post("/upload", upload.single("file"), async(req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            subject: req.body.subject,
            file: req.file.filename
        });

        await newNote.save();
        res.status(201).json({ message: "Note uploaded successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all notes
router.get("/", async(req, res) => {
    const notes = await Note.find().sort({ date: -1 });
    res.json(notes);
});

module.exports = router;