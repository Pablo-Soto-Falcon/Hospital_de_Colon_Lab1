document.addEventListener('DOMContentLoaded', () => {
    fetchDoctors().then(doctors => {
        populateSpecialties(doctors);
        setupEventListeners(doctors);
    });

    const reservaForm = document.getElementById('reservaForm');
    reservaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        mostrarResumen();
    });
});

async function fetchDoctors() {
    try {
        const response = await fetch('/api/medicos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const doctors = await response.json();
        return doctors;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
}

function populateSpecialties(doctors) {
    const specialtySelect = document.getElementById('specialty');
    const specialties = [...new Set(doctors.map(doctor => doctor.Especialidad))];
    specialties.forEach(specialty => {
        const option = document.createElement('option');
        option.value = specialty;
        option.textContent = specialty;
        specialtySelect.appendChild(option);
    });
}

function setupEventListeners(doctors) {
    const specialtySelect = document.getElementById('specialty');
    const doctorSelect = document.getElementById('doctor');
    const daySelect = document.getElementById('day');
    const timeSelect = document.getElementById('time');

    specialtySelect.addEventListener('change', () => {
        const selectedSpecialty = specialtySelect.value;
        populateDoctors(doctors, selectedSpecialty);
    });

    doctorSelect.addEventListener('change', () => {
        const selectedDoctorId = doctorSelect.value;
        populateDays(doctors, selectedDoctorId);
    });

    daySelect.addEventListener('change', () => {
        const selectedDoctorId = doctorSelect.value;
        const selectedDay = daySelect.value;
        populateTimes(doctors, selectedDoctorId, selectedDay);
    });
}

function populateDoctors(doctors, specialty) {
    const doctorSelect = document.getElementById('doctor');
    doctorSelect.innerHTML = '<option value="" disabled selected>Selecciona un doctor</option>';
    const filteredDoctors = doctors.filter(doctor => doctor.Especialidad === specialty);
    filteredDoctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.Nombre;
        doctorSelect.appendChild(option);
    });
}

function populateDays(doctors, doctorId) {
    const daySelect = document.getElementById('day');
    daySelect.innerHTML = '<option value="" disabled selected>Selecciona un día</option>';
    const doctor = doctors.find(doctor => doctor.id === doctorId);
    if (doctor) {
        const days = Object.keys(doctor.Horarios);
        days.forEach(day => {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            daySelect.appendChild(option);
        });
    }
}

function populateTimes(doctors, doctorId, day) {
    const timeSelect = document.getElementById('time');
    timeSelect.innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';
    const doctor = doctors.find(doctor => doctor.id === doctorId);
    if (doctor && doctor.Horarios[day]) {
        const times = doctor.Horarios[day];
        times.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
    }
}

function mostrarResumen() {
    const nombre = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('phone').value;
    const especialidad = document.getElementById('specialty').value;
    const doctor = document.getElementById('doctor').selectedOptions[0].textContent;
    const dia = document.getElementById('day').value;
    const hora = document.getElementById('time').value;

    document.getElementById('resumenNombre').textContent = nombre;
    document.getElementById('resumenEmail').textContent = email;
    document.getElementById('resumenTelefono').textContent = telefono;
    document.getElementById('resumenEspecialidad').textContent = especialidad;
    document.getElementById('resumenDoctor').textContent = doctor;
    document.getElementById('resumenDia').textContent = dia;
    document.getElementById('resumenHora').textContent = hora;

    console.log(`Nombre Completo: ${nombre}`);
    console.log(`Correo Electrónico: ${email}`);
    console.log(`Teléfono: ${telefono}`);
    console.log(`Especialidad: ${especialidad}`);
    console.log(`Doctor: ${doctor}`);
    console.log(`Día: ${dia}`);
    console.log(`Hora: ${hora}`);

    document.getElementById('reservaModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('reservaModal').style.display = 'none';
}