const mongoose = require("mongoose");
const Note = require("./models/note");

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/notesDB")
    .then(() => console.log("DB connected for seeding"))
    .catch(err => console.log(err));

// Default notes data
const notes = [{
        title: "demo",
        subject: "document",
        file: "Are school scores indicators of talent.docx"
    }, {
        title: "C Programming Complete Notes",
        subject: "Computer Science Eng",
        file: "c-programming.pdf"
    },
    {
        title: "Data Structures Notes",
        subject: "Computer Science Eng",
        file: "ds.pdf"
    },
    {
        title: "Mechanical Engineering Maths",
        subject: "Mechanical Engineering",
        file: "mech-maths.pdf"
    },
    {
        title: "Thermodynamics Notes",
        subject: "Mechanical Engineering",
        file: "thermo.pdf"
    },
    {
        title: "Basic Electrical Engineering",
        subject: "Electrical Engineering",
        file: "electrical.pdf"
    },
    {
        title: "Civil Engineering Materials",
        subject: "Civil Engineering",
        file: "civil-materials.pdf"
    },
    {
        title: "Web Development Basics",
        subject: "Computer Science Eng",
        file: "web-dev.pdf"
    }
];

// Insert into DB
Note.insertMany(notes)
    .then(() => {
        console.log("✅ Notes inserted successfully");
        mongoose.connection.close();
    })
    .catch(err => {
        console.log("❌ Error inserting notes:", err);
        mongoose.connection.close();
    });