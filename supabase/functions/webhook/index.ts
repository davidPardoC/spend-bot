// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import { telegramWebhookController } from "./controllers/index.ts";

const app = express();


app.get("/webhook/health", telegramWebhookController.handleHealthCheck.bind(telegramWebhookController));

app.get("/webhook", telegramWebhookController.handleWebhook.bind(telegramWebhookController));

app.listen(3000);