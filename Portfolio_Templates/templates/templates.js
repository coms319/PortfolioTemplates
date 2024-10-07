// Function to populate the template
function populateTemplate(templateId, userData) {
  fetch(`templates/${templateId}.html`)
      .then(response => response.text())
      .then(template => {
          // Replace placeholders with user data
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

// Example usage with form submission
document.getElementById('user-info-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Collect user data from the form
  const userData = {
      name: document.getElementById('name').value,
      title: document.getElementById('title').value || 'Professional Title',
      about: document.getElementById('about').value,
      experience: document.getElementById('experience').value,
      education: document.getElementById('education').value,
      skills: document.getElementById('skills').value.split(',').map(skill => skill.trim()),
      email: document.getElementById('email').value,
      profilePic: document.getElementById('profile-pic').files[0] ? URL.createObjectURL(document.getElementById('profile-pic').files[0]) : 'images/default-profile.png'
  };

  // Get the selected template ID
  const selectedTemplateId = 'modern-template'; // Replace with actual selected template ID

  // Populate and display the template
  populateTemplate(selectedTemplateId, userData);
});