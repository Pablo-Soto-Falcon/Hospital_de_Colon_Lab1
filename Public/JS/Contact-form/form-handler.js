import { showModal, closeModal } from './modal.js';
import { validateEmail, validatePhone, validateFields } from './validations.js';

export function handleFormSubmission(e) {
    e.preventDefault(); // Evita que el formulario se envíe

    const form = document.getElementById("contact-form");

    // Obtener valores del formulario
    const nombre = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("phone").value.trim();
    const mensaje = document.getElementById("message").value.trim();

    // Mostrar siempre en consola lo ingresado por el usuario
    console.log("Datos ingresados por el usuario:");
    console.log(`Nombre: ${nombre}`);
    console.log(`Correo: ${email}`);
    console.log(`Teléfono: ${telefono}`);
    console.log(`Mensaje: ${mensaje}`);

    try {
        // Validar campos
        if (!validateFields(nombre, email, telefono, mensaje)) {
            throw new Error("Por favor, completa todos los campos.");
        }

        // Validar correo
        if (!validateEmail(email)) {
            throw new Error("Por favor, ingresa un correo electrónico válido.");
        }

        // Validar teléfono
        if (!validatePhone(telefono)) {
            throw new Error("El número de teléfono debe ser solo numérico.");
        }

        // Crear resumen y mostrar modal
        const resumen = `
            Nombre: ${nombre}<br>
            Correo: ${email}<br>
            Teléfono: ${telefono}<br>
            Mensaje: ${mensaje}
        `;
        showModal(resumen, form);

        // Registrar datos en consola tras éxito
        console.log("Formulario enviado con éxito:");
        console.log(`Nombre: ${nombre}`);
        console.log(`Correo: ${email}`);
        console.log(`Teléfono: ${telefono}`);
        console.log(`Mensaje: ${mensaje}`);

        // Limpiar mensajes de error
        const resultado = document.getElementById("resultado");
        resultado.innerHTML = "";
    } catch (error) {
        const resultado = document.getElementById("resultado");
        resultado.innerHTML = `<p class="text-danger">${error.message}</p>`;
        console.error("Error detectado:", error);
    }
}
