import 'dotenv/config'
import { get } from 'env-var'


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    JWT_SEED: get('JWT_SEED').required().asString(),
    INSERT_NOTIFICATION_URL: get('INSERT_NOTIFICATION_URL').required().asString(),
}