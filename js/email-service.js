import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

// Reemplaza 'TU_USER_ID_DE_EMAILJS' con tu Public Key
emailjs.init("At9dqPbCCCXcMSTls");

export const sendPropertyInquiry = async (formData, propertyTitle) => {
    try {
        const templateParams = {
            to_name: 'Polyline',
            property_title: propertyTitle,
            from_name: formData.name,
            from_email: formData.email,
            from_phone: formData.phone,
            message: `Nueva consulta sobre ${propertyTitle}`
        };

        const response = await window.emailjs.send(
            "service_nmqdl9u", 
            "template_xzgzp8p",
            templateParams
        );

        console.log('Email enviado:', response);
        return { success: true };
    } catch (error) {
        console.error('Error al enviar email:', error);
        return { success: false, error: error.message };
    }
};
