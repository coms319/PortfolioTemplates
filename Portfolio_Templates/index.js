let projectCount = 3; // Initially 3 projects

// Update profile picture preview
document.getElementById("profile-pic").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector("#profile-picture-preview").src = e.target.result;
      document.querySelector("#preview-profile-picture").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Update project image preview
function previewProjectImage(event, projectId) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.querySelector(`#project-image-preview-${projectId}`).src =
        e.target.result;
      document.querySelector(`#preview-project-image-${projectId}`).src =
        e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Add a new project
function addProject() {
  projectCount += 1;
  const projectsContainer = document.getElementById("projects-container");

  const newProjectHTML = `
        <div class="col-md-4 mb-4">
            <div class="project-box p-3 bg-secondary rounded">
                <div class="mb-3">
                    <label for="project-name-${projectCount}" class="form-label">Project Name</label>
                    <input type="text" class="form-control" id="project-name-${projectCount}" required oninput="updateProjectPreview(${projectCount})">
                </div>
                <div class="mb-3">
                    <label for="project-description-${projectCount}" class="form-label">Project Description</label>
                    <textarea class="form-control" id="project-description-${projectCount}" rows="3" required oninput="updateProjectPreview(${projectCount})"></textarea>
                </div>
                <div class="mb-3">
                    <label for="github-link-${projectCount}" class="form-label">GitHub Link</label>
                    <input type="url" class="form-control" id="github-link-${projectCount}" required oninput="updateProjectPreview(${projectCount})">
                </div>
                <div class="mb-3">
                    <label for="project-image-${projectCount}" class="form-label">Project Image</label>
                    <div class="project-image-preview mb-2">
                        <img id="project-image-preview-${projectCount}" src="/Portfolio_Templates/uploads/default-placeholder.png" alt="Project Preview" class="rounded" width="120" height="120">
                    </div>
                    <input type="file" class="form-control" id="project-image-${projectCount}" onchange="previewProjectImage(event, ${projectCount})">
                </div>
            </div>
        </div>
    `;

  // Add the new project fields to the form
  projectsContainer.insertAdjacentHTML("beforeend", newProjectHTML);

  // Also add the corresponding dynamic preview for the new project
  const projectPreviewContainer = document.getElementById(
    "project-preview-container"
  );
  const newProjectPreviewHTML = `
        <div class="col-md-4" id="project-preview-${projectCount}">
            <h6 id="preview-project-name-${projectCount}">Project Name</h6>
            <p id="preview-project-description-${projectCount}">Project Description</p>
            <a id="preview-github-link-${projectCount}" href="#" target="_blank">GitHub Link</a>
            <img id="preview-project-image-${projectCount}" src="/Portfolio_Templates/uploads/default-placeholder.png" alt="Project Image" class="rounded" width="100" height="100">
        </div>
    `;
  projectPreviewContainer.insertAdjacentHTML(
    "beforeend",
    newProjectPreviewHTML
  );
}

// Update project preview dynamically as the user enters data
function updateProjectPreview(projectId) {
  document.getElementById(`preview-project-name-${projectId}`).innerText =
    document.getElementById(`project-name-${projectId}`).value;
  document.getElementById(
    `preview-project-description-${projectId}`
  ).innerText = document.getElementById(
    `project-description-${projectId}`
  ).value;
  document.getElementById(`preview-github-link-${projectId}`).href =
    document.getElementById(`github-link-${projectId}`).value;
}

// Add listeners to dynamically update user information preview
document.getElementById("name").addEventListener("input", function () {
  document.getElementById("preview-name").innerText = this.value;
});
document.getElementById("title").addEventListener("input", function () {
  document.getElementById(
    "preview-title"
  ).innerHTML = `<span style="color: #76c7c0;">${this.value}</span>`;
});
document.getElementById("email").addEventListener("input", function () {
  document.getElementById("preview-email").innerText = this.value;
  document.getElementById("preview-email").href = `mailto:${this.value}`;
});
document.getElementById("education").addEventListener("input", function () {
  document.getElementById("preview-education").innerText = this.value;
});
document.getElementById("about").addEventListener("input", function () {
  document.getElementById("preview-about").innerText = this.value;
});

// Add listeners for Professional Experience and Skills fields
document.getElementById("experience").addEventListener("input", function () {
  document.getElementById("preview-experience").innerText = this.value;
});
document.getElementById("skills").addEventListener("input", function () {
  document.getElementById("preview-skills").innerText = this.value;
});

// Handle form submission and dynamic preview update
document
  .getElementById("user-info-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Just to simulate submission for now
    console.log("Form submitted successfully.");
  });