// 1️⃣ Wait until page fully loads
document.addEventListener("DOMContentLoaded", () => {

    // Navbar active link
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // 2️⃣ Select file button
    const selectBtn = document.querySelector(".select-btn");
    const fileInput = document.getElementById("fileInput");
    const fileListContainer = document.querySelector(".file-list");
    const dropArea = document.querySelector(".drop-area");

    selectBtn.addEventListener("click", () => {
        fileInput.click();
    });

    //  Handle file selection
    fileInput.addEventListener("change", (e) => {
        handleFiles(e.target.files);
    });

    //  Drag & drop
    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("dragover");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("dragover");
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("dragover");
        handleFiles(e.dataTransfer.files);
    });

    //  Function to display files
    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileRow = document.createElement("div");
            fileRow.classList.add("file-row");

            fileRow.innerHTML = `
                <div class="file-info">
                    <span class="file-icon">📄</span>
                    <div>
                        <strong>${file.name}</strong>
                        <p>${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <div class="progress">
                    <div class="progress-bar blue" style="width: 0%;"></div>
                </div>
                <span class="percent">0%</span>
                <span class="cancel">✖</span>
            `;

            fileListContainer.appendChild(fileRow);

            // Fake upload animation (for beginner demo)
            let progress = 0;
            const progressBar = fileRow.querySelector(".progress-bar");
            const percent = fileRow.querySelector(".percent");
            const interval = setInterval(() => {
                if (progress >= 100) {
                    clearInterval(interval);
                    percent.innerText = "Uploaded";
                } else {
                    progress += 1;
                    progressBar.style.width = progress + "%";
                    percent.innerText = progress + "%";
                }
            }, 50);

            // Cancel button
            const cancelBtn = fileRow.querySelector(".cancel");
            cancelBtn.addEventListener("click", () => {
                fileRow.remove();
                clearInterval(interval);
            });
        }
    }

});