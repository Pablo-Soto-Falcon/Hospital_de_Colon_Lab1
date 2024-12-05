document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    displayCitas();
    document.getElementById('sortProximas').addEventListener('click', sortProximasCitas);
    document.getElementById('sortUltimas').addEventListener('click', sortUltimasCitas);
});

function getCitas() {
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    console.log('Citas fetched from localStorage:', citas);
    return citas;
}

function displayCitas() {
    const citas = getCitas();
    const container = document.getElementById('citas-container');
    container.innerHTML = '';

    if (citas.length === 0) {
        container.innerHTML = '<p>No hay citas disponibles.</p>';
    } else {
        citas.forEach(cita => {
            const citaElement = document.createElement('div');
            citaElement.classList.add('cita-card');
            citaElement.innerHTML = `
                <p><strong>Paciente:</strong> ${cita.paciente}</p>
                <p><strong>Doctor:</strong> ${cita.doctor}</p>
                <p><strong>Especialidad:</strong> ${cita.especialidad}</p>
                <p><strong>Fecha:</strong> ${cita.fecha}</p>
                <p><strong>Hora:</strong> ${cita.hora}</p>
            `;
            container.appendChild(citaElement);
        });
    }
}

function sortProximasCitas() {
    const citas = getCitas();
    citas.sort((a, b) => new Date(a.fecha + ' ' + a.hora) - new Date(b.fecha + ' ' + b.hora));
    localStorage.setItem('citas', JSON.stringify(citas));
    displayCitas();
}

function sortUltimasCitas() {
    const citas = getCitas();
    citas.sort((a, b) => new Date(b.fecha + ' ' + b.hora) - new Date(a.fecha + ' ' + a.hora));
    localStorage.setItem('citas', JSON.stringify(citas));
    displayCitas();
}