document.addEventListener("DOMContentLoaded", function () {
    fetch('JSON/medicos.json')
        .then(response => response.json())
        .then(medicos => {
            mostrarDoctores(medicos);
            document.getElementById('runButton').addEventListener('click', () => ejecutarAccion(medicos));
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

function mostrarDoctores(medicos) {
    const doctoresContainer = document.getElementById('doctoresContainer');
    doctoresContainer.innerHTML = '';

    medicos.forEach((medico, index) => {
        const medicoDiv = document.createElement('div');
        medicoDiv.className = 'medico';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'medico-checkbox';
        checkbox.dataset.index = index;

        const medicoTable = crearTablaMedico(medico);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        medicoDiv.appendChild(checkbox);
        medicoDiv.appendChild(medicoTable);
        medicoDiv.appendChild(buttonContainer);
        doctoresContainer.appendChild(medicoDiv);
    });
}

function crearTablaMedico(medico) {
    const table = document.createElement('table');
    table.className = 'medico-table';

    for (const key in medico) {
        if (medico.hasOwnProperty(key)) {
            const row = document.createElement('tr');

            const cellKey = document.createElement('td');
            cellKey.textContent = key;
            cellKey.className = 'medico-key';

            const cellValue = document.createElement('td');
            if (typeof medico[key] === 'object') {
                cellValue.textContent = JSON.stringify(medico[key], null, 2);
            } else {
                cellValue.textContent = medico[key];
            }
            cellValue.className = 'medico-value';

            row.appendChild(cellKey);
            row.appendChild(cellValue);
            table.appendChild(row);
        }
    }

    return table;
}

function ejecutarAccion(medicos) {
    const selectedAction = document.getElementById('actionSelector').value;
    const checkboxes = document.querySelectorAll('.medico-checkbox:checked');

    checkboxes.forEach(checkbox => {
        const index = checkbox.dataset.index;
        const medico = medicos[index];

        if (selectedAction === 'clone') {
            clonarMedico(medico);
        } else if (selectedAction === 'edit') {
            abrirModalEdicion(medico, index);
        }
    });
}

function clonarMedico(medico) {
    const clonedMedico = JSON.parse(JSON.stringify(medico));
    console.log('Clonado:', clonedMedico);

    const doctoresContainer = document.getElementById('doctoresContainer');
    const clonedMedicoDiv = document.createElement('div');
    clonedMedicoDiv.className = 'medico';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'medico-checkbox';

    const clonedMedicoTable = crearTablaMedico(clonedMedico);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    clonedMedicoDiv.appendChild(checkbox);
    clonedMedicoDiv.appendChild(clonedMedicoTable);
    clonedMedicoDiv.appendChild(buttonContainer);
    doctoresContainer.appendChild(clonedMedicoDiv);
}

function abrirModalEdicion(medico, index) {
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editForm');
    form.innerHTML = '';

    for (const key in medico) {
        if (medico.hasOwnProperty(key)) {
            const label = document.createElement('label');
            label.textContent = key;

            const input = document.createElement('input');
            input.type = 'text';
            input.name = key;
            input.value = typeof medico[key] === 'object' ? JSON.stringify(medico[key]) : medico[key];

            form.appendChild(label);
            form.appendChild(input);
        }
    }

    const saveButton = document.getElementById('saveButton');
    saveButton.onclick = () => guardarEdicion(medico, index);

    modal.style.display = 'block';

    const closeBtn = document.querySelector('.modal .close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function guardarEdicion(medico, index) {
    const form = document.getElementById('editForm');
    const formData = new FormData(form);

    formData.forEach((value, key) => {
        try {
            medico[key] = JSON.parse(value);
        } catch (e) {
            medico[key] = value;
        }
    });

    localStorage.setItem(`medico_${index}`, JSON.stringify(medico));
    mostrarDoctores([medico]);

    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}