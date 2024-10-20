fetch('./data.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        populatePage(data);
    })
    .catch(error => {
        console.log(error);
    });

function populatePage(data) {
    const navbarImage = document.getElementById('navbarImage');
    navbarImage.src = data.navbar.image;
    navbarImage.alt = data.navbar.altText;

    // Populate the team section
    document.getElementById('team').innerHTML = '';
    data.teamPage.teamMembers.forEach(member => {
        document.getElementById('team').innerHTML += `
      <div class="col">
        <div class="card h-100">
          <img src="${member.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h2 class="h3 mb-0">${member.name}</h2>
            <p class="card-text mb-0" style="font-size: larger;">${member.role}</p>
            <p class="text-muted">${member.bio}</p>
          </div>
        </div>
      </div>
    `;
    });
}