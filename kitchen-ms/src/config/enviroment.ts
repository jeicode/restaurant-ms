import 'dotenv/config';
import { get } from 'env-var';

export const environment = {
    RABBITMQ_URL: get('RABBITMQ_URL').required().asString()
}