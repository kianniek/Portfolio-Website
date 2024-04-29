document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector('.carousel');
  let isHovering = false; // Boolean to track hover state
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Stop script if reduced motion is preferred
  if (prefersReducedMotion) {
    console.log("Reduced motion is enabled. Stopping the script.");
    return; // Exit the function early
  }
  // Helper functions to manipulate images
  function getAllImages() {
    return Array.from(carousel.querySelectorAll('img'));
  }

  function adjustSpacing(newSpacing) {
    spacing = newSpacing;
    carousel.querySelectorAll('img').forEach(img => {
      img.style.marginRight = `${spacing}px`;
    });
  }

  function adjustSpeed(newSpeed) {
    speed = newSpeed;
  }
	
  function lerp(start, end, amt) {
    return (1-amt)*start+amt*end
  }

  // Initialization of variables
  let speed = 0; // Speed of the animation (pixels per millisecond)
  let maxSpeed = 0.9;
  let spacing = 20; // Example initial spacing
  let images = getAllImages();
  let imagePositions = new Array(images.length).fill(0);

  // Set initial image margins
  carousel.querySelectorAll('img').forEach(img => {
    img.style.marginRight = `${spacing}vw`;
  });
carousel.addEventListener('mouseover', () => {
      isHovering = true;
		console.log(isHovering);
    });
    carousel.addEventListener('mouseout', () => {
      isHovering = false;
    });
  // Add hover event listeners to images

  // Animation function
  function animate() {
	  if(isHovering){
		  speed = lerp(speed, 0, 0.01);
	  }else{
		  speed = lerp(speed, maxSpeed, 0.01);
	  }
    
    let widthTotal = 0; // Total width of all images to calculate wrapping
    images.forEach((img, index) => {
      widthTotal += img.offsetWidth + parseInt(getComputedStyle(img).marginRight);
    });

    images.forEach((img, index) => {
      imagePositions[index] -= speed;
      img.style.transform = `translateX(${imagePositions[index]}px)`;

      let position = img.getBoundingClientRect();
      if (position.right < 0) {
        // Wrap images when exiting screen
        wrapImage(index, widthTotal);
      }
    });

    requestAnimationFrame(animate);
  }

  function wrapImage(currentIndex, totalWidth) {
    const firstPos = imagePositions[0]; // First position in the array
    // Shift every element to the left
    imagePositions.forEach((_, idx) => {
      if (idx < images.length - 1) {
        imagePositions[idx] = imagePositions[idx + 1];
      }
    });
    // Set the last position to the right of the last image
    imagePositions[images.length - 1] = firstPos + totalWidth;
    // Rearrange the images array for consistent handling
    const firstImage = images.shift();
    images.push(firstImage);
    //console.log(`Image wrapped: ${firstImage.src}`);
  }

  animate(); // Start the animation
});
