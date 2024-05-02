document.addEventListener('DOMContentLoaded', function () { // Fetch the testimonials from a JSON file
	console.log("test");
  fetch('testimonials.json')
    .then(response => response.json())
    .then(data => {
      // Select the testimonial wrapper
      const wrapper = document.querySelector('.testimonial-wrapper');

      // Loop through each testimonial and add it to the page
      data.forEach(testimonial => {
        // Create the testimonial card div
        const card = document.createElement('div');
        card.className = 'card-testimonial';

        // Create the inner wrapper
        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'item_wrapper-card';

        // Add logo
        const logoWrapper = document.createElement('div');
        logoWrapper.className = 'logo-item_wrapper';
        const logoImage = document.createElement('img');
        logoImage.src = testimonial.logoImg;
        logoImage.className = 'image-logo';
        logoWrapper.appendChild(logoImage);

        // Add name and country
        const nameWrapper = document.createElement('div');
        nameWrapper.className = 'name_wrapper';
        const nameP = document.createElement('p');
        nameP.className = 'name-name_wrapper';
        nameP.textContent = testimonial.name;
        const countryP = document.createElement('p');
        countryP.className = 'country-name_wrapper';
        countryP.textContent = testimonial.country;
        nameWrapper.appendChild(nameP);
        nameWrapper.appendChild(countryP);

        // Combine logo and name into the item wrapper
        itemWrapper.appendChild(logoWrapper);
        itemWrapper.appendChild(nameWrapper);

        // Create and add the testimonial text
        const textP = document.createElement('p');
        textP.className = 'text-card';
        textP.textContent = testimonial.testimonial;

        // Create and add the source and date
        const sourceDateP = document.createElement('p');
        sourceDateP.className = 'source_date-text';
        sourceDateP.textContent = `${testimonial.source} ${testimonial.date}`;

        // Combine all parts into the card
        card.appendChild(itemWrapper);
        card.appendChild(textP);
        card.appendChild(sourceDateP);

        // Append the card to the testimonial wrapper
        wrapper.appendChild(card);
      });
    })
    .catch(error => console.error('Error loading the testimonials:', error));
});
