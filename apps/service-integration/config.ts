import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.join(process.cwd(), `apps/service-integration/.env`),
});

export default () => ({
    webhook: {
        baseUrl: process.env.WEBHOOK_BASE_URL,
    },
});
