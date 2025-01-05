// Εφέ animation κατά το scroll
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".article-card");
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target); // Διακοπή παρακολούθησης για καλύτερη απόδοση
        }
      });
    }, {
      threshold: 0.5, // Πόσο ορατό πρέπει να είναι το στοιχείο (50%)
    });
  
    cards.forEach(card => observer.observe(card));
  });
  
  // Εφέ hover με GSAP
  gsap.from(".article-card", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    stagger: 0.3,
    ease: "power2.out"
  });
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Το CMS έχει φορτωθεί και η σελίδα είναι έτοιμη.');
});