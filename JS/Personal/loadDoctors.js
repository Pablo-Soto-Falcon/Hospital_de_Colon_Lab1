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
                        <p class="doctor-specialty">${doctor.Especialidad}</p>
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
