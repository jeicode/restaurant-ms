// src/consumer.ts en order-management-ms
import amqp from 'amqplib';
import { environment } from './config/enviroment';
import { ORDER_QUEUE_NAME } from './constants/raabitmq.constants';

const RABBITMQ_URL = environment.RABBITMQ_URL;

export async function consumeOrders() {
  try {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(ORDER_QUEUE_NAME, { durable: true });
    console.log('📦 Esperando pedidos...');

    channel.consume(ORDER_QUEUE_NAME, (msg) => {
      if (msg !== null) {
        const order = JSON.parse(msg.content.toString());
        console.log('✅ Pedido recibido:', order);
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('❌ Error al consumir pedidos:', err);
  }
}