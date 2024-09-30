import PDFDocument from 'pdfkit';
import fs from 'fs';
import { pool } from '..db.mjs'; // Configuración de la conexión a la base de datos

// Función para manejar la solicitud de mercadería
export const solicitarMercaderia = async (req, res) => {
    const { solicitudes } = req.body;

    // Log de las solicitudes recibidas
    console.log('Solicitud recibida para mercadería:', solicitudes);

    try {
        // Crear un registro en la base de datos para cada solicitud
        for (const solicitud of solicitudes) {
            const { producto_id, cantidad, nombre } = solicitud;
            await pool.query(
                'INSERT INTO solicitudes_mercaderia (producto_id, cantidad, nombre_producto) VALUES ($1, $2, $3)',
                [producto_id, cantidad, nombre]
            );
        }

        // Generar el PDF del remito
        const doc = new PDFDocument();
        const fileName = `remito_${Date.now()}.pdf`;
        const filePath = `./remitos/${fileName}`;

        doc.pipe(fs.createWriteStream(filePath));

        // Añadir contenido al PDF
        doc.fontSize(20).text('Remito de Solicitud de Mercadería', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text('Productos Solicitados:', { align: 'left' });

        solicitudes.forEach((solicitud, index) => {
            doc.text(`${index + 1}. Producto: ${solicitud.nombre} - Cantidad: ${solicitud.cantidad}`);
        });

        doc.moveDown();
        doc.text(`Fecha de solicitud: ${new Date().toLocaleString()}`);
        doc.end();

        // Esperar hasta que el PDF se haya generado y luego responder con el enlace de descarga
        doc.on('finish', () => {
            res.status(200).json({
                message: 'Solicitud procesada correctamente',
                pdf_url: `http://localhost:5000/remitos/${fileName}` // Enlace al PDF generado
            });
        });

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};
