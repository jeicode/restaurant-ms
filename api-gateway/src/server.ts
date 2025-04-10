
import http from 'http';
import { setupRabbitMQ } from './config/rabbitmq';
import { getKitchenRecipesController, kitchenOrderController } from './controllers/kitchen.controller';
import { contentType } from './constants/http.constants';
import { ORDER_QUEUE_NAME } from './constants/raabitmq.constants';

type ServerOptions = {
    PORT: number;
};
export function runServer({ PORT }: ServerOptions) {
    const server = http.createServer(async (req, res) => {
        if (req.method === 'POST' && req.url === '/kitchen/order') {
            return kitchenOrderController(req, res);
        }
        if (req.method === 'GET' && req.url === '/kitchen/recipes') {
            return getKitchenRecipesController(req, res);
        }
        res.writeHead(404, contentType);
        res.end(JSON.stringify({ error: 'Not Found' }));
    });

    setupRabbitMQ({ QUEUE_NAME: ORDER_QUEUE_NAME }).then(() => {
        server.listen(PORT, () => {
            console.log(`API Gateway escuchando en http://localhost:${PORT}`);
        });
    });
}
