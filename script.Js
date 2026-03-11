


/* ------------------------------------------
   2. HEADER – SCROLL-EFFEKT
      Lägger till skugga när användaren scrollar
   ------------------------------------------ */
const header = document.getElementById('header');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');   // Skugga visas
    } else {
        header.classList.remove('scrolled'); // Skugga döljs
    }
});

/* ------------------------------------------
   3. HAMBURGERMENY (mobil)
      Öppnar/stänger navigationen
   ------------------------------------------ */
const menuToggle = document.getElementById('menuToggle');
const mainMenu   = document.getElementById('mainMenu');

menuToggle.addEventListener('click', function () {
    const isOpen = mainMenu.classList.toggle('open');

    // Uppdatera aria-attributet för tillgänglighet
    menuToggle.setAttribute('aria-expanded', isOpen);
});

/* ------------------------------------------
   4. AKTIV LÄNK
      Markerar rätt länk baserat på aktuell sida
   ------------------------------------------ */
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks    = document.querySelectorAll('.menu a');

navLinks.forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop();

    if (href === currentPath) {
        link.classList.add('active'); // Markerar aktiv länk
    } else {
        link.classList.remove('active');
    }
});

/* ------------------------------------------
   5. FADE-IN VID SCROLL (Intersection Observer)
      Elementen tonar in när de scrollas in i vyn
   ------------------------------------------ */

// Definiera vilka element som ska animeras
const fadeTargets = document.querySelectorAll('.car-card, .usp-item, .stat, .intro-text');

// Lägg till startläge (osynlig, lite nedflyttad)
fadeTargets.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Observer som reagerar när element syns
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            // Elementet är synligt – animera in
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Observera bara en gång
        }
    });
}, {
    threshold: 0.15 // 15% av elementet ska synas innan animationen startar
});

fadeTargets.forEach(function (el) {
    observer.observe(el);
});

/* ------------------------------------------
   6. STAGGERAD ANIMATION FÖR BILKORT
      Kortens inkomst fördröjs stegvis
   ------------------------------------------ */
document.querySelectorAll('.car-card').forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.12) + 's'; // 0s, 0.12s, 0.24s
});
