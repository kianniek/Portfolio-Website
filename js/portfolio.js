document.addEventListener("DOMContentLoaded", async () =>
{
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const targetProjectId = urlParams.get('id');
    const shouldOpenModal = urlParams.get('openContext') === 'true';

    // Modal opzetten in de DOM
    const modal = document.createElement('div');
    modal.className = 'project-modal hidden';
    document.body.appendChild(modal);

    const closeModal = () =>
    {
        window.history.replaceState({}, document.title, window.location.pathname);
        document.body.style.overflow = 'auto';
        modal.classList.add('hidden');
    };

    const formatList = (val) => (Array.isArray(val) ? val.join(', ') : val);

    const openModal = (project) =>
    {
        const detailFields = [
            { label: 'Timeline', value: project.timeline },
            { label: 'Engine', value: project.engine },
            { label: 'Languages', value: formatList(project.language) },
            { label: 'Programs', value: formatList(project.programs) },
            { label: 'Team Size', value: project.team_size },
            { label: 'Role', value: formatList(project.role) },
            { label: 'Credits', value: formatList(project.credits) },
            { label: 'Disclaimers', value: project.disclaimers }
        ];

        let detailsHtml = detailFields
            .filter(field => field.value)
            .map(field => `<p><strong>${field.label}:</strong> ${field.value}</p>`)
            .join('');

        if (project.link) {
            detailsHtml += `<p><strong>Project Link:</strong> <a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a></p>`;
        }

        if (project.sources && project.sources.length > 0) {
            const sourceList = Array.isArray(project.sources) ? project.sources : [project.sources];
            const sourceLinks = sourceList.map((src, idx) =>
            {
                let domain = `Source ${idx + 1}`;
                try {
                    domain = new URL(src).hostname.replace(/^www\./, '');
                } catch {
                    // Fallback naar standaard label bij ongeldige URL
                }
                return `<a href="${src}" target="_blank" rel="noopener noreferrer">${domain}</a>`;
            }).join(' | ');

            detailsHtml += `<p><strong>Sources:</strong> ${sourceLinks}</p>`;
        }

        if (project.github) {
            detailsHtml += `<p><strong>GitHub Link:</strong> <a href="${project.github}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>`;
        }

        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal" aria-label="Sluit modal">&times;</button>
                <div class="project-details">
                    <h2>${project.title}</h2>
                    <p>${project.description || ''}</p>
                    ${detailsHtml}
                </div>
            </div>
        `;

        document.body.style.overflow = 'hidden';
        modal.classList.remove('hidden');

        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) =>
        {
            if (e.target === modal) closeModal();
        });

        window.history.replaceState(
            {},
            document.title,
            `${window.location.pathname}?id=${encodeURIComponent(project.ID)}&openContext=true`
        );
    };

    try {
        const response = await fetch('data/portfolio.json');
        if (!response.ok) throw new Error(`HTTP-fout: ${response.status}`);

        const data = await response.json();
        // Alleen projecten tonen waarvan 'hidden' niet waar (true) is
        const projects = (data.projects || []).filter(p => !p.hidden);

        // Kaarten renderen
        projects.toReversed().forEach(project =>
        {
            const card = document.createElement('div');
            card.className = 'portfolio-card';
            card.id = project.ID;
            card.style.background = project.color || 'transparent';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="portfolio-title">${project.title}</div>
            `;
            card.addEventListener('click', () => openModal(project));
            portfolioGrid.appendChild(card);
        });

        // Automatisch navigeren naar specifiek project via querystring
        if (targetProjectId) {
            const project = projects.find(p => p.ID === targetProjectId);
            const projectElement = document.getElementById(targetProjectId);

            if (project && projectElement) {
                projectElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                projectElement.classList.add('pulse-effect');
                setTimeout(() => projectElement.classList.remove('pulse-effect'), 5000);

                if (shouldOpenModal) {
                    openModal(project);
                }
            }
        }
    } catch (error) {
        console.error('Fout bij het laden van portfolio-data:', error);
    }
});