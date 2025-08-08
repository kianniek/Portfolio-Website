var useImages = true;

document.addEventListener('DOMContentLoaded', function () {
  // Select the services wrapper
  const wrapper = document.querySelector('.services-wrapper');

  // Fetch the services from a JSON file
  fetch('data/services.json')
    .then(response => response.json())
    .then(data => {

      // Loop through each service and add it to the page
      data.forEach((service, index, array) => {
        // Create the service card div
        const card = document.createElement('div');
        card.className = index % 2 === 0 ? 'services-card flex-row' : 'services-card flex-row-reverse';

        // Conditionally create and add the big service image
        if (useImages) {
          const bigImageOParent = document.createElement('div');
          const bigImage = document.createElement('img');
          const bigText = document.createElement('p');
          bigImage.className = 'service-image-big';
          bigText.className = 'service-bigImage-text';
          bigImage.src = service.bigImage;
          bigText.textContent = service.bigImageText;
          card.appendChild(bigImageOParent);
          bigImageOParent.appendChild(bigImage);
          bigImageOParent.appendChild(bigText);
        }

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

        // Conditionally create and add the small service image
        if (useImages) {
          const smallImageOParent = document.createElement('div');
          const smallImage = document.createElement('img');
          const smallText = document.createElement('p');

          smallImage.className = 'service-image-small';
          smallText.className = 'service-bigImage-text';

          smallImage.src = service.smallImage;
          smallText.textContent = service.smallImageText;

          card.appendChild(smallImageOParent);
          smallImageOParent.appendChild(smallImage);
          smallImageOParent.appendChild(smallText);
        }

        // Append the card to the services wrapper
        wrapper.appendChild(card);

        // Add separation line after each card except the last one
        const separationLine = document.createElement('div');
        separationLine.className = 'service-separation_line';
        wrapper.appendChild(separationLine);
      });
    })
    .catch(error => console.error('Error loading the services:', error));
});

function SetImageVisibility(state){
  useImages = state;
}
