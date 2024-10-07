// Fetch dynamic content from data.json and populate the pages
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (page === "index.html" || page === "") {
      loadHomePage(data.homePage);
    } else if (page === "portfolio.html") {
      loadPortfolioPage(data.portfolioPage);
    }
    // You can also add team.html in the future
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to load content on the homepage
function loadHomePage(content) {
  const mainContent = document.getElementById("main-content");
  content.texts.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    mainContent.appendChild(p);
  });
  content.images.forEach((imgSrc) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    mainContent.appendChild(img);
  });
}

// Function to load content on the portfolio page
function loadPortfolioPage(content) {
  const portfolioContent = document.getElementById("portfolio-content");
  content.texts.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    portfolioContent.appendChild(p);
  });
  content.images.forEach((imgSrc) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    portfolioContent.appendChild(img);
  });
}

// Global variables to store user data and selected template
let userData = {};
let selectedTemplate = "";

// Function to handle template selection
function selectTemplate(templateId) {
  selectedTemplate = templateId;
  const previewSection = document.getElementById("live-preview");
  previewSection.innerHTML = `You have selected ${templateId}.`;
}

// Handle form submission and display template with user data
document.getElementById("user-info-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect user data from the form
  userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    experience: document.getElementById("experience").value,
    education: document.getElementById("education").value,
    skills: document.getElementById("skills").value,
    profilePic: document.getElementById("profile-pic").files[0] ? URL.createObjectURL(document.getElementById("profile-pic").files[0]) : null
  };

  // Check if a template has been selected
  if (!selectedTemplate) {
    alert("Please select a template.");
    return;
  }

  // Load and populate the template with user data
  loadTemplate(selectedTemplate, userData);
});

// Load the selected template and populate it with user data
function loadTemplate(templateId, userData) {
  fetch(`templates/${templateId}.html`)
    .then((response) => response.text())
    .then((templateHtml) => {
      document.getElementById("template-container").innerHTML = templateHtml;
      populateTemplateData(userData);
    })
    .catch((error) => console.error("Error loading template:", error));
}

// Populate the template with user data
function populateTemplateData(userData) {
  if (userData.name) document.querySelector(".name").textContent = userData.name;
  if (userData.email) document.querySelector(".email").textContent = userData.email;
  if (userData.experience) document.querySelector(".experience").textContent = userData.experience;
  if (userData.education) document.querySelector(".education").textContent = userData.education;
  if (userData.skills) document.querySelector(".skills").textContent = userData.skills;

  if (userData.profilePic) {
    document.querySelector(".profile-img").src = userData.profilePic;
  }
}

// JavaScript to dynamically add 'active' class to the current nav link
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

document.getElementById('download-btn').addEventListener('click', function () {
  const zip = new JSZip();
  const selectedTemplateId = document.querySelector('input[name="template"]:checked').value;

  // Fetch the populated HTML content
  const htmlContent = document.getElementById('live-preview').innerHTML;

  // Add HTML content to the zip file
  zip.file('index.html', htmlContent);

  // Fetch and add the corresponding CSS file to the zip
  fetch(`styles/${selectedTemplateId}.css`)
      .then(response => response.text())
      .then(cssContent => {
          zip.file(`styles/${selectedTemplateId}.css`, cssContent);

          // Generate the zip file and trigger download
          zip.generateAsync({ type: 'blob' }).then(function (content) {
              saveAs(content, 'personal-website.zip');
          });
      });
});