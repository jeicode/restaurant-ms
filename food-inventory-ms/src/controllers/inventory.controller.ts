import { IncomingMessage, ServerResponse } from "http";
import { sendResponse } from "../shared/utils/http.utils";
import { logError } from "../shared/utils/logs.utils";
import { orm } from "../config/orm";


export async function getIngredientsController(req: IncomingMessage, res: ServerResponse) {
    try {
        const data = await orm.ingredient.findMany();
        sendResponse({res, status: 200, data: {data}});
    } catch (err: any) {
        logError('Error en getIngredientsController:', err.message);
        const status = err.name === 'ValidationError' || err.message === 'JSON inválido' ? 400 : 500;
        const message = err.message || 'Error interno del servidor';
        sendResponse({res, status, data: { error: { message } }});
    }
}
