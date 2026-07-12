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
        const container = document.querySelector("#home") || document.querySelector(".hero-slider");
        let currentSlide = 0;
        let slideTimer = null;
        const slideInterval = 5000;

        function goToSlide(index) {
            if (!slides.length) return;
            slides[currentSlide].classList.remove("active");
            dots[currentSlide].classList.remove("active");

            currentSlide = index;

            slides[currentSlide].classList.add("active");
            dots[currentSlide].classList.add("active");
        }

        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }

        function startTimer() {
            stopTimer(); // Always clear existing loops first
            slideTimer = setInterval(nextSlide, slideInterval);
        }

        function stopTimer() {
            if (slideTimer) {
                clearInterval(slideTimer);
                slideTimer = null;
            }
        }

        // Fix 1: Click event listener optimized for mobile/desktop
        dots.forEach(dot => {
            dot.addEventListener("click", function (e) {
                e.preventDefault(); // Prevents double-firing on touch screens
                const targetIndex = parseInt(this.getAttribute("data-index"));
                if (targetIndex !== currentSlide) {
                    goToSlide(targetIndex);
                    startTimer(); 
                }
            });
        });

        // Fix 2: Safety loop recovery for mobile wake/sleep states
        document.addEventListener("visibilitychange", function() {
            if (document.visibilityState === "visible") {
                startTimer(); // Restarts slider when user switches back to the tab
            } else {
                stopTimer();  // Freezes timer when browser is minimized to save battery
            }
        });

        // Fix 3: Optional but recommended mobile touch safety fallback
        if (container) {
            container.addEventListener("touchstart", stopTimer, { passive: true });
            container.addEventListener("touchend", startTimer, { passive: true });
        }

        // Initial launch
        startTimer();
    });

