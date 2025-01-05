function googleTranslateElementInit() {
    console.log("Google Translate Widget initialized.");
    new google.translate.TranslateElement(
        {pageLanguage: 'el', includedLanguages: 'en,el'}, 
        'google_translate_element'
    );
}
// Επιλέγουμε όλες τις ενότητες
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    section.addEventListener('click', function() {
        // Αφαιρούμε την κλάση 'selected' από όλες τις ενότητες
        sections.forEach(s => s.classList.remove('selected'));
        
        // Προσθέτουμε την κλάση 'selected' μόνο σε αυτή που πατήθηκε
        this.classList.add('selected');

        // Μετάβαση στη σελίδα της ενότητας
        const category = this.getAttribute('data-category'); // Η κατηγορία από το attribute
        window.location.href = `${category}.html`; // Μετάβαση στη σχετική σελίδα
    });
});