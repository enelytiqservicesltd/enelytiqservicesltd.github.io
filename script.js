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
    document.addEventListener("DOMContentLoaded", function () {
        const slides = document.querySelectorAll(".hero-slider .slide");
    const dots = document.querySelectorAll(".slider-dots .dot");
    let currentSlide = 0;
    let slideTimer;
    const slideInterval = 5000;

    // Function to update visual elements to a specific slide index
    function goToSlide(index) {
        // Remove active status from current items
        slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    // Set new current index
    currentSlide = index;

    // Add active status to new items
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
        }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
        }

    // Starts or resets the auto-rotation interval
    function startTimer() {
        clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideInterval);
        }

        // Click event listener for indicator dots
        dots.forEach(dot => {
        dot.addEventListener("click", function () {
            const targetIndex = parseInt(this.getAttribute("data-index"));
            if (targetIndex !== currentSlide) {
                goToSlide(targetIndex);
                startTimer(); // Reset timer so image doesn't instantly flip away
            }
        });
        });

    // Initialize timer loop on page load
    startTimer();
    });


