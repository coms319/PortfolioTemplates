let selectedTemplate = 'template1'; // Default template ID

// Update profile picture preview
document.getElementById('profile-pic').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.profile-placeholder img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submission and dynamic preview update
document.getElementById('user-info-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userData = {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        email: document.getElementById('email').value,
        education: document.getElementById('education').value,
        about: document.getElementById('about').value,
        profilePic: document.getElementById('profile-pic').files[0] ? URL.createObjectURL(document.getElementById('profile-pic').files[0]) : 'images/default-profile.png'
    };
    
    // Populate the dynamic preview section
    document.getElementById('template-preview-content').innerHTML = `
        <div class="text-center">
            <img src="${userData.profilePic}" alt="${userData.name}" class="rounded-circle" width="100">
            <h3>${userData.name}</h3>
            <p class="text-muted">${userData.title}</p>
            <p>${userData.about}</p>
            <p>${userData.education}</p>
            <p><a href="mailto:${userData.email}">${userData.email}</a></p>
        </div>
    `;
});