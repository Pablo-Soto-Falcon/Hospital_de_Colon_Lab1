import { handleFormSubmission } from './form-handler.js';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", handleFormSubmission);
    } else {
        console.error("Formulario no encontrado");
    }
});
