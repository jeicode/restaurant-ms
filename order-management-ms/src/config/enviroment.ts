import 'dotenv/config';
import { get } from 'env-var';

export const environment = {
    PORT: get('PORT').required().asPortNumber(),
}