// src/consumer.ts en order-management-ms
import amqp from 'amqplib';
import { environment } from './config/enviroment';

const RABBITMQ_URL = environment.RABBITMQ_URL;
const QUEUE = 'kitchen_orders';

export async function consumeOrders() {
  try {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    console.log('📦 Esperando pedidos...');

    channel.consume(QUEUE, (msg) => {
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