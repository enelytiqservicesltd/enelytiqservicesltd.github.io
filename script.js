const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const links = navLinks.querySelectorAll("a");

// Toggle menu when hamburger is clicked
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Hide menu when any nav link is clicked
links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});
const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop default submit

    // Basic validation
    const fullName = form.full_name.value.trim();
    const companyName = form.company_name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!fullName || !companyName || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Submit form using Fetch API
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            successMessage.style.display = "block"; // show popup
            form.reset(); // clear form
        } else {
            alert("There was an issue sending your message. Please try again.");
        }
    } catch (error) {
        alert("Network error. Please try again.");
    }
});
