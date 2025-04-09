import http from 'http';
import { channel } from '../config/rabbitmq';
import { orderSchema } from '../validations/kitchen-order.schemas';

const QUEUE_NAME = 'kitchen_orders';
const contentType = { 'Content-Type': 'application/json' }

export const kitchenOrderController = (req: http.IncomingMessage, res: http.ServerResponse) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        try {
            const parsed = JSON.parse(body);

            // Validación con Yup
            await orderSchema.validate(parsed, { abortEarly: false });

            const message = JSON.stringify(parsed);
            channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
            console.log('[>] Pedido enviado a kitchen:', message);

            res.writeHead(200, contentType);
            res.end(JSON.stringify({ status: 'OK', message: 'Pedido enviado a kitchen-ms' }));

        } catch (err: any) {
            console.error('❌ Error al procesar pedido:', err.message);

            if (err.name === 'ValidationError') {
                res.writeHead(400, contentType);
                return res.end(JSON.stringify({
                    error: { message: err.message },
                }));
            }

            res.writeHead(500, contentType);
            res.end(JSON.stringify({
                error: { message: 'Error interno del servidor' },
            }));
        }
    });
};
