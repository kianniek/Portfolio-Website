document.addEventListener("DOMContentLoaded", function () {
    fetch('data/portfolio.json')
        .then(response => response.json())
        .then(data => {
            // Populate About section
            document.getElementById("about-text").innerText = data.about.text;

            // Populate Portfolio section
            const portfolioContainer = document.getElementById("portfolio-projects");
            data.projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('portfolio__box');

                projectElement.innerHTML = `
                    <div class="portfolio__img">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="portfolio__info">
                        <h3 class="portfolio__title">${project.title}</h3>
                        <p class="portfolio__content">${project.description}</p>
                    </div>
                `;
                portfolioContainer.appendChild(projectElement);
            });

            // Populate Contact section
            document.getElementById("contact-text").innerText = data.contact.text;
        })
        .catch(error => console.error('Error fetching data:', error));
});
