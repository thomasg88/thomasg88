document.addEventListener("DOMContentLoaded", function() {
    function getSelectedLanguage() {
        return localStorage.getItem("selectedLanguage") || "el"; // Προεπιλογή στα Ελληνικά
    }

    function setSelectedLanguage(lang) {
        localStorage.setItem("selectedLanguage", lang);
    }

    function applyStoredLanguage() {
        var selectedLang = getSelectedLanguage();
        var selectElement = document.querySelector(".goog-te-combo");
        if (selectElement) {
            selectElement.value = selectedLang;
            selectElement.dispatchEvent(new Event("change"));
        }
    }

    function updateLinksWithLanguage() {
        var selectedLang = getSelectedLanguage();
        document.querySelectorAll("a").forEach(link => {
            var href = link.getAttribute("href");
            if (href && !href.includes("mailto") && !href.includes("#") && !href.includes("translate")) {
                if (href.includes("?lang=")) {
                    href = href.replace(/lang=[^&]+/, "lang=" + selectedLang);
                } else {
                    href += (href.includes("?") ? "&" : "?") + "lang=" + selectedLang;
                }
                link.setAttribute("href", href);
            }
        });
    }

    function detectLanguageChange() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(mutation => {
                if (mutation.type === "childList") {
                    var selectElement = document.querySelector(".goog-te-combo");
                    if (selectElement) {
                        selectElement.addEventListener("change", function() {
                            setSelectedLanguage(selectElement.value);
                            updateLinksWithLanguage();
                        });
                    }
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    function reloadTranslateWidget() {
        setTimeout(() => {
            var selectedLang = getSelectedLanguage();
            var translateSelect = document.querySelector(".goog-te-combo");

            if (translateSelect) {
                translateSelect.value = selectedLang;
                translateSelect.dispatchEvent(new Event("change"));
            } else {
                console.warn("Google Translate dropdown not found. Retrying...");
                reloadTranslateWidget();
            }
        }, 2000);
    }

    applyStoredLanguage();
    updateLinksWithLanguage();
    detectLanguageChange();
    reloadTranslateWidget();
});
