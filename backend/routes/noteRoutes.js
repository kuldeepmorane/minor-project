const express = require("express");
const multer = require("multer");
const Note = require("../models/note");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // spaces remove to avoid %20 error
        const safeName = file.originalname.replace(/\s+/g, "_");
        cb(null, Date.now() + "-" + safeName);
    }
});

const upload = multer({ storage });


router.post("/upload", upload.single("file"), async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "File not uploaded" });
        }

        const newNote = new Note({
            title: req.body.title,
            subject: req.body.subject,
            file: req.file.filename
        });

        await newNote.save();

        res.status(201).json({
            message: "Note uploaded successfully",
            note: newNote
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/", async(req, res) => {
    try {
        const notes = await Note.find().sort({ date: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;