document.addEventListener('DOMContentLoaded', () =>
{
  // 1. Mask URL zodat het "Gefelicteerd-met-je-verjaardag" toont in the browser. 
  // Hier passen we enkel het einde wat aan visueel, mits ondersteund door de history API van de browser.
  window.history.replaceState(null, '', '/Gefelicteerd-met-je-verjaardag');

  // 2. Elementen pakken
  const confettiKnop = document.getElementById('confetti-knop');
  // Kan je hieronder de tekst wijzigen voor de jarige 
  const naamLeeftijdEl = document.getElementById('naam-leeftijd');

  // Voeg hier naam en leeftijd toe:
  const naam = "Samuël";
  const leeftijd = 17; // Vervang door zijn echte leeftijd
  naamLeeftijdEl.textContent = `${naam}, ${leeftijd} jaar!`;

  // 3. Effect activeren via the canvas-confetti library
  confettiKnop.addEventListener('click', () =>
  {
    // Een mooi confetti effect 
    let duration = 3 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max)
    {
      return Math.random() * (max - min) + min;
    }

    let interval = setInterval(function ()
    {
      let timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      let particleCount = 50 * (timeLeft / duration);

      // Gooi confetti van links en van rechts 
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  });
});