import { telegramManager } from "../managers/index.ts";
import { TelegramWebhookController } from "./TelegramWebhookController.ts";

export const telegramWebhookController = new TelegramWebhookController(telegramManager);