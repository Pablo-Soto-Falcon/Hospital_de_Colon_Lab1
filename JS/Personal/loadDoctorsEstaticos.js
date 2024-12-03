// Cargar los médicos desde un array estático
document.addEventListener("DOMContentLoaded", function () {
    // Definir los datos de los médicos de manera estática
    const doctors = [
        {
            Imagen: "medico1.jpeg",
            Nombre: "Dr. Juan Pérez",
            Especialidad: "Cardiología",
            "Años de experiencia": 15
        },
        {
            Imagen: "medico2.jpeg",
            Nombre: "Dra. Ana López",
            Especialidad: "Dermatología",
            "Años de experiencia": 12
        },
        {
            Imagen: "medico3.jpeg",
            Nombre: "Dr. Carlos García",
            Especialidad: "Ortopedia",
            "Años de experiencia": 20
        },
        {
            Imagen: "medico4.jpeg",
            Nombre: "Dra. Laura Rodríguez",
            Especialidad: "Ginecología",
            "Años de experiencia": 10
        },
        {
            Imagen: "medico5.jpeg",
            Nombre: "Dr. Andrés Gómez",
            Especialidad: "Endocrinología",
            "Años de experiencia": 18
        },
        {
            Imagen: "medico6.jpeg",
            Nombre: "Dra. María Ruíz",
            Especialidad: "Neurología",
            "Años de experiencia": 14
        },
        {
            Imagen: "medico7.jpeg",
            Nombre: "Dra. Fernanda Espinoza",
            Especialidad: "Gastroenterología",
            "Años de experiencia": 22
        },
        {
            Imagen: "medico8.jpeg",
            Nombre: "Dr. Pablo Soto",
            Especialidad: "Oftalmología",
            "Años de experiencia": 16
        },
        {
            Imagen: "medico9.jpeg",
            Nombre: "Dr. Mario Martínez",
            Especialidad: "Otorrinolaringología",
            "Años de experiencia": 11
        },
        {
            Imagen: "medico10.jpeg",
            Nombre: "Dr. Aldo Sheffer",
            Especialidad: "Pediatría",
            "Años de experiencia": 9
        },
        {
            Imagen: "medico11.jpeg",
            Nombre: "Dr. Derek Sheppard",
            Especialidad: "Neurología",
            "Años de experiencia": 17
        },
        {
            Imagen: "medico12.jpeg",
            Nombre: "Dr. Justin Soto",
            Especialidad: "Cardiología",
            "Años de experiencia": 9
        }
    ];

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
});
