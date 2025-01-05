document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".ad-section");

    // Ομαλή κύλιση κατά τη χρήση ροδέλας
    document.addEventListener("wheel", (event) => {
        const delta = event.deltaY > 0 ? 1 : -1;
        const currentSection = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).closest(".ad-section");
        const currentIndex = Array.from(sections).indexOf(currentSection);

        if (sections[currentIndex + delta]) {
            sections[currentIndex + delta].scrollIntoView({ behavior: "smooth" });
        }
    });
});