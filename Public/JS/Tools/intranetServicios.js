document.addEventListener('DOMContentLoaded', () => {
    fetchData('servicios.json').then(services => {
        displayServices(services);
    });
});

async function fetchData(file) {
    try {
        const response = await fetch('JSON/servicios.json');
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
    services.forEach(service => {
        const serviceElement = document.createElement('div');
        serviceElement.classList.add('service-card');

        serviceElement.innerHTML = `
            <h3>${service.Servicio}</h3>
            <p><strong>Descripción:</strong> ${service.Descripción}</p>
        `;

        container.appendChild(serviceElement);
    });
}