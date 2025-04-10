import { channel } from "../../config/rabbitmq";
import { ORDER_QUEUE_NAME } from '../../constants/raabitmq.constants';

export function sendOrderToKitchen(message: object) {
    const buffer = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(ORDER_QUEUE_NAME, buffer, { persistent: true });
}