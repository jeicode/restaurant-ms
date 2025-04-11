import amqp from 'amqplib';
import { environment } from './config/enviroment';
import { ORDER_HISTORY_QUEUE_NAME } from './constants/raabitmq.constants';
import { logError, logInfo } from './shared/utils/logs.utils';

const RABBITMQ_URL = environment.RABBITMQ_URL;

export async function consumeOrderHistory() {
  try {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(ORDER_HISTORY_QUEUE_NAME, { durable: true });
    logInfo('📦 Esperando historial de pedidos...');

    channel.consume(ORDER_HISTORY_QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString());
        logInfo('✅ Guardando pedido al historial:', order);
        channel.ack(msg);
      }
    });
  } catch (err) {
    logError('Error al consumir el historial:', err);
  }
}