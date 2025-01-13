// Configuración de las APIs
const googleClientId = 'TU_GOOGLE_CLIENT_ID'; // Reemplazar con tu ID de cliente
const facebookAppId = 'TU_FACEBOOK_APP_ID'; // Reemplazar con tu App ID

// Inicializar Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
    });
};

// Función para manejar la respuesta de Google
function handleGoogleResponse(response) {
    const credential = response.credential;
    const decodedToken = JSON.parse(atob(credential.split('.')[1]));
    
    showSocialLoginForm(
        'Google',
        decodedToken.email,
        '/Login/Logos/google-icon.png'
    );
}

// Inicializar Google Sign In
function initializeGoogle() {
    google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleResponse
    });

    const googleBtn = document.getElementById('googleBtn');
    googleBtn.addEventListener('click', () => {
        google.accounts.id.prompt();
    });
}

// Función para login con Facebook
function handleFacebookLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            FB.api('/me', {fields: 'email'}, function(userData) {
                showSocialLoginForm(
                    'Facebook',
                    userData.email,
                    '/Login/Logos/facebook-icon.png'
                );
            });
        } else {
            console.log('Usuario canceló el login o no autorizó la aplicación.');
        }
    }, {scope: 'public_profile,email'});
}

function showSocialLoginForm(provider, email, iconSrc) {
    const loginForm = document.getElementById('loginForm');
    const socialForm = document.getElementById('socialLoginForm');
    const socialTitle = document.getElementById('socialLoginTitle');
    const socialEmail = document.getElementById('socialLoginEmail');
    const providerIcon = document.getElementById('socialProviderIcon');

    // Actualizar contenido
    socialTitle.textContent = `Iniciando sesión con ${provider}`;
    socialEmail.textContent = email;
    providerIcon.src = iconSrc;

    // Cambiar formularios con animación
    loginForm.style.display = 'none';
    socialForm.style.display = 'block';
    setTimeout(() => {
        socialForm.classList.add('fade-in');
    }, 10);
}

document.addEventListener('DOMContentLoaded', () => {
    // Animación del logo y título
    anime.timeline({
        easing: 'easeOutExpo',
    })
    .add({
        targets: '.login-logo',
        scale: [0, 1],
        rotate: '1turn',
        duration: 1200,
        opacity: [0, 1]
    })
    .add({
        targets: '.company-name',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        delay: 100,
        complete: function(anim) {
            document.querySelector('.company-name').classList.add('gradient-animation');
        }
    });

    // Inicializar Google Sign In
    initializeGoogle();
    
    // Animación inicial de las formas geométricas
    anime({
        targets: '.shape',
        scale: [0, 1],
        rotate: [45, 0],
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(200),
        easing: 'easeOutElastic(1, .8)'
    });

    // Animación del contenido del login
    anime({
        targets: '.login-content',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 500,
        easing: 'easeOutCubic'
    });

    // Animación hover del botón
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('mouseenter', () => {
        anime({
            targets: '.btn-line',
            scaleX: [0, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });

    loginBtn.addEventListener('mouseleave', () => {
        anime({
            targets: '.btn-line',
            scaleX: [1, 0],
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });

    // Manejo del formulario
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animación al enviar
        anime({
            targets: '.login-btn',
            scale: [1, 0.95, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });

        // Aquí iría la lógica de autenticación
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log('Intento de login:', { email, password });
    });

    // Manejar el botón de continuar
    document.getElementById('continueWithSocial').addEventListener('click', () => {
        // Aquí irá la lógica de autenticación final
        console.log('Continuando con login social...');
        // Ejemplo: window.location.href = '/dashboard';
    });

    // Manejar el botón de volver
    document.getElementById('backToLogin').addEventListener('click', () => {
        const loginForm = document.getElementById('loginForm');
        const socialForm = document.getElementById('socialLoginForm');
        
        socialForm.classList.remove('fade-in');
        socialForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
});
