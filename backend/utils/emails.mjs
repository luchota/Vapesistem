import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text, attachment) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // O el servicio de correo que prefieras
        auth: {
            user: 'vashop.resistencia@gmail.com',
            pass: 'Cangallo617'
        }
    });

    const mailOptions = {
        from: 'vashop.resistencia@gmail.com',
        to: 'lucianotorre43@gmail.com',
        subject: 'Reportes',
        text,
        attachments: [{
            filename: 'reporte.pdf',
            content: attachment,
            contentType: 'application/pdf'
        }]
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
};
