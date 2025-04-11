
import http from 'http';
import { setupRabbitMQ } from './config/rabbitmq';
import { ORDER_QUEUE_NAME } from './constants/raabitmq.constants';
import { contentType } from './constants/http.constants';
import { parse } from 'url';
import { getIngredientsController } from './controllers/inventory.controller';

type ServerOptions = {
    PORT: number;
};
export function runServer({ PORT }: ServerOptions) {
    const server = http.createServer(async (req, res) => {
        const parsedUrl = parse(req.url || '', true); // el `true` parsea los query params automáticamente
        const pathname = parsedUrl.pathname;
        if (req.method === 'GET' && pathname === '/food-inventory/ingredients') {
            return getIngredientsController(req, res);
        }

        res.writeHead(404, contentType);
        res.end(JSON.stringify({ error: 'Not Found' }));
    });

    setupRabbitMQ({ QUEUE_NAME: ORDER_QUEUE_NAME }).then(() => {
        server.listen(PORT, () => {
            console.log(`Kithen API escuchando en http://localhost:${PORT}`);
        });
    });
}
