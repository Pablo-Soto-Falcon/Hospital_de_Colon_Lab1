document.addEventListener('DOMContentLoaded', () => {
    fetchData('servicios').then(services => {
        displayServices(services);
    });
});

async function fetchData(file) {
    try {
        const response = await fetch(`/api/${file}`);
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

function displayServices(services) {
    const container = document.getElementById('services-container');
    container.innerHTML = '';

    const groupedServices = services.reduce((acc, service) => {
        if (!acc[service.Especialidad]) {
            acc[service.Especialidad] = [];
        }
        acc[service.Especialidad].push(service.Nombre);
        return acc;
    }, {});

    for (const [especialidad, nombres] of Object.entries(groupedServices)) {
        const serviceElement = document.createElement('div');
        serviceElement.classList.add('service-card');

        serviceElement.innerHTML = `
            <h3>${especialidad}</h3>
            <p><strong>Doctores:</strong> ${nombres.join(', ')}</p>
        `;

        container.appendChild(serviceElement);
    }
}