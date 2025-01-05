document.addEventListener("DOMContentLoaded", () => {
    const collaborators = [
        { name: "thomas", email: "thomasgkoud1@yahoo.gr" },
        { name: "mariaMitsuo", email: "thomasgkoud1@gmail.com" },
         
    ];

    const validEmails = ["thomasgkoud1@yahoo.gr", "thomasgkoud1@gmail.com"].map(email => email.trim());

    const photos = document.querySelectorAll(".collaborator-photo");

    photos.forEach((photo, index) => {
        // Απενεργοποίηση δεξιού κλικ
        photo.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            alert("Το δεξί κλικ στις φωτογραφίες είναι απενεργοποιημένο για προστασία.");
        });

         // Ενεργοποίηση κατά το κλικ στη φωτογραφία
        photo.addEventListener("click", () => {
            const email = prompt("Please enter your email for verification:");
            if (email === collaborators[index].email) {
                alert(`Welcome, ${collaborators[index].name}!`);
                window.location.href = `editor.html?user=${encodeURIComponent(collaborators[index].name)}`;
            } else {
                alert("Invalid email! Access denied.");
            }
        });
    });
});

// Συνάρτηση για αποστολή email μέσω FormSubmit
function sendVerificationEmail(email, name) {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("message", `Collaborator ${name} has logged in.`);

    // Αποστολή μέσω Fetch API
    fetch("https://formsubmit.co/YOUR_EMAIL_ADDRESS", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                alert(`A verification email has been successfully sent to ${email}`);
            } else {
                alert("There was an error sending the email. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An unexpected error occurred. Please try again.");
        });
}
async function showArticles(author) {
    const response = await fetch(`/content/_opinions/${author}.json`);
    const data = await response.json();

    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const articleList = document.getElementById("article-list");

    modalTitle.innerText = `Άρθρα από τον/την ${author}`;
    articleList.innerHTML = "";

    if (data.articles.length > 0) {
        data.articles.forEach(article => {
            const listItem = document.createElement("li");
            listItem.innerText = article.title;
            articleList.appendChild(listItem);
        });
    } else {
        const noArticles = document.createElement("p");
        noArticles.innerText = "Δεν υπάρχουν άρθρα προς το παρόν.";
        articleList.appendChild(noArticles);
    }

    modal.style.display = "block";
}
