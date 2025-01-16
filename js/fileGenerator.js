export const createProjectFile = async (propertyData) => {
    try {
        const template = generateHTMLTemplate(propertyData);
        
        // Crear un Blob con el contenido HTML
        const blob = new Blob([template], { type: 'text/html' });
        
        // Crear URL para el blob
        const url = window.URL.createObjectURL(blob);
        
        // Crear un elemento <a> temporal
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${propertyData.urlSlug}.html`;
        
        // Simular click para descargar
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // Limpiar
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Error al crear archivo:', error);
        throw error;
    }
};

function generateHTMLTemplate(propertyData) {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POLYLINE - ${propertyData.name}</title>
    <link rel="icon" href="/Resource/Logo/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <!-- EmailJS -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <script>
        (function() {
            emailjs.init("At9dqPbCCCXcMSTls");
        })();
    </script>
</head>
<body>
    <!-- Header y navegación estándar -->
    <!-- ... -->

    <section id="inicio" class="property-showcase">
        <div class="image-gallery">
            <div class="image-slider" id="propertyImages">
                <!-- Las imágenes se cargarán dinámicamente -->
            </div>
            <!-- ... -->
        </div>

        <div class="property-details">
            <h2 class="property-title">${propertyData.name}</h2>
            <div class="property-info">
                <p><i class="fas fa-ruler-combined"></i> ${propertyData.squareMeters} m²</p>
                <p><i class="fas fa-bed"></i> ${propertyData.bedrooms} Dormitorios</p>
                <p><i class="fas fa-bath"></i> ${propertyData.bathrooms} Baños</p>
                <p><i class="fas fa-map-marker-alt"></i> ${propertyData.location}</p>
            </div>
            <div class="property-description">
                <p>${propertyData.description || ''}</p>
            </div>
            <button class="contact-now-btn" onclick="openContactModal()">
                Contactar ahora
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    </section>

    <!-- Modal de contacto y scripts estándar -->
    <!-- ... -->

    <script>
        // Código específico de la propiedad
        const propertyId = '${propertyData.urlSlug}';
        // ... resto del código JS ...
    </script>
</body>
</html>`;
}
