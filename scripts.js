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


let currentPosition = 0;
let currentDepartment = '';
let contentArray = [];

function initializeCarousel(departmentId) {
    currentDepartment = departmentId;
    const track = document.querySelector(`#detail-modal-${departmentId} .carousel-track`);
    const items = track.getElementsByClassName('carousel-item');
    contentArray = Array.from(items).map(item => {
        const onclickAttr = item.getAttribute('onclick');
        const matches = onclickAttr.match(/changeContent\('([^']+)',\s*(true|false)/);
        return {
            path: matches[1],
            isVideo: matches[2] === 'true'
        };
    });
    currentPosition = 0;
    updateCarouselState();
    updateContent();
}

function moveCarousel(direction) {
    if (!currentDepartment || contentArray.length === 0) return;
    
    const items = document.querySelectorAll(`#detail-modal-${currentDepartment} .carousel-item`);
    const maxPosition = items.length - 1;
    
    currentPosition = Math.max(0, Math.min(maxPosition, currentPosition + direction));
    
    updateCarouselState();
    updateContent();
}

function updateCarouselState() {
    const items = document.querySelectorAll(`#detail-modal-${currentDepartment} .carousel-item`);
    items.forEach((item, index) => {
        if (index === currentPosition) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function updateContent() {
    const content = contentArray[currentPosition];
    const mainContainer = document.querySelector(`#detail-modal-${currentDepartment} #main-content-container`);
    
    if (content.isVideo) {
        const video = document.createElement('video');
        video.id = 'main-content';
        video.controls = true;
        video.autoplay = true;
        video.innerHTML = `<source src="${content.path}" type="video/mp4">`;
        mainContainer.innerHTML = '';
        mainContainer.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.id = 'main-content';
        img.src = content.path;
        img.alt = 'Vista principal';
        mainContainer.innerHTML = '';
        mainContainer.appendChild(img);
    }
}

document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const departmentId = this.getAttribute('data-department');
        const modal = document.getElementById(`detail-modal-${departmentId}`);
        modal.classList.remove('hidden');
        initializeCarousel(departmentId);
    });
});

function closeModal(departmentId) {
    const modal = document.getElementById(`detail-modal-${departmentId}`);
    modal.classList.add('hidden');
    currentDepartment = '';
    contentArray = [];
}


