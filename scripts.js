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
    const button = document.querySelector('.contact-button');

    // Verificar si las opciones ya están visibles
    if (options.classList.contains('show')) {
        // Ocultar opciones y cambiar el botón de estado
        options.classList.remove('show');
        button.classList.remove('open');
    } else {
        // Mostrar opciones y cambiar el botón de estado
        options.classList.add('show');
        button.classList.add('open');
    }
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




// Función para cambiar entre video o imagen en el contenedor principal
function changeContent(src, isVideo) {
    const mainContentContainer = document.getElementById('main-content-container');
    mainContentContainer.innerHTML = ''; // Limpia el contenido actual

    if (isVideo) {
        // Cargar un video
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
        // Cargar una imagen
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
    modal.classList.add('hidden');
    const mainContent = document.getElementById('main-content-' + departmentNumber);
    if (mainContent && mainContent.tagName === 'VIDEO') {
        mainContent.pause(); // Pausar video si está reproduciéndose
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






function togglePaymentMethod() {
    const paymentMethod = document.getElementById("payment-method").value;
    const creditCardForm = document.getElementById("credit-card-form");
    const cashPaymentForm = document.getElementById("cash-payment-form");

    if (paymentMethod === "cash") {
        creditCardForm.style.display = "none"; // Oculta el formulario de tarjeta de crédito
        cashPaymentForm.style.display = "block"; // Muestra el formulario de pago en efectivo

        // Mostrar solo los campos requeridos para efectivo
        cashPaymentForm.innerHTML = `
            <div class="form-group">
                <label for="cash-first-name">Nombre</label>
                <input type="text" id="cash-first-name" name="cash-first-name" required placeholder="Ingresa tu nombre">
            </div>
            <div class="form-group">
                <label for="cash-last-name">Apellido</label>
                <input type="text" id="cash-last-name" name="cash-last-name" required placeholder="Ingresa tu apellido">
            </div>
            <div class="form-group">
                <label for="cash-dni">DNI</label>
                <input type="text" id="cash-dni" name="cash-dni" required placeholder="Ingresa tu DNI">
            </div>
            <div class="form-group">
                <label for="cash-email">Correo Electrónico</label>
                <input type="email" id="cash-email" name="cash-email" required placeholder="Ingresa tu correo electrónico">
            </div>
            <div class="form-actions">
                <button type="button" class="btn" onclick="submitCashPayment()">Enviar</button>
                <!-- Botón Cancelar en Pago en Efectivo -->
                <button type="button" class="btn-secondary" onclick="window.location.href='/index.html'">Cancelar</button>
            </div>
        `;
    } else {
        creditCardForm.style.display = "block"; // Muestra el formulario de tarjeta de crédito
        cashPaymentForm.style.display = "none"; // Oculta el formulario de pago en efectivo
    }
}

function submitCashPayment() {
    alert("Pago en efectivo procesado correctamente.");
    // Lógica adicional para procesar el pago en efectivo
}
