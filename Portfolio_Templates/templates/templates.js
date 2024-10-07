// Load the selected template dynamically into the portfolio page
function loadTemplate(templateFile, userData) {
  fetch(`templates/${templateFile}.html`)
      .then(response => response.text())
      .then(templateHtml => {
          document.getElementById('template-container').innerHTML = templateHtml;
          populateTemplateData(userData);
      })
      .catch(error => console.error('Error loading template:', error));
}

// Populate the template with user data
function populateTemplateData(userData) {
  document.querySelector('.name').textContent = userData.name;
  document.querySelector('.email').textContent = userData.email;
  document.querySelector('.experience').textContent = userData.experience;
  document.querySelector('.education').textContent = userData.education;
  document.querySelector('.skills').textContent = userData.skills;

  if (userData.profilePic) {
      document.querySelector('.profile-img').src = userData.profilePic;
  }
}
