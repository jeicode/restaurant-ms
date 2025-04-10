
import http from 'http';
import { setupRabbitMQ } from './config/rabbitmq';
import { kitchenOrderController } from './controllers/kitchen-order.controller';
import { contentType } from './constants/http';

const QUEUE_NAME = 'kitchen_orders';
type ServerOptions = {
    PORT: number;
};
export function runServer({ PORT }: ServerOptions) {
    const server = http.createServer(async (req, res) => {
        if (req.method === 'POST' && req.url === '/kitchen/order') {
            return kitchenOrderController(req, res);
        }
        res.writeHead(404, contentType);
        res.end(JSON.stringify({ error: 'Not Found' }));
    });

    setupRabbitMQ({ QUEUE_NAME }).then(() => {
        server.listen(PORT, () => {
            console.log(`API Gateway escuchando en http://localhost:${PORT}`);
        });
    });
}
