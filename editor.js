document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");

    if (user) {
        document.getElementById("welcomeMessage").innerText = `Welcome, ${user}!`;
    }

    const previewSection = document.getElementById("articlePreview");

    // Προσθήκη Εικόνας
    document.getElementById("addImage").addEventListener("click", () => {
        const imageInput = document.getElementById("imageUpload");
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement("img");
                img.src = event.target.result;
                img.alt = "Uploaded Image";
                img.style.maxWidth = "100%";
                previewSection.appendChild(img);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            alert("Please select an image to upload.");
        }
    });

    // Προσθήκη Βίντεο
    document.getElementById("addVideo").addEventListener("click", () => {
        const videoLink = document.getElementById("videoLink").value.trim();
        if (videoLink) {
            const iframe = document.createElement("iframe");
            iframe.src = videoLink;
            iframe.width = "560";
            iframe.height = "315";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            previewSection.appendChild(iframe);
        } else {
            alert("Please enter a valid video URL.");
        }
    });

    // Υποβολή Άρθρου
    document.getElementById("submitArticle").addEventListener("click", () => {
        const content = document.getElementById("articleContent").value;
        if (content.trim() === "" && previewSection.children.length === 0) {
            alert("Please write something or add media before submitting!");
            return;
        }

        const articleData = {
            author: user,
            content: content,
            media: previewSection.innerHTML,
            date: new Date().toISOString(),
        };

        console.log("Article Submitted:", articleData);
        alert("Your article has been submitted successfully!");
    });
});
