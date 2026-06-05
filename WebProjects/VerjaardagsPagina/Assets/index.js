document.addEventListener('DOMContentLoaded', async () =>
{
  // Mask URL zodat het "Gefelicteerd-met-je-verjaardag" toont in the browser. 
  if (window.history.replaceState) {
    window.history.replaceState(null, '', '/Gefelicteerd-met-je-verjaardag');
  }

  // Elementen pakken
  const confettiKnop = document.getElementById('confetti-knop');
  const naamLeeftijdEl = document.getElementById('naam-leeftijd');
  const fotoContainer = document.getElementById('foto-container');
  const verjaardagsFoto = document.getElementById('verjaardags-foto');

  try {
    const res = await fetch('data.json');
    const data = await res.json();
    
    // Bepaal de datum van vandaag (zonder jaar)
    const today = new Date();
    const todayStr = (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');

    // Zoek de jarige van vandaag 
    const jarige = data.find(person => {
      if (!person.Date) return false;
      return person.Date.substring(5) === todayStr;
    });

    if (jarige) {
      if (jarige.DateOfBirth) {
        const birthYear = parseInt(jarige.DateOfBirth.substring(0, 4));
        const leeftijd = today.getFullYear() - birthYear;
        naamLeeftijdEl.textContent = `${jarige.Title}, ${leeftijd} jaar!`;
      } else {
        naamLeeftijdEl.textContent = jarige.Title; // Alleen de naam als de leeftijd er niet is
      }

      // Probeer de foto in te laden
      verjaardagsFoto.onerror = () => {
        fotoContainer.style.display = 'none'; // Verberg als foto niet bestaat
      };
      verjaardagsFoto.onload = () => {
        fotoContainer.style.display = 'block'; // Toon als foto succesvol laadt
      };
      
      // Zoek een foto in de Assets folder met de naam van de persoon
      verjaardagsFoto.src = `Assets/${jarige.Title.replace(/\s+/g, '')}.jpeg`;
    } else {
      naamLeeftijdEl.textContent = 'Hoera!'; 
      fotoContainer.style.display = 'none';
    }
  } catch(e) {
    console.error('Kon json data niet inladen', e);
    fotoContainer.style.display = 'none';
  }

  // Effect activeren via the canvas-confetti library
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