import { db } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    getDocs,
    query,
    orderBy,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { createProjectFile } from './fileGenerator.js';

// Funciones para manejar inmuebles
export const propertyService = {
    // Obtener todos los inmuebles
    getAllProperties: async () => {
        try {
            const q = query(
                collection(db, "properties"),
                orderBy("name", "asc")
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error getting properties:", error);
            throw error;
        }
    },

    // Verificar disponibilidad del URL Slug
    checkUrlSlugAvailability: async (urlSlug) => {
        try {
            const querySnapshot = await getDocs(collection(db, "properties"));
            return !querySnapshot.docs.some(doc => doc.data().urlSlug === urlSlug);
        } catch (error) {
            console.error("Error checking URL slug:", error);
            throw error;
        }
    },

    // Añadir nuevo inmueble
    addProperty: async (propertyData) => {
        try {
            // 1. Primero guardar en Firebase
            const formattedData = {
                name: propertyData.name,
                squareMeters: parseInt(propertyData.squareMeters),
                bedrooms: parseInt(propertyData.bedrooms),
                bathrooms: parseInt(propertyData.bathrooms),
                location: propertyData.location,
                type: propertyData.type,
                urlSlug: propertyData.urlSlug,
                description: propertyData.description,
                images: propertyData.images || [],
                createdAt: new Date().toISOString(),
                details: {
                    url: `/PROYECTOS/${propertyData.urlSlug}.html`
                }
            };

            // Verificar si el urlSlug ya existe
            const querySnapshot = await getDocs(collection(db, "properties"));
            const exists = querySnapshot.docs.some(doc => 
                doc.data().urlSlug === propertyData.urlSlug
            );

            if (exists) {
                throw new Error('Ya existe un inmueble con ese URL Slug');
            }

            // 2. Guardar en Firebase
            const docRef = await addDoc(collection(db, "properties"), formattedData);
            
            // 3. Generar el HTML
            const htmlContent = generatePropertyHTML({
                ...formattedData,
                id: docRef.id
            });

            // Crear y descargar el archivo
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = window.URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `${propertyData.urlSlug}.html`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(url);

            return { success: true, id: docRef.id, data: formattedData };
        } catch (error) {
            console.error("Error en addProperty:", error);
            throw error;
        }
    },

    // Actualizar inmueble existente
    updateProperty: async (propertyId, propertyData) => {
        try {
            const propertyRef = doc(db, "properties", propertyId);
            await updateDoc(propertyRef, propertyData);
            return { id: propertyId, ...propertyData };
        } catch (error) {
            console.error("Error updating property:", error);
            throw error;
        }
    },

    // Eliminar inmueble
    deleteProperty: async (propertyId) => {
        try {
            await deleteDoc(doc(db, "properties", propertyId));
            return true;
        } catch (error) {
            console.error("Error deleting property:", error);
            throw error;
        }
    },

    // Obtener un inmueble específico
    getPropertyById: async (propertyId) => {
        try {
            const docRef = doc(db, "properties", propertyId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            throw new Error("Property not found");
        } catch (error) {
            console.error("Error getting property:", error);
            throw error;
        }
    }
};

// Función auxiliar para generar el HTML
function generatePropertyHTML(propertyData) {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POLYLINE - ${propertyData.name}</title>
    <link rel="icon" href="/Resource/Logo/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/property.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
</head>
<body>
    <!-- Header -->
    <header>
        <!-- ... copiar el header estándar ... -->
    </header>

    <main class="property-detail">
        <div class="property-container">
            <div class="image-gallery">
                ${propertyData.images.map((img, index) => `
                    <img src="${img}" alt="${propertyData.name} - Vista ${index + 1}" 
                         class="property-image ${index === 0 ? 'active' : ''}"
                         loading="lazy">
                `).join('')}
            </div>
            
            <div class="property-info">
                <h1>${propertyData.name}</h1>
                <div class="property-stats">
                    <span><i class="fas fa-ruler-combined"></i> ${propertyData.squareMeters}m²</span>
                    <span><i class="fas fa-bed"></i> ${propertyData.bedrooms} Dormitorios</span>
                    <span><i class="fas fa-bath"></i> ${propertyData.bathrooms} Baños</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${propertyData.location}</span>
                </div>
                <div class="property-description">
                    <p>${propertyData.description}</p>
                </div>
                <button class="contact-button" onclick="openContactModal()">
                    Contactar ahora
                </button>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <!-- ... copiar el footer estándar ... -->
    </footer>

    <script src="/js/property-detail.js"></script>
</body>
</html>`;
}
