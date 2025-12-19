//  Wait until page fully loads
document.addEventListener("DOMContentLoaded", () => {

    // Navbar active link
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    //  Select file button
    const selectBtn = document.querySelector(".select-btn");
    const fileInput = document.getElementById("fileInput");
    const fileListContainer = document.querySelector(".file-list");
    const dropArea = document.querySelector(".drop-area");

    selectBtn.addEventListener("click", () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener("change", (e) => {
        handleFiles(e.target.files);
    });

    // Drag & drop
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

    //  REAL UPLOAD FUNCTION (fixed)
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
                    <div class="progress-bar blue" style="width:0%"></div>
                </div>

                <span class="percent">0%</span>
                <span class="cancel">✖</span>
            `;

            fileListContainer.appendChild(fileRow);

            const progressBar = fileRow.querySelector(".progress-bar");
            const percent = fileRow.querySelector(".percent");
            const cancelBtn = fileRow.querySelector(".cancel");

            //  REAL UPLOAD
            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            formData.append("title", file.name);
            formData.append("subject", "General");
            formData.append("file", file);

            xhr.open("POST", "http://localhost:5000/api/notes/upload");

            // Progress
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100);
                    progressBar.style.width = progress + "%";
                    percent.innerText = progress + "%";
                }
            };

            // Success
            xhr.onload = () => {
                if (xhr.status === 201 || xhr.status === 200) {
                    percent.innerText = "Uploaded ✅";
                } else {
                    percent.innerText = "Failed ❌";
                }
            };

            // Error
            xhr.onerror = () => {
                percent.innerText = "Error ❌";
            };

            // Cancel upload
            cancelBtn.addEventListener("click", () => {
                xhr.abort();
                fileRow.remove();
            });

            xhr.send(formData);
        }
    }

});