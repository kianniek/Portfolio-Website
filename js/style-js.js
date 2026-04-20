document.addEventListener("DOMContentLoaded", function ()
{
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // --- Configuration & State ---
  let isHovering = false;
  let speed = 0;
  const maxSpeed = 10;
  const lerpAmount = 0.08;
  // Minimum gap between logos as a multiple of the logo width (1 = one logo width)
  const minGapFactor = 1;

  let images = Array.from(carousel.querySelectorAll('img'));
  if (images.length === 0) return;
  const originalCount = images.length;

  // Ensure container is a positioned element for absolute children
  const carouselStyle = getComputedStyle(carousel);
  if (carouselStyle.position === 'static') carousel.style.position = 'relative';

  let imagePositions = [];
  let spacing = 0;

  // Wait until all images are loaded so sizes are accurate
  function waitForImagesLoaded(imgs)
  {
    return Promise.all(imgs.map(img => new Promise(resolve =>
    {
      if (img.complete && img.naturalWidth !== 0) return resolve();
      img.addEventListener('load', resolve);
      img.addEventListener('error', resolve);
    })));
  }

  function initializePositions()
  {
    // Remove previously cloned images (from earlier initializations)
    const previousClones = carousel.querySelectorAll('img[data-clone="true"]');
    previousClones.forEach(n => n.remove());

    // Refresh images list (only originals remain)
    images = Array.from(carousel.querySelectorAll('img'));

    imagePositions = [];
    // Use even spacing: screen (carousel) width divided by original count
    const carouselWidth = carousel.getBoundingClientRect().width;
    spacing = Math.floor(carouselWidth / Math.max(originalCount, 1));

    // Position originals evenly using calculated spacing
    images.forEach((img, i) =>
    {
      img.style.position = 'absolute';
      img.style.top = '50%';
      img.style.willChange = 'transform';

      const pos = i * spacing;
      imagePositions[i] = pos;
      img.style.transform = `translateX(${pos}px) translateY(-50%)`;
    });

    // Ensure carousel has enough height to show images vertically centered
    const maxHeight = Math.max(...images.map(img => img.offsetHeight));
    carousel.style.height = `${maxHeight}px`;

    // Duplicate images using same spacing until covering twice the carousel width
    const originals = images.slice(0, originalCount);
    let cumulative = originals.length * spacing;
    let idx = 0;
    while (cumulative < carouselWidth * 2) {
      const srcImg = originals[idx % originals.length];
      const clone = srcImg.cloneNode(true);
      clone.setAttribute('data-clone', 'true');
      carousel.appendChild(clone);

      clone.style.position = 'absolute';
      clone.style.top = '50%';
      clone.style.willChange = 'transform';

      imagePositions.push(cumulative);
      clone.style.transform = `translateX(${cumulative}px) translateY(-50%)`;
      images.push(clone);

      cumulative += spacing;
      idx++;
      if (idx > originals.length * 20) break; // safety
    }
  }

  // --- Event Listeners ---
  carousel.addEventListener('mouseenter', () => isHovering = true);
  carousel.addEventListener('mouseleave', () => isHovering = false);

  window.addEventListener('resize', () =>
  {
    // Reinitialize sizes/positions on resize
    initializePositions();
  });

  // Smoothly transitions speed and updates image positions
  function animate()
  {
    const targetSpeed = isHovering ? 0 : maxSpeed;
    speed = lerp(speed, targetSpeed, lerpAmount);

    images.forEach((img, index) =>
    {
      imagePositions[index] -= speed;
      img.style.transform = `translateX(${imagePositions[index]}px) translateY(-50%)`;

      const rect = img.getBoundingClientRect();
      const carouselRect = carousel.getBoundingClientRect();
      if (rect.right < carouselRect.left - 1) {
        wrapImage(index);
      }
    });

    requestAnimationFrame(animate);
  }

  function wrapImage(currentIndex)
  {
    const wrappedImg = images[currentIndex];
    const maxPos = Math.max(...imagePositions);
    // Place wrapped image one spacing ahead to keep consistent gaps
    imagePositions[currentIndex] = maxPos + spacing;
    wrappedImg.style.transform = `translateX(${imagePositions[currentIndex]}px) translateY(-50%)`;
  }

  function lerp(start, end, amt)
  {
    return (1 - amt) * start + amt * end;
  }

  // Initialize after images load, then start animation
  waitForImagesLoaded(images).then(() =>
  {
    initializePositions();
    requestAnimationFrame(animate);
  });
});