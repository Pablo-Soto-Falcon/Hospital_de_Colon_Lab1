function generateDoctorCards() {
    const teamContainer = document.getElementById('team-container');
    teamContainer.innerHTML = ''; // Limpiar contenido previo

    doctorsData.forEach(doctor => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('mb-4');
        
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${doctor.name}</h5>
                <p class="card-text">Especialidad: ${doctor.specialty}</p>
                <p class="card-text">Años de experiencia: ${doctor.experience}</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#availabilityModal" onclick="showAvailability(${doctor.id})">Ver horas disponibles</button>
            </div>
        `;
        
        teamContainer.appendChild(card);
    });
}

// Función para mostrar la disponibilidad del doctor en el modal
function showAvailability(doctorId) {
    const doctor = doctorsData.find(d => d.id === doctorId);
    
    // Limpiar contenido previo
    const tableBody = document.getElementById('availability-table-body');
    tableBody.innerHTML = '';

    // Rellenar la tabla con la disponibilidad del doctor
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const availability = doctor.availability;

    const row = document.createElement('tr');
    daysOfWeek.forEach(day => {
        const cell = document.createElement('td');
        const availableHours = availability[day] || [];
        cell.innerHTML = availableHours.length > 0 ? availableHours.join('<br>') : 'No disponible';
        row.appendChild(cell);
    });

    tableBody.appendChild(row);
}

// Inicializar las tarjetas cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    generateDoctorCards();
});