// Seleccionar todos los círculos de los proyectos
const circles = document.querySelectorAll('.circle');

circles.forEach(circle => {
    circle.addEventListener('click', function() {
        // Obtener el contenedor del submenú correspondiente
        const submenu = this.closest('.project-card').querySelector('.submenu');
        submenu.classList.add('open'); // Abrir el submenú
    });
});

// Seleccionar todos los botones de cerrar
const closeButtons = document.querySelectorAll('.close-btn');

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Cerrar el submenú
        const submenu = this.closest('.submenu');
        submenu.classList.remove('open');
    });
});

// Función para mostrar u ocultar las opciones de contacto
function toggleContactOptions() {
    const options = document.getElementById('contact-options');
    if (options) {
        options.classList.toggle('show');
    }
    
    const button = document.querySelector('.contact-button');
    button.classList.toggle('open');
}


/*Modo Oscuro*/


// Seleccionar el botón de modo oscuro
const toggleButton = document.getElementById('dark-mode-toggle');

// Verificar si el modo oscuro está habilitado en el localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode'); // Activar el modo oscuro
    toggleButton.textContent = '🌙';  // Cambiar texto del botón
} else {
    document.body.classList.remove('dark-mode'); // Mantener el modo claro
    toggleButton.textContent = '🌙';  // Cambiar texto del botón
}

// Escuchar el evento de clic en el botón
toggleButton.addEventListener('click', () => {
    // Alternar la clase 'dark-mode' en el body
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');  // Desactivar el modo oscuro
        toggleButton.textContent = '🌙';  // Cambiar el texto del botón
        localStorage.setItem('dark-mode', 'disabled'); // Guardar preferencia en localStorage
    } else {
        document.body.classList.add('dark-mode');  // Activar el modo oscuro
        toggleButton.textContent = '🌙';  // Cambiar el texto del botón
        localStorage.setItem('dark-mode', 'enabled'); // Guardar preferencia en localStorage
    }
});




// Función modificada para cambiar contenido según el departamento
function changeContent(src, isVideo, departmentNumber) {
    const mainContentContainer = document.querySelector(`#detail-modal-${departmentNumber} #main-content-container`);
    if (!mainContentContainer) return;
    
    mainContentContainer.innerHTML = '';

    if (isVideo) {
        const videoElement = document.createElement('video');
        videoElement.id = 'main-content';
        videoElement.controls = true;
        videoElement.autoplay = true;

        const sourceElement = document.createElement('source');
        sourceElement.src = src;
        sourceElement.type = 'video/mp4';

        videoElement.appendChild(sourceElement);
        mainContentContainer.appendChild(videoElement);
    } else {
        const imageElement = document.createElement('img');
        imageElement.id = 'main-content';
        imageElement.src = src;
        imageElement.alt = 'Imagen seleccionada';
        mainContentContainer.appendChild(imageElement);
    }
}


// Función para abrir el modal del departamento correspondiente
function openModal(departmentNumber) {
    const modal = document.getElementById('detail-modal-' + departmentNumber);
    modal.classList.remove('hidden');
}

// Función para cerrar el modal del departamento correspondiente
function closeModal(departmentNumber) {
    const modal = document.getElementById('detail-modal-' + departmentNumber);
    if (modal) {
        modal.classList.add('hidden');
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
        }
    }
}

// Agregar eventos a botones "Ver detalles"
document.querySelectorAll('.btn-details').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        // Obtener el número de departamento desde un atributo data
        const departmentNumber = this.getAttribute('data-department');
        openModal(departmentNumber);
    });
});






// Cambiar entre métodos de pago
function togglePaymentMethod() {
    const selectedMethod = document.getElementById('payment-method').value;
    document.getElementById('credit-card-form').style.display = selectedMethod === 'credit-card' ? 'block' : 'none';
    document.getElementById('cash-payment-form').style.display = selectedMethod === 'cash' ? 'block' : 'none';
}

// Generar un código único para pago en efectivo
function generatePaymentCode() {
    const code = 'PE-' + Math.floor(100000000 + Math.random() * 900000000); // Código único
    document.getElementById('payment-code').value = code;
    alert('Código de pago generado: ' + code);
}

// Copiar el código al portapapeles
function copyPaymentCode() {
    const paymentCode = document.getElementById('payment-code').value;
    if (paymentCode) {
        navigator.clipboard.writeText(paymentCode).then(() => {
            alert('Código de pago copiado al portapapeles.');
        });
    } else {
        alert('Primero genera un código de pago.');
    }
}


