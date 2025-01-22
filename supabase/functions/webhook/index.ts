// @ts-types="npm:@types/express@4.17.15"
import express from "npm:express@4.18.2";
import { telegramWebhookController } from "./controllers/index.ts";

const app = express();
app.use(express.json())


app.get("/webhook/health", telegramWebhookController.handleHealthCheck.bind(telegramWebhookController));

app.post("/webhook", telegramWebhookController.handleWebhook.bind(telegramWebhookController));

app.listen(3000);