
import http from 'http';
import { setupRabbitMQ } from './config/rabbitmq';
import { getKitchenRecipesController, getRecipeIngredientController } from './controllers/kitchen.controller';
import { ORDER_QUEUE_NAME } from './constants/raabitmq.constants';
import { contentType } from './constants/http.constants';
import { parse } from 'url';

type ServerOptions = {
    PORT: number;
};
export function runServer({ PORT }: ServerOptions) {
    const server = http.createServer(async (req, res) => {
        const parsedUrl = parse(req.url || '', true); // el `true` parsea los query params automáticamente
        const pathname = parsedUrl.pathname;

        if (req.method === 'GET' && pathname === '/kitchen/recipes') {
            return getKitchenRecipesController(req, res);
        }
        if (req.method === 'GET' && pathname === '/kitchen/recipe-ingredients') {
            return getRecipeIngredientController(req, res);
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
