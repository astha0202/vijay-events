console.log("contact.js loaded");
import {
    db,
    collection,
    addDoc,
    serverTimestamp
} from "./firebase.js";
const form = document.getElementById("contactForm");
const btn = document.getElementById("contactBtn");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    btn.disabled = true;

    btn.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Sending...
    `;

    try {
        console.log("Submitting contact form...");

        await addDoc(
            collection(db, "contactMessages"),
            {

                name: document.getElementById("name").value,

                email: document.getElementById("email").value,

                phone: document.getElementById("phone").value,

                event: document.getElementById("eventType").value,

                date: document.getElementById("eventDate").value,

                message: document.getElementById("message").value,

                status: "New",

                created: serverTimestamp()

            }
        );

        form.reset();

        btn.disabled = false;

        btn.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            Send Inquiry
        `;

    Swal.fire({
        icon: "success",
        title: "Inquiry Sent!",
        text: "We'll contact you shortly.",
        confirmButtonColor: "#D4AF37"
    });

    } catch (err) {

        console.error(err);

        btn.disabled = false;

        btn.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            Send Inquiry
        `;



    Swal.fire({
        icon: "error",
        title: "Firebase Error",
        text: err.message,
        confirmButtonColor: "#D4AF37"
    });

    }

});