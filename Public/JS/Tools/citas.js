document.addEventListener('DOMContentLoaded', () => {
    displayCitas();
    document.getElementById('sortProximas').addEventListener('click', sortProximasCitas);
    document.getElementById('sortUltimas').addEventListener('click', sortUltimasCitas);
});

class Pila {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) return "Underflow";
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) return "No elements in Stack";
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printStack() {
        return this.items.join(", ");
    }
}

class Cola {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) return "No elements in Queue";
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printQueue() {
        return this.items.join(", ");
    }
}

function getCitas() {
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    return citas;
}

function displayCitas() {
    const citas = getCitas();
    const container = document.getElementById('citas-container');
    container.innerHTML = '';

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