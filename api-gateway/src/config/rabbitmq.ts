import amqp from 'amqplib';
import { environment } from './enviroment';
import { logError, logInfo } from '../shared/utils/logs.utils';


const RABBITMQ_URL = environment.RABBITMQ_URL;
let channel: amqp.Channel

type RabbitMQOptions = {
    QUEUE_NAME: string;
};
export async function setupRabbitMQ({QUEUE_NAME}: RabbitMQOptions) {
    try {
      const connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue(QUEUE_NAME, { durable: true });
      logInfo('Conectado a RabbitMQ');
    } catch (err) {
      logError('❌ Error conectando a RabbitMQ:', err);
      process.exit(1);
    }
}
export { channel }