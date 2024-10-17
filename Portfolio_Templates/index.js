let projectCount = 0;
let selectedKey = 1; // Variable to store the selected key

// Update profile picture preview
document.getElementById("profile-pic").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector("#profile-picture-preview").src = e.target.result;
            refreshIframe();
        };
        reader.readAsDataURL(file);
    }
});

// Add a new project
function addProject() {
    projectCount += 1;
    const projectsContainer = document.getElementById("projects-container");

    const newProjectHTML = `
        <div class="col-md-4 mb-4">
            <div class="project-box p-3 bg-secondary rounded">
                <div class="mb-3">
                    <label for="project-name-${projectCount}" class="form-label">Project Name</label>
                    <input type="text" class="form-control portfolioInput project-name" id="project-name-${projectCount}" required oninput="updateProjectPreview(${projectCount})">
                </div>
                <div class="mb-3">
                    <label for="project-description-${projectCount}" class="form-label">Project Description</label>
                    <textarea class="form-control portfolioInput project-description" id="project-description-${projectCount}" rows="3" required oninput="updateProjectPreview(${projectCount})"></textarea>
                </div>
                <div class="mb-3">
                    <label for="github-link-${projectCount}" class="form-label">GitHub Link</label>
                    <input type="url" class="form-control portfolioInput github-link" id="github-link-${projectCount}" required oninput="updateProjectPreview(${projectCount})">
                </div>
                <div class="mb-3">
                    <label for="project-image-${projectCount}" class="form-label">Project Image</label>
                    <div class="project-image-preview mb-2">
                        <img id="project-image-preview-${projectCount}" src="/Portfolio_Templates/myotherimages/default-placeholder.png" alt="Project Preview" class="rounded" width="120" height="120">
                    </div>
                    <input type="file" class="form-control portfolioInput project-image" id="project-image-${projectCount}">
                </div>
            </div>
        </div>
    `;

    // Add the new project fields to the form
    projectsContainer.insertAdjacentHTML("beforeend", newProjectHTML);
}

// Add listeners to dynamically update user information preview
document.querySelectorAll(".portfolioInput").forEach((element) => {
    element.addEventListener("input", function () {
        refreshIframe();
    });
})

// Function to populate form data from sessionStorage
function populateFormData() {
    const storedData = sessionStorage.getItem("portfolioData");
    if (storedData) {
        const formData = JSON.parse(storedData);

        // Populate basic fields
        document.getElementById("profile-picture-preview").src = formData.profilePicture;
        document.getElementById("name").value = formData.name || "";
        document.getElementById("title").value = formData.title || "";
        document.getElementById("email").value = formData.email || "";
        document.getElementById("education").value = formData.education || "";
        document.getElementById("about").value = formData.about || "";
        document.getElementById("experience").value = formData.experience || "";
        document.getElementById("skills").value = formData.skills || "";

        // Populate project data
        const projectBoxes = document.querySelectorAll("#projects-container .project-box");
        if (formData.projects) {
            formData.projects.forEach((project, index) => {
                const box = projectBoxes[index];
                if (box) {
                    box.querySelector(".project-name").value = project.name || "";
                    box.querySelector(".project-description").value = project.description || "";
                    box.querySelector(".github-link").value = project.githubLink || "";
                    if (project.image) {
                        box.querySelector(".project-image-preview img").src = project.image;
                    }
                }
            });
        }
    }
}

// Function to generate the form data into a JSON object
function getFormData() {
    // Iterate over each project box and extract its data
    const projects = [];
    document.querySelectorAll("#projects-container .project-box").forEach((box, index) => {
        projects.push({
            name: box.querySelector(".project-name").value,
            description: box.querySelector(".project-description").value,
            githubLink: box.querySelector(".github-link").value,
            image: box.querySelector(".project-image-preview img").src,
        });
    });

    return {
        profilePicture: document.getElementById("profile-picture-preview").src,
        name: document.getElementById("name").value,
        title: document.getElementById("title").value,
        email: document.getElementById("email").value,
        education: document.getElementById("education").value,
        about: document.getElementById("about").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        projects: projects,
    };
}

// Event listener to choose template preview
document.querySelectorAll('.template-download-item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('dropdownMenuButton').textContent = this.textContent;
        selectedKey = this.getAttribute('data-key');
    });
});

// Function to refresh Iframe when form changes
function refreshIframe() {
    const formData = getFormData();
    const formDataJson = JSON.stringify(formData);
    sessionStorage.setItem("portfolioData", formDataJson);
    var iframe = document.getElementById('templateFrame');
    iframe.src = iframe.src; // This reloads the iframe
}
//
// // Function to handle download
// document.getElementById('downloadTemplate').addEventListener('click', async function () {
//     try {
//         // Step 1: Create a new JSZip instance
//         var zip = new JSZip();
//
//         // Step 2: Define the files to add
//         const files = [
//             "index.html",
//             "styles.css",
//             "index.js"
//         ];
//
//         // Step 3: Fetch all files concurrently using Promise.all
//         const filePromises = files.map(async (file) => {
//             const response = await fetch(`templates/template${selectedKey}/${file}`);
//             const content = await response.text();
//             zip.file(file, content);
//         });
//
//         // Wait for all files to be fetched and added to the ZIP
//         await Promise.all(filePromises);
//
//         // Step 4: Get data from localStorage and create data.json
//         var portfolioData = localStorage.getItem('portfolioData') || '{}';
//         zip.file('data.json', portfolioData);
//
//         // Step 5: Generate the ZIP file and trigger download
//         zip.generateAsync({ type: 'blob' }).then(function (blob) {
//             var link = document.createElement('a');
//             link.href = URL.createObjectURL(blob);
//             link.download = 'templates.zip';
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         });
//     } catch (error) {
//         console.error('Error fetching files:', error);
//     }
// });

// Populate Form Data when the page first loads
populateFormData();

// Initially 3 projects
addProject();
addProject();
addProject();