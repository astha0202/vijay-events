import {
    auth,
    signInWithEmailAndPassword
} from "./firebase.js";

const form = document.getElementById("loginForm");
const error = document.getElementById("loginError");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const button = form.querySelector("button");

    button.disabled = true;
    button.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Logging In...
    `;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        window.location.href = "admin/dashboard.html";

    } catch (err) {

        console.error(err);

        error.textContent = "❌ Invalid email or password.";

        button.disabled = false;

        button.innerHTML = `
            <i class="fa-solid fa-right-to-bracket"></i>
            Login
        `;

    }

});