document.addEventListener("DOMContentLoaded", function () {
    fetch('JSON/medicos.json')
        .then(response => response.json())
        .then(medicos => {
            cargarEspecialidades(medicos);
            document.getElementById('specialty').addEventListener('change', () => cargarDoctores(medicos));
            document.getElementById('doctor').addEventListener('change', () => cargarDias(medicos));
            document.getElementById('day').addEventListener('change', () => cargarHoras(medicos));
            document.getElementById('reservaForm').addEventListener('submit', (event) => reservarHora(event, medicos));
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

function cargarEspecialidades(medicos) {
    const specialtySelect = document.getElementById('specialty');
    const especialidades = [...new Set(medicos.map(medico => medico.Especialidad))];
    especialidades.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad;
        option.textContent = especialidad;
        specialtySelect.appendChild(option);
    });
}

function cargarDoctores(medicos) {
    const specialtySelect = document.getElementById('specialty');
    const doctorSelect = document.getElementById('doctor');
    doctorSelect.innerHTML = '<option value="" disabled selected>Selecciona un doctor</option>';
    const especialidadSeleccionada = specialtySelect.value;
    const doctores = medicos.filter(medico => medico.Especialidad === especialidadSeleccionada);
    doctores.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.Nombre;
        option.textContent = doctor.Nombre;
        doctorSelect.appendChild(option);
    });
}

function cargarDias(medicos) {
    const doctorSelect = document.getElementById('doctor');
    const daySelect = document.getElementById('day');
    daySelect.innerHTML = '<option value="" disabled selected>Selecciona un día</option>';
    const doctorSeleccionado = doctorSelect.value;
    const doctor = medicos.find(medico => medico.Nombre === doctorSeleccionado);
    const diasDisponibles = Object.keys(doctor.Horarios);
    diasDisponibles.forEach(dia => {
        const option = document.createElement('option');
        option.value = dia;
        option.textContent = dia;
        daySelect.appendChild(option);
    });
}

function cargarHoras(medicos) {
    const doctorSelect = document.getElementById('doctor');
    const daySelect = document.getElementById('day');
    const timeSelect = document.getElementById('time');
    timeSelect.innerHTML = '<option value="" disabled selected>Selecciona una hora</option>';
    const doctorSeleccionado = doctorSelect.value;
    const diaSeleccionado = daySelect.value;
    const doctor = medicos.find(medico => medico.Nombre === doctorSeleccionado);
    const horasDisponibles = doctor.Horarios[diaSeleccionado];
    horasDisponibles.forEach(hora => {
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        timeSelect.appendChild(option);
    });
}

function reservarHora(event, medicos) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const specialtySelect = document.getElementById('specialty');
    const doctorSelect = document.getElementById('doctor');
    const daySelect = document.getElementById('day');
    const timeSelect = document.getElementById('time');
    const reserva = {
        nombre: name,
        email: email,
        telefono: phone,
        especialidad: specialtySelect.value,
        doctor: doctorSelect.value,
        dia: daySelect.value,
        hora: timeSelect.value
    };
    localStorage.setItem('reserva', JSON.stringify(reserva));
    console.log('Reserva realizada:', reserva);
    mostrarResumen(reserva);
}

function mostrarResumen(reserva) {
    const modal = document.getElementById('reservaModal');
    const resumen = document.getElementById('reservaResumen');
    resumen.innerHTML = `
        <strong>Nombre:</strong> ${reserva.nombre}<br>
        <strong>Email:</strong> ${reserva.email}<br>
        <strong>Teléfono:</strong> ${reserva.telefono}<br>
        <strong>Especialidad:</strong> ${reserva.especialidad}<br>
        <strong>Doctor:</strong> ${reserva.doctor}<br>
        <strong>Día:</strong> ${reserva.dia}<br>
        <strong>Hora:</strong> ${reserva.hora}
    `;
    modal.style.display = 'block';

    const closeBtn = document.querySelector('.modal .close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        limpiarFormulario();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            limpiarFormulario();
        }
    };
}

function limpiarFormulario() {
    document.getElementById('reservaForm').reset();
}