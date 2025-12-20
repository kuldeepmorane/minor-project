let allNotes = []; // saare notes yaha store honge

// FETCH NOTES FROM BACKEND

fetch("http://localhost:5000/api/notes")
    .then(res => res.json())
    .then(notes => {
        allNotes = notes; //  store notes
        renderNotes(allNotes); //  show all
    })
    .catch(err => {
        console.error("Failed to load notes:", err);
    });

// RENDER NOTES FUNCTION

function renderNotes(notes) {
    const notesGrid = document.querySelector(".notes-grid");
    if (!notesGrid) return;

    notesGrid.innerHTML = "";

    if (notes.length === 0) {
        notesGrid.innerHTML = "<p>No notes found</p>";
        return;
    }

    notes.forEach(note => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="tag">FILE</div>
            <h2>${note.title}</h2>
            <p>${note.subject || "General"}</p>
            <span class="meta">
                ${new Date(note.date).toDateString()}
            </span>
            <a 
                class="download-btn" 
                href="http://localhost:5000/uploads/${note.file}" 
                target="_blank"
            >
                ⬇ Download
            </a>
        `;

        notesGrid.appendChild(card);
    });

    attachDownloadAnimation();
}

// DOWNLOAD BUTTON ANIMATION
function attachDownloadAnimation() {
    const downloadBtns = document.querySelectorAll(".download-btn");

    downloadBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.style.transform = "scale(0.95)";
            setTimeout(() => {
                btn.style.transform = "scale(1)";
            }, 150);
        });
    });
}

// SEARCH FUNCTIONALITY

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filteredNotes = allNotes.filter(note =>
        note.title.toLowerCase().includes(value) ||
        (note.subject && note.subject.toLowerCase().includes(value))
    );

    renderNotes(filteredNotes);
});


// CATEGORY FILTER

const categoryCheckboxes = document.querySelectorAll(
    ".sidebar-section input[type='checkbox']"
);

categoryCheckboxes.forEach(box => {
    box.addEventListener("change", () => {

        const selectedCategories = [...categoryCheckboxes]
            .filter(cb => cb.checked)
            .map(cb => cb.parentElement.innerText.trim());

        // All Notes checked
        if (selectedCategories.includes("All Notes")) {
            renderNotes(allNotes);
            return;
        }

        const filteredNotes = allNotes.filter(note =>
            selectedCategories.includes(note.subject)
        );

        renderNotes(filteredNotes);
    });
});