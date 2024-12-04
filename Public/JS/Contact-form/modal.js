export function showModal(content, form) {
    const modalContent = document.getElementById("modal-content");
    const modal = document.getElementById("modal");

    if (modalContent) {
        modalContent.innerHTML = `
            <div class="modal-header">
                <span class="close">&times;</span>
                <h3>Resumen de tu mensaje</h3>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        `;

        modal.style.display = "block";
        modal.classList.add("open");

        // Agregar funcionalidad al botón de cierre
        const closeButton = modalContent.querySelector(".close");
        if (closeButton) {
            closeButton.onclick = function () {
                closeModal(modal, form);
            };
        }

        // Cerrar modal al hacer clic fuera del contenido
        window.onclick = function (event) {
            if (event.target === modal) {
                closeModal(modal, form);
            }
        };
    } else {
        console.error("No se encontró el elemento modal-content.");
    }
}

export function closeModal(modal, form) {
    modal.style.display = "none";
    form.reset();
}
