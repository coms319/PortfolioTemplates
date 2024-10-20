# Portfolio Generator

## Project Overview
The **Portfolio Generator** is a web application that allows users to create personalized portfolio websites. By entering personal information such as name, title, education, and experience, users can choose from available templates, preview the portfolio, and download the final product as a ready-to-use HTML site.

## Features
- **User Information Input**: Users can fill out forms to input personal information like their name, education, professional experience, and skills.
- **Template Selection**: Users can choose from multiple pre-designed templates for their portfolio.
- **Project Showcase**: Users can add project details, including names, descriptions, GitHub links, and images.
- **Profile Picture Upload**: Users can upload a profile picture that will be dynamically inserted into the portfolio.
- **Live Preview**: A live preview of the portfolio is generated as users input their information, allowing real-time feedback.
- **Download**: Once satisfied, users can download their portfolio as an HTML file.

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Libraries**: Bootstrap 5 for responsive UI, jQuery for DOM manipulation, jsZip for zip file downloads
- **JSON**: Used for storing and loading user data dynamically

## Files
### 1. `index.html`
This is the main page where users can input their personal details and choose a template for their portfolio. It uses Bootstrap for styling and includes a form for personal information and project details.

### 2. `index.js`
Handles the dynamic aspects of the website, such as updating the live preview, managing the uploaded profile pictures, and fetching the user data. It also interacts with `localStorage` to save and populate form data.

### 3. `data.json`
This file stores static data used for loading team members' information, navbar images, and default values for the homepage and templates.

### 4. `team.html`
Displays information about the developers involved in the project. It dynamically loads team data from `data.json` using JavaScript.

### 5. `team.js`
This script fetches the team member data from `data.json` and populates the team section of the `team.html` page.

## How to Use
1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/portfolio-generator.git
    ```

2. **Open `index.html`** in your preferred browser.

3. **Input your details**:
    - Fill out the form with your personal information (name, title, education, etc.).
    - Add details of your projects including the project name, description, and GitHub link.

4. **Choose a Template**:
    - Select a template from the dropdown menu.

5. **Preview**:
    - As you input data, the live preview on the right side of the screen will update.

6. **Download**:
    - Once you're satisfied with your portfolio, click the download button to get an HTML file of your portfolio.

## Team
- **Lucas Martins Sorge**: Full-stack Developer
- **Lucas Nerone Rillo**: Full-stack Developer

For more information on the team, visit the [team page](./team.html).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
