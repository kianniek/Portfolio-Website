document.addEventListener('DOMContentLoaded', async () =>
{
    const projectImage = document.getElementById('project-image');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    const headerContainer = document.querySelector('.headerText-projectCard');
    const nextBtn = document.getElementById('next-arrow');
    const prevBtn = document.getElementById('prev-arrow');

    // Afbreken indien vereiste carrouselelementen ontbreken
    if (!projectImage || !projectTitle || !projectDescription) return;

    const projectTaglines = {
        "Game Design": { text: "Game Design", color: "#FF6633" },
        "Development": { text: "Development", color: "#007bff" },
        "Research": { text: "Research", color: "#6f42c1" },
        "UI/UX Design": { text: "UI/UX Design", color: "#20c997" },
        "Project Management": { text: "Project Management", color: "#dc3545" }
    };

    const termToTaglineMap = {
        "Design": "Game Design",
        "Designer": "Game Design",
        "Lead Designer": "Game Design",
        "Developer": "Development",
        "Lead Developer": "Development",
        "Solo Developer": "Development",
        "Programming": "Development",
        "Researcher": "Research",
        "Studied": "Research",
        "Artificial Intelligence": "Research",
        "UI": "UI/UX Design",
        "UX": "UI/UX Design",
        "Interface": "UI/UX Design",
        "User Experience": "UI/UX Design",
        "Project Manager": "Project Management"
    };

    function renderTaglines(roles = [])
    {
        if (!headerContainer) return;

        // Bestaande taglines opschonen
        headerContainer.querySelectorAll('.tagline-group, .tagline-textWrapper').forEach(el => el.remove());

        const taglineGroup = document.createElement('div');
        taglineGroup.className = 'tagline-group';

        const matchedTaglines = new Set(
            roles.map(role => termToTaglineMap[role]).filter(Boolean)
        );

        matchedTaglines.forEach(taglineKey =>
        {
            const config = projectTaglines[taglineKey];
            if (!config) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'tagline-textWrapper';
            wrapper.style.background = config.color;

            const p = document.createElement('p');
            p.className = 'projectTagline-textWrapper';
            p.textContent = config.text;

            wrapper.appendChild(p);
            taglineGroup.appendChild(wrapper);
        });

        headerContainer.appendChild(taglineGroup);
    }

    try {
        const response = await fetch('data/portfolio.json');
        if (!response.ok) throw new Error(`HTTP-fout: ${response.status}`);

        const data = await response.json();
        // Filtert alle projecten die op hidden: true staan
        const projects = (data.projects || []).filter(p => !p.hidden);

        if (projects.length === 0) return;

        let currentIndex = projects.length - 1; // Start bij het laatste project

        const updateProject = (index) =>
        {
            const project = projects[index];
            const shortDescription = (project.description || '').substring(0, 150);

            projectImage.src = project.image;
            projectImage.alt = project.title || 'Project preview';
            projectImage.style.backgroundColor = project.color || 'transparent';

            projectTitle.textContent = project.title;
            projectDescription.innerHTML = `
                ${shortDescription}...
                <a href="portfolio.html?id=${encodeURIComponent(project.ID)}&openContext=true" class="read-more-btn">Read More</a>
            `;

            const roles = Array.isArray(project.role) ? project.role : [project.role].filter(Boolean);
            renderTaglines(roles);
        };

        // Event listeners voor navigatie
        nextBtn?.addEventListener('click', () =>
        {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
            updateProject(currentIndex);
        });

        prevBtn?.addEventListener('click', () =>
        {
            currentIndex = (currentIndex + 1) % projects.length;
            updateProject(currentIndex);
        });

        // Eerste project direct laden
        updateProject(currentIndex);

    } catch (error) {
        console.error('Fout bij het laden van de carrousel:', error);
    }
});