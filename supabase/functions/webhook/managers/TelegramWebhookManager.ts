import { TelegramUpdateObject } from "../entities/TelegramMessage.ts";
import { WebhookResponse } from "../entities/WebhookRespose.ts";

export class TelegramWebhookManager {
  async handle(message: TelegramUpdateObject): Promise<WebhookResponse> {
    console.log('TelegramWebhookManager', message)
    return { message: 'ok' };
  }
}