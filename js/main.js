/*==========================================
MOBILE MENU
==========================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}


/*==========================================
LOADER
==========================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {

            loader.remove();

        }, 700);

    }

});


/*==========================================
STICKY HEADER
==========================================*/

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/*==========================================
SMOOTH SCROLL
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (href === "#") return;

        const target = document.querySelector(href);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
/*==========================================
COUNTER ANIMATION
==========================================*/

const counters = document.querySelectorAll(".stat-card h2, .counter-box h2");

if (counters.length > 0) {

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const value = counter.innerText;

            const target = parseInt(value.replace(/\D/g, ""));

            const suffix = value.replace(/[0-9]/g, "");

            let count = 0;

            const speed = Math.max(target / 120, 1);

            function updateCounter() {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.floor(count) + suffix;

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target + suffix;

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        });

    }, {

        threshold: .4

    });

    counters.forEach(counter => counterObserver.observe(counter));

}


/*==========================================
SCROLL REVEAL
==========================================*/

const revealElements = document.querySelectorAll(

".fade-up,.fade-left,.fade-right,.zoom"

);

if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    revealElements.forEach(item => {

        revealObserver.observe(item);

    });

}


/*==========================================
ACTIVE NAVIGATION
==========================================*/

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        const height = section.offsetHeight;

        if (window.scrollY >= top &&

            window.scrollY < top + height) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + current) {

            link.classList.add("active");

        }

    });

});
/*==========================================
BACK TO TOP BUTTON
==========================================*/

const topBtn = document.querySelector(".top-btn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}


/*==========================================
SCROLL PROGRESS BAR
==========================================*/

const progressBar = document.querySelector(".progress-bar");

if (progressBar) {

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            (window.scrollY / totalHeight) * 100;

        progressBar.style.width = progress + "%";

    });

}


/*==========================================
FAQ
==========================================*/

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        question.classList.toggle("active");

        if (answer.style.maxHeight) {

            answer.style.maxHeight = null;

        } else {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/*==========================================
IMAGE HOVER TILT
==========================================*/

if (window.innerWidth > 992) {

document.querySelectorAll(

".service-card,.gallery-item,.rental-card"

).forEach(card => {

card.addEventListener("mousemove", e => {

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

const rotateX = -(y - rect.height/2)/20;

const rotateY = (x - rect.width/2)/20;

card.style.transform =

`perspective(1000px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

scale(1.03)`;

});

card.addEventListener("mouseleave", () => {

card.style.transform = "";

});

});

}


/*==========================================
TESTIMONIAL AUTO SLIDER
==========================================*/

const slider = document.querySelector(".testimonial-slider");

if (slider) {

setInterval(() => {

slider.scrollBy({

left: 350,

behavior: "smooth"

});

if (

slider.scrollLeft +

slider.clientWidth >=

slider.scrollWidth - 5

){

slider.scrollTo({

left:0,

behavior:"smooth"

});

}

},4000);

}


/*==========================================
LAZY IMAGE ANIMATION
==========================================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("loaded");

imageObserver.unobserve(entry.target);

}

});

});

images.forEach(img => {

imageObserver.observe(img);

});
/*==========================================
GALLERY FILTER
==========================================*/

const filterBtns = document.querySelectorAll(".gallery-filter button");
const galleryItems = document.querySelectorAll(".gallery-item");

if (filterBtns.length > 0) {

    filterBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.dataset.filter || "all";

            galleryItems.forEach(item => {

                const itemCategory = item.dataset.category || "all";

                if (category === "all" || itemCategory === category) {

                    item.style.display = "block";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });

}


/*==========================================
CONTACT FORM
==========================================*/

const contactForm = document.querySelector("#contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(e) {

        e.preventDefault();

        alert("Thank you! We will contact you shortly.");

        this.reset();

    });

}


/*==========================================
BOOKING FORM
==========================================*/

const bookingForm = document.querySelector("#bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function(e){

        e.preventDefault();

        alert("Booking request submitted successfully!");

        this.reset();

    });

}


/*==========================================
WHATSAPP BUTTON
==========================================*/

document.querySelectorAll(".whatsapp-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const phone = "918090030017";

        const message = encodeURIComponent(

            "Hello Vijay Events, I would like to enquire about your event services."

        );

        window.open(

            `https://wa.me/${phone}?text=${message}`,

            "_blank"

        );

    });

});


/*==========================================
CURRENT YEAR
==========================================*/

const year = document.querySelector(".current-year");

if (year) {

    year.textContent = new Date().getFullYear();

}