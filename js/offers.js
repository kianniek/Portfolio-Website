document.addEventListener('DOMContentLoaded', function() {
    fetch('data/offers.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.items');
            data.forEach(item => {
                container.appendChild(createItem(item.subtitle, item.paragraph));
            });
		// Check if the number of items is even
            if (data.length % 2 === 0) {
                container.appendChild(createEmptyItem());
            }
        })
        .catch(error => console.error('Error loading the JSON data: ', error));
});

function createItem(subtitle, paragraph) {
    const wrapper = document.createElement('div');
    wrapper.className = 'item-wrapper';

    const offerGraphicWrapper = document.createElement('div');
    offerGraphicWrapper.className = 'offer-graphic-wrapper';

    const offerGraphicStar = document.createElement('div');
    offerGraphicStar.className = 'offer-graphic-star';
    offerGraphicStar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 0C16.2412 8.73471 23.2653 15.7588 32 16C23.2653 16.2412 16.2412 23.2653 16 32C15.7588 23.2653 8.73471 16.2412 0 16C8.73471 15.7588 15.7588 8.73471 16 0Z" fill="#171717"/>
        </svg>`;

    const offerGraphicLine = document.createElement('div');
    offerGraphicLine.className = 'offer-graphic-line';

    offerGraphicWrapper.appendChild(offerGraphicStar);
    offerGraphicWrapper.appendChild(offerGraphicLine);

    const textItemWrapper = document.createElement('div');
    textItemWrapper.className = 'text-item-wrapper';

    const subtitleElem = document.createElement('p');
    subtitleElem.className = 'subtitle-text-item-wrapper';
    subtitleElem.textContent = subtitle;

    const paragraphElem = document.createElement('p');
    paragraphElem.className = 'paragraph-text-item-wrapper';
    paragraphElem.textContent = paragraph;

    textItemWrapper.appendChild(subtitleElem);
    textItemWrapper.appendChild(paragraphElem);

    wrapper.appendChild(offerGraphicWrapper);
    wrapper.appendChild(textItemWrapper);

    return wrapper;
}
function createEmptyItem() {
    const emptyWrapper = document.createElement('div');
    emptyWrapper.className = 'item-wrapper';
    // Optionally, you can add some content or a placeholder inside this empty wrapper
    // For now, it's just empty
    return emptyWrapper;
}
