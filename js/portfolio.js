document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');  // Get the project ID from the URL
    const openContext = urlParams.get('openContext');  // Get the openContext parameter

    fetch('data/portfolio.json')
        .then(response => response.json())
        .then(data => {
            const portfolioGrid = document.querySelector('.portfolio-grid');
            const modal = document.createElement('div');
            modal.className = 'project-modal hidden';
            document.body.appendChild(modal);

            // Sort options
            const customOrder = ["012", "011", "010", "009", "008", "007", "006", "005", "004", "003", "002", "001"];
            const hiddenProjects = ["012", "011"];

            // Function to sort by custom array of IDs
            const sortByCustomOrder = (a, b) => {
                const indexA = customOrder.indexOf(a.ID);
                const indexB = customOrder.indexOf(b.ID);
                return indexA - indexB;
            };

            // Apply sorting: custom sorting is prioritized
            if (customOrder.length > 0) {
                data.projects.sort(sortByCustomOrder);
            }

            // Render projects
            data.projects.forEach(project => {
                if (hiddenProjects.includes(project.ID)) return;

                const card = document.createElement('div');
                card.className = 'portfolio-card';
                card.id = project.ID;  // Assign the project's ID as the card's HTML id
                card.style.background = project.color;
                card.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <div class="portfolio-title">${project.title}</div>
                `;

                card.addEventListener('click', () => {
                    openModal(project);
                });

                portfolioGrid.appendChild(card);
            });

            // If projectId is present in the URL, scroll to the project and optionally open the modal
            if (projectId) {
                const project = data.projects.find(p => p.ID === projectId);
                if (project) {
                    const projectElement = document.getElementById(projectId);

                    if (projectElement) {
                        // Scroll into view
                        projectElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                        // Add pulsing effect (optional)
                        projectElement.classList.add('pulse-effect');
                        setTimeout(() => {
                            projectElement.classList.remove('pulse-effect');
                        }, 5000);

                        // Check if openContext is 'true', then open the modal
                        if (openContext === 'true') {
                            openModal(project);
                        }
                    }
                }
            }

            function openModal(project) {
                let modalContent = `
                    <div class="modal-content">
                        <button class="close-modal">&times;</button>
                        <div class="project-details">
                            <h2>${project.title}</h2>
                            <p>${project.description}</p>
                `;

                if (project.timeline) {
                    modalContent += `<p><strong>Timeline:</strong> ${project.timeline}</p>`;
                }
                if (project.engine) {
                    modalContent += `<p><strong>Engine:</strong> ${project.engine}</p>`;
                }
                if (project.language && project.language.length > 0) {
                    modalContent += `<p><strong>Languages:</strong> ${project.language.join(', ')}</p>`;
                }
                if (project.programs && project.programs.length > 0) {
                    modalContent += `<p><strong>Programs:</strong> ${project.programs.join(', ')}</p>`;
                }
                if (project.team_size) {
                    modalContent += `<p><strong>Team Size:</strong> ${project.team_size}</p>`;
                }
                if (project.role) {
                    modalContent += `<p><strong>Role:</strong> ${project.role}</p>`;
                }
                if (project.disclaimers) {
                    modalContent += `<p><strong>Disclaimers:</strong> ${project.disclaimers}</p>`;
                }
                if (project.link) {
                    modalContent += `<p><strong>Project Link:</strong> <a href="${project.link}" target="_blank">View Project</a></p>`;
                }
                if (project.github) {
                    modalContent += `<p><strong>GitHub Link:</strong> <a href="${project.github}" target="_blank">View on GitHub</a></p>`;
                }

                modalContent += `
                        </div>
                    </div>
                `;

                modal.innerHTML = modalContent;
                document.body.style.overflow = 'hidden';
                modal.classList.remove('hidden');
                document.querySelector('.close-modal').addEventListener('click', closeModal);
                modal.addEventListener('click', function (e) {
                    if (e.target === modal) closeModal();
                });

                //add url parameter to the url
                window.history.replaceState({}, document.title, window.location.pathname + '?id=' + project.ID + '&openContext=true');
            }

            function closeModal() {
                //remove all the url parameters
                window.history.replaceState({}, document.title, window.location.pathname);
                document.body.style.overflow = 'auto';
                modal.classList.add('hidden');
            }
        })
        .catch(error => console.error('Error loading project data:', error));
});
