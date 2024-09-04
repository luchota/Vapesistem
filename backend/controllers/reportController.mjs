import { query } from '../db.mjs';
import { sendEmail } from '../utils/emails.mjs';
import PDFDocument from 'pdfkit';

// Función para generar el PDF del reporte de ventas
const generateSalesReportPDF = async () => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        return pdfData;
    });

    doc.text('Reporte de Ventas del Día');
    const ventas = await query('SELECT * FROM ventas WHERE DATE(fecha) = CURDATE()');

    ventas.forEach(venta => {
        doc.text(`Venta ID: ${venta.id}, Producto ID: ${venta.producto_id}, Cantidad: ${venta.cantidad}, Total: ${venta.total}, Fecha: ${venta.fecha}`);
    });

    doc.end();
};

// Función para generar el PDF del reporte de stock
const generateStockReportPDF = async () => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        return pdfData;
    });

    doc.text('Reporte de Stock del Día');
    const stocks = await query('SELECT * FROM stock WHERE DATE(fecha) = CURDATE()');

    stocks.forEach(stock => {
        doc.text(`Stock ID: ${stock.id}, Producto ID: ${stock.producto_id}, Cambio: ${stock.cambio_stock}, Motivo: ${stock.motivo}, Fecha: ${stock.fecha}`);
    });

    doc.end();
};

// Función para generar el PDF del reporte de transferencias
const generateTransferReportPDF = async () => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        return pdfData;
    });

    doc.text('Reporte de Transferencias del Día');
    const transferencias = await query('SELECT * FROM transferencias WHERE DATE(fecha) = CURDATE()');

    transferencias.forEach(transferencia => {
        doc.text(`Transferencia ID: ${transferencia.id}, Producto ID: ${transferencia.producto_id}, Cantidad: ${transferencia.cantidad}, Total: ${transferencia.total}, Destino: ${transferencia.destino}, Fecha: ${transferencia.fecha}`);
    });

    doc.end();
};

export const sendSalesReport = async (req, res) => {
    const { email, celular } = req.body;
    try {
        const salesReport = await generateSalesReportPDF();
        await sendEmail(email, 'Reporte de Ventas del Día', 'Adjunto el reporte de ventas del día', salesReport);
        res.json({ message: 'Reporte de ventas enviado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el reporte de ventas' });
    }
};

export const sendStockReport = async (req, res) => {
    const { email, celular } = req.body;
    try {
        const stockReport = await generateStockReportPDF();
        await sendEmail(email, 'Reporte de Stock del Día', 'Adjunto el reporte de stock del día', stockReport);
        res.json({ message: 'Reporte de stock enviado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el reporte de stock' });
    }
};

export const sendTransferReport = async (req, res) => {
    const { email, celular } = req.body;
    try {
        const transferReport = await generateTransferReportPDF();
        await sendEmail(email, 'Reporte de Transferencias del Día', 'Adjunto el reporte de transferencias del día', transferReport);
        res.json({ message: 'Reporte de transferencias enviado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el reporte de transferencias' });
    }
};
