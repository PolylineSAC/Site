const modal = document.getElementById('contactModal');
const closeBtn = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');

function openContactModal() {
    document.body.style.overflow = 'hidden';
    modal.style.display = 'block';
    
    // Animación del modal
    anime({
        targets: '.modal-content',
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 300,
        easing: 'easeOutCubic'
    });

    // Animación de los inputs
    anime({
        targets: '.form-group input',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
    });

    // Animación de las etiquetas
    anime({
        targets: '.form-group label',
        translateX: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {start: 200}),
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
    });

    // Animación del botón
    anime({
        targets: '.submit-btn',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: 600,
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
    });
}

// Añadir efectos de onda al hacer clic en los inputs
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', (e) => {
        anime({
            targets: e.target.parentElement.querySelector('::after'),
            scaleX: [0, 1],
            translateX: ['-100%', 0],
            duration: 300,
            easing: 'easeOutCubic'
        });
    });
});

// Mejorar la animación del botón de envío
document.querySelector('.submit-btn').addEventListener('mousemove', (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);
});

closeBtn.onclick = function() {
    document.body.style.overflow = '';
    anime({
        targets: '.modal-content',
        opacity: [1, 0],
        scale: [1, 0.9],
        duration: 300,
        easing: 'easeInCubic',
        complete: () => {
            modal.style.display = 'none';
        }
    });
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeBtn.onclick();
    }
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    
    // Animación de envío
    anime({
        targets: submitBtn,
        scale: [1, 0.9],
        duration: 150,
        easing: 'easeInOutQuad',
        complete: function() {
            anime({
                targets: submitBtn,
                scale: [0.9, 1],
                duration: 150,
                easing: 'easeInOutQuad'
            });
        }
    });
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        property: 'Casa de Playa del Golf 1'
    };

    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log('Datos del formulario:', formData);
    
    // Mostrar mensaje de éxito
    alert('Gracias por tu interés. Nos pondremos en contacto contigo pronto.');
    
    // Cerrar el modal
    closeBtn.onclick();
    
    // Limpiar el formulario
    contactForm.reset();
});
