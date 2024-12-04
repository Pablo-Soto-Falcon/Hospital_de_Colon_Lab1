document.addEventListener('DOMContentLoaded', () => {
    fetchData().then(data => updateUI(data));
});

async function fetchData() {
    try {
        const response = await fetch('/api/medicos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function saveData(data) {
    try {
        const response = await fetch('/api/medicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

async function editObject(id, newData) {
    const data = await fetchData();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { ...data[index], ...newData };
        await saveData(data);
        updateUI(data);
    }
}

async function cloneObject(id) {
    const data = await fetchData();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        const newObject = { ...data[index], id: generateNewId(data) };
        data.push(newObject);
        await saveData(data);
        updateUI(data);
    }
}

function generateNewId(data) {
    let newId;
    do {
        newId = '_' + Math.random().toString(36).substr(2, 9);
    } while (data.some(item => item.id === newId));
    return newId;
}

function updateUI(data) {
    const container = document.getElementById('object-container');
    container.innerHTML = '';
    data.forEach(item => {
        const element = document.createElement('div');
        element.innerHTML = `
            <p><strong>Nombre:</strong> ${item.Nombre}</p>
            <p><strong>Sexo:</strong> ${item.Sexo}</p>
            <p><strong>Especialidad:</strong> ${item.Especialidad}</p>
            <p><strong>Años de experiencia:</strong> ${item['Años de experiencia']}</p>
            <p><strong>Alma mater:</strong> ${item['Alma mater']}</p>
            <p><strong>Horarios:</strong> ${formatHorarios(item.Horarios)}</p>
            <button onclick="openModal('${item.id}')">Editar</button>
            <button onclick="cloneObject('${item.id}')">Clonar</button>
        `;
        container.appendChild(element);
    });
}

function formatHorarios(horarios) {
    return Object.entries(horarios).map(([dia, horas]) => `${dia}: ${horas.join(', ')}`).join('<br>');
}

function openModal(id) {
    fetchData().then(data => {
        const item = data.find(item => item.id === id);
        if (item) {
            document.getElementById('object-id').value = item.id;
            document.getElementById('object-name').value = item.Nombre;
            document.getElementById('object-sexo').value = item.Sexo;
            document.getElementById('object-specialty').value = item.Especialidad;
            document.getElementById('object-experience').value = item['Años de experiencia'];
            document.getElementById('object-alma-mater').value = item['Alma mater'];
            document.getElementById('object-horarios').value = JSON.stringify(item.Horarios);
        }
    });

    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
    document.getElementById('modal-title').innerText = 'Editar Médico';
    document.getElementById('saveButton').onclick = () => saveObject(id);
}

function closeModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

function saveObject(id) {
    const name = document.getElementById('object-name').value;
    const sexo = document.getElementById('object-sexo').value;
    const specialty = document.getElementById('object-specialty').value;
    const experience = document.getElementById('object-experience').value;
    const almaMater = document.getElementById('object-alma-mater').value;
    const horarios = JSON.parse(document.getElementById('object-horarios').value);

    editObject(id, {
        Nombre: name,
        Sexo: sexo,
        Especialidad: specialty,
        'Años de experiencia': experience,
        'Alma mater': almaMater,
        Horarios: horarios
    });
    closeModal();
}