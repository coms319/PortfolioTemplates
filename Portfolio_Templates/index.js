// Global variables to store user data and selected template
let userData = {};
let selectedTemplate = "";

// Function to handle template selection
function selectTemplate(templateId) {
    selectedTemplate = templateId;
    const previewSection = document.getElementById("live-preview");
    previewSection.innerHTML = `<p>You have selected <strong>${templateId}</strong>.</p>`;
}

// Function to populate the template
function populateTemplate(templateId, userData) {
    fetch(`templates/${templateId}.html`)
        .then(response => response.text())
        .then(template => {
            let populatedTemplate = template.replace(/{{name}}/g, userData.name)
                .replace(/{{title}}/g, userData.title)
                .replace(/{{about}}/g, userData.about)
                .replace(/{{experience}}/g, userData.experience)
                .replace(/{{education}}/g, userData.education)
                .replace(/{{email}}/g, userData.email)
                .replace(/{{profilePic}}/g, userData.profilePic);

            // Handle skills list
            populatedTemplate = populatedTemplate.replace(/{{#each skills}}([\s\S]*?){{\/each}}/, function (match, p1) {
                return userData.skills.map(skill => p1.replace(/{{this}}/g, skill)).join('');
            });

            // Insert the populated template into the page
            document.getElementById('live-preview').innerHTML = populatedTemplate;
        })
        .catch(error => console.error('Error loading template:', error));
}

// Handle form submission and display template with user data
document.getElementById("user-info-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect user data from the form
    userData = {
        name: document.getElementById("name").value,
        title: document.getElementById("title").value || 'Professional Title',
        about: document.getElementById("about").value,
        experience: document.getElementById("experience").value,
        education: document.getElementById("education").value,
        skills: document.getElementById("skills").value.split(',').map(skill => skill.trim()),
        email: document.getElementById("email").value,
        profilePic: document.getElementById("profile-pic").files[0] ? URL.createObjectURL(document.getElementById("profile-pic").files[0]) : 'images/default-profile.png'
    };

    // Check if a template has been selected
    if (!selectedTemplate) {
        alert("Please select a template.");
        return;
    }

    // Populate and display the template
    populateTemplate(selectedTemplate, userData);
});

// Download the personalized website as a zip file
document.getElementById('download-btn').addEventListener('click', function () {
    if (!selectedTemplate || Object.keys(userData).length === 0) {
        alert("Please fill out the form and generate your portfolio before downloading.");
        return;
    }

    const zip = new JSZip();

    // Fetch the populated HTML content
    fetch(`templates/${selectedTemplate}.html`)
        .then(response => response.text())
        .then(template => {
            // Replace placeholders with user data
            let populatedTemplate = template.replace(/{{name}}/g, userData.name)
                .replace(/{{title}}/g, userData.title)
                .replace(/{{about}}/g, userData.about)
                .replace(/{{experience}}/g, userData.experience)
                .replace(/{{education}}/g, userData.education)
                .replace(/{{email}}/g, userData.email)
                .replace(/{{profilePic}}/g, 'images/profile-pic.jpg');

            // Handle skills list
            populatedTemplate = populatedTemplate.replace(/{{#each skills}}([\s\S]*?){{\/each}}/, function (match, p1) {
                return userData.skills.map(skill => p1.replace(/{{this}}/g, skill)).join('');
            });

            // Add HTML content to the zip file
            zip.file('index.html', populatedTemplate);

            // Fetch and add the corresponding CSS file to the zip
            fetch(`styles/${selectedTemplate}.css`)
                .then(response => response.text())
                .then(cssContent => {
                    zip.file(`styles/${selectedTemplate}.css`, cssContent);

                    // Prepare to add the profile picture to the zip
                    const profilePicFile = document.getElementById("profile-pic").files[0];

                    if (profilePicFile) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const imgData = e.target.result.split(',')[1];
                            zip.file('images/profile-pic.jpg', imgData, { base64: true });

                            // Generate the zip file and trigger download
                            zip.generateAsync({ type: 'blob' }).then(function (content) {
                                saveAs(content, 'personal-website.zip');
                            });
                        };
                        reader.readAsDataURL(profilePicFile);
                    } else {
                        // Use default profile picture
                        fetch('images/default-profile.png')
                            .then(response => response.blob())
                            .then(blob => {
                                zip.file('images/profile-pic.jpg', blob);

                                // Generate the zip file and trigger download
                                zip.generateAsync({ type: 'blob' }).then(function (content) {
                                    saveAs(content, 'personal-website.zip');
                                });
                            });
                    }
                })
                .catch(error => console.error('Error fetching CSS file:', error));
        })
        .catch(error => console.error('Error generating download:', error));
});

// JavaScript to dynamically add 'active' class to the current nav link
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});