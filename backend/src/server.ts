import express, { NextFunction, Request, Response } from 'express';
import { createWebhook } from './bot';

const app = express();

export const startApp = async () => {
    const botMiddleware = await createWebhook()

    app.use(botMiddleware);

    app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
        console.log({err})
        res.status(200);
      })

    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    });
}	