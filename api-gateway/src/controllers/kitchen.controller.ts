import { parseRequestBody } from '../shared/utils/http.utils';
import { sendResponse } from '../shared/utils/http.utils';
import { sendOrderToKitchen } from '../shared/services/rabbitmq.service';
import { IncomingMessage, ServerResponse } from 'http';
import { logError, logInfo } from '../shared/utils/logs.utils';
import { orderSchema } from '../validations/kitchen-order.schemas';

export async function kitchenOrderController(req: IncomingMessage, res: ServerResponse) {
    try {
        const data = await parseRequestBody(req);
        await orderSchema.validate(data, { abortEarly: false });

        sendOrderToKitchen(data);
        logInfo('Pedido enviado a kitchen-ms:', data.orders);
        sendResponse({res, status: 200, data: { status: 'OK', message: 'Pedido enviado a kitchen-ms' }});

    } catch (err: any) {
        logError('Error en kitchenOrderController:', err.message);
        const status = err.name === 'ValidationError' || err.message === 'JSON inválido' ? 400 : 500;
        const message = err.message || 'Error interno del servidor';
        sendResponse({res, status, data: { error: { message } }});
    }
}


export async function getKitchenRecipesController(req: IncomingMessage, res: ServerResponse) {
    try {
        const data = await parseRequestBody(req);
        await orderSchema.validate(data, { abortEarly: false });
        sendResponse({res, status: 200, data: [{},{}]});
    } catch (err: any) {
        logError('Error en getKitchenRecipesController:', err.message);
        const status = err.name === 'ValidationError' || err.message === 'JSON inválido' ? 400 : 500;
        const message = err.message || 'Error interno del servidor';
        sendResponse({res, status, data: { error: { message } }});
    }
}




