// Function to populate form data from localStorage
function populateData(data) {

    if (data === null || data === undefined || JSON.stringify(data) === '{}') {
        let storedData = localStorage.getItem("portfolioData");
        data = JSON.parse(storedData);
    }

    // Populate basic fields
    document.getElementById("profile-pic").src = data.profilePicture;
    document.getElementById("page-title").innerHTML = data.title + " - " + data.name;
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("title").innerHTML = data.title;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("education").innerHTML = data.education;
    document.getElementById("about").innerHTML = data.about;
    document.getElementById("experience").innerHTML = data.experience;
    document.getElementById("skills").innerHTML = data.skills;

    // Populate project data
    let projectsContainer = document.getElementById("projects");
    if (data.projects && data.projects.length > 0) {
        projectsContainer.innerHTML = '';
        data.projects.forEach((project, index) => {
            projectsContainer.innerHTML += `
            <div class="project-box">
               <p class="project-name">Name: ${project.name}</p>
               <p class="project-description">Description: ${project.description}</p>
               <p class="github-link">Github link: <a href="${project.githubLink}">${project.githubLink}</a></p>
               <img src="${project.image}" alt="Project image">
            </div>
        `;
        });
    }
}

// Get data from data.json (after download) or localStorage (preview)
function fetchDataOrUseSession() {
    // Step 1: Attempt to fetch data from data.json
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('data.json not found');
            }
            return response.json();
        })
        .then(jsonData => {
            // Step 2: Populate with fetched data
            populateData(jsonData);
        })
        .catch(error => {
            console.error(error);
        });
}

// Populate data when the page first loads
fetchDataOrUseSession();