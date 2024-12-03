// Cargar los médicos desde el archivo JSON
document.addEventListener("DOMContentLoaded", function () {
    fetch('JSON/medicos.json') // Ruta al archivo JSON con los datos de los médicos
        .then(response => response.json())
        .then(data => {
            const doctors = data; // Asignar directamente el array del JSON
            const teamContainer = document.getElementById("team-container");
            const sortSelect = document.getElementById("sort-experience");

            // Mostrar todos los médicos al principio
            function displayDoctors(filteredDoctors) {
                teamContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar
                filteredDoctors.forEach(doctor => {
                    const doctorCard = document.createElement("div");
                    doctorCard.classList.add("doctor-card");

                    // Crear el contenido de la tarjeta del doctor
                    doctorCard.innerHTML = `
                        <div class="doctor-img">
                            <img src="resources/images/${doctor.Imagen}" alt="${doctor.Nombre}">
                        </div>
                        <h4 class="doctor-name">${doctor.Nombre}</h4>
                        <p class="doctor-specialty">Especialista en ${doctor.Especialidad}</p>
                        <p class="doctor-College">Egresado de la ${doctor['Alma mater']}</p>
                        <p class="doctor-experience">${doctor['Años de experiencia']} años de experiencia</p>
                    `;

                    // Añadir la tarjeta al contenedor
                    teamContainer.appendChild(doctorCard);
                });
            }

            // Filtrar y ordenar los médicos
            const specialtyFilter = document.getElementById("specialty-filter");
            const experienceFilter = document.getElementById("experience-filter");

            function filterAndSortDoctors() {
                const selectedSpecialty = specialtyFilter.value;
                const selectedExperience = parseInt(experienceFilter.value);
                const sortOrder = sortSelect.value;

                // Filtrar los médicos según las selecciones
                let filteredDoctors = doctors.filter(doctor => {
                    const matchSpecialty = selectedSpecialty === 'all' || doctor.Especialidad === selectedSpecialty;
                    const matchExperience = isNaN(selectedExperience) || parseInt(doctor['Años de experiencia']) >= selectedExperience;

                    return matchSpecialty && matchExperience;
                });

                // Ordenar los médicos según los años de experiencia
                if (sortOrder === 'asc') {
                    filteredDoctors.sort((a, b) => a['Años de experiencia'] - b['Años de experiencia']);
                } else if (sortOrder === 'desc') {
                    filteredDoctors.sort((a, b) => b['Años de experiencia'] - a['Años de experiencia']);
                }

                // Mostrar los médicos filtrados y ordenados
                displayDoctors(filteredDoctors);
            }

            // Inicializar la visualización de médicos al cargar la página
            displayDoctors(doctors);

            // Añadir eventos para los filtros
            specialtyFilter.addEventListener("change", filterAndSortDoctors);
            experienceFilter.addEventListener("change", filterAndSortDoctors);
            sortSelect.addEventListener("change", filterAndSortDoctors);
        })
        .catch(error => {
            console.error("Error al cargar los médicos:", error);
        });
});




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


