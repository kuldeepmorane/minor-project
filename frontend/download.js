//  Navbar active link logic
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});


// Tabs switching logic
const tabs = document.querySelectorAll(".tabs button");
const notesGrid = document.querySelector(".notes-grid"); // parent container

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // For simplicity, we just show an alert for now
        // Later you can filter notes dynamically based on tab
        // alert("You clicked tab: " + tab.innerText);
    });
});


//  Download button click effect
const downloadBtns = document.querySelectorAll(".download-btn");

downloadBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.style.transform = "scale(0.95)"; // button shrink effect
        setTimeout(() => {
            btn.style.transform = "scale(1)";
        }, 150);

        // Alert to show user clicked download
        // Later you can integrate backend API to actually download
        alert("Downloading file...");
    });
});


//  Pagination logic (simple)
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const pages = document.querySelectorAll(".pages span");

pages.forEach(page => {
    page.addEventListener("click", () => {
        pages.forEach(p => p.classList.remove("active"));
        page.classList.add("active");
        alert("Switched to page " + page.innerText);
    });
});

prevBtn.addEventListener("click", () => {
    alert("Previous page clicked");
});

nextBtn.addEventListener("click", () => {
    alert("Next page clicked");
});