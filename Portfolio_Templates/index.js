// Fetch dynamic content from data.json and populate the pages
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const path = window.location.pathname;
        const page = path.split("/").pop();

        if (page === 'index.html' || page === '') {
            loadHomePage(data.homePage);
        } else if (page === 'portfolio.html') {
            loadPortfolioPage(data.portfolioPage);
        }
        // will probably need to add team.html in the future 
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to load content on the homepage
function loadHomePage(content) {
    const mainContent = document.getElementById('main-content');
    content.texts.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        mainContent.appendChild(p);
    });
    content.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        mainContent.appendChild(img);
    });
}

// Function to load content on the portfolio page
function loadPortfolioPage(content) {
    const portfolioContent = document.getElementById('portfolio-content');
    content.texts.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        portfolioContent.appendChild(p);
    });
    content.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        portfolioContent.appendChild(img);
    });
}

function selectTemplate(templateId) {
  // Load the selected template dynamically and display a live preview
  const previewSection = document.getElementById('live-preview');
  previewSection.innerHTML = `You have selected ${templateId}.`;
  // More logic to dynamically update the template with user data
}

document.getElementById('portfolio-form').addEventListener('submit', function (event) {
  event.preventDefault(); 
  // Logic to update portfolio with user input in real-time
});
