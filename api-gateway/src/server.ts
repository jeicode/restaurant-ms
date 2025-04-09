
import http from 'http';
import { channel, setupRabbitMQ } from './config/rabbitmq';

const contentType = { 'Content-Type': 'application/json' }
const QUEUE_NAME = 'kitchen_orders';
type ServerOptions = {
    PORT: number;
};
export function runServer({ PORT }: ServerOptions) {
    const server = http.createServer(async (req, res) => {
        if (req.method === 'POST' && req.url === '/kitchen/order') {
            let body = '';
            req.on('data', chunk => (body += chunk));
            req.on('end', async () => {
                try {
                    const message = JSON.stringify(JSON.parse(body));
                    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
                    console.log('[>] Pedido enviado a kitchen:', message);
                    res.writeHead(200, contentType);
                    res.end(JSON.stringify({ status: 'OK', message: 'Pedido enviado a kitchen-ms' }));
                } catch (err) {
                    console.error('❌ Error al publicar mensaje:', err);
                    res.writeHead(500, contentType);
                    res.end(JSON.stringify({ error: 'Error al enviar pedido a kitchen-ms' }));
                }
            });
        } else {
            res.writeHead(404, contentType);
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    });

    setupRabbitMQ({QUEUE_NAME}).then(() => {
        server.listen(PORT, () => {
            console.log(`API Gateway escuchando en http://localhost:${PORT}`);
        });
    });
}
