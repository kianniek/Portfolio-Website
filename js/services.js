document.addEventListener('DOMContentLoaded', function () {
  // Fetch the services from a JSON file
  fetch('services.json')
    .then(response => response.json())
    .then(data => {
      // Select the services wrapper
      const wrapper = document.querySelector('.services-wrapper');

      // Loop through each service and add it to the page
      data.forEach((service, index, array) => {
        // Create the service card div
        const card = document.createElement('div');
        card.className = index % 2 === 0 ? 'services-card flex-row' : 'services-card flex-row-reverse';

        // Create and add the big service image
        const bigImage = document.createElement('img');
        bigImage.className = 'service-image-big';
        bigImage.src = service.bigImage;
        card.appendChild(bigImage);

        // Create the services text wrapper
        const textWrapper = document.createElement('div');
        textWrapper.className = 'services-text-wrapper';

        // Create and add the service description
        const description = document.createElement('div');
        description.className = 'service-description';
        const subtitle = document.createElement('p');
        subtitle.className = 'service-subtitle';
        subtitle.textContent = service.title;
        const paragraph = document.createElement('p');
        paragraph.className = 'service-paragraph';
        paragraph.textContent = service.description;
        description.appendChild(subtitle);
        description.appendChild(paragraph);
        textWrapper.appendChild(description);

        // Create and add the included description
        const includeDescription = document.createElement('div');
        includeDescription.className = 'service-include_description';
        const includeSubtitle = document.createElement('p');
        includeSubtitle.className = 'service-include_description-subtitle';
        includeSubtitle.textContent = "What's Included?";
        const includeList = document.createElement('ul');
        includeList.className = 'service-include_description-paragraph';
        service.includes.forEach(item => {
          const includeItem = document.createElement('li');
          includeItem.innerHTML = `<b>${item.split(':')[0]}:</b> ${item.split(':')[1]}`;
          includeList.appendChild(includeItem);
        });
        includeDescription.appendChild(includeSubtitle);
        includeDescription.appendChild(includeList);
        textWrapper.appendChild(includeDescription);

        // Append text wrapper to card
        card.appendChild(textWrapper);

        // Create and add the small service image
        const smallImage = document.createElement('img');
        smallImage.className = 'service-image-small';
        smallImage.src = service.smallImage;
        card.appendChild(smallImage);

        // Append the card to the services wrapper
        wrapper.appendChild(card);

        // Add separation line after each card except the last one
        if (index !== array.length - 1) {
          const separationLine = document.createElement('div');
          separationLine.className = 'service-separation_line';
          wrapper.appendChild(separationLine);
        }
      });
    })
    .catch(error => console.error('Error loading the services:', error));
});
