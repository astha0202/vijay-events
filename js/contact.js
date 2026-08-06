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

        await addDoc(
            collection(db, "contactMessages"),
            {

                name: document.getElementById("name").value,

                email: document.getElementById("email").value,

                phone: document.getElementById("phone").value,

                event: document.getElementById("event").value,

                date: document.getElementById("date").value,

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

        alert("✅ Inquiry sent successfully! We'll contact you soon.");

    } catch (err) {

        console.error(err);

        btn.disabled = false;

        btn.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            Send Inquiry
        `;

        alert("❌ Failed to send inquiry.");

    }

});