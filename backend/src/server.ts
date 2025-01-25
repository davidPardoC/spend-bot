import express from 'express';
import { createWebhook } from './bot';

const app = express();

export const startApp = async () => {
    const botMiddleware = await createWebhook()

    app.use(botMiddleware);

    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    });
}	