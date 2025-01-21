import { TelegramUpdateObject } from "../entities/TelegramMessage.ts";

export class TelegramWebhookManager {
  async handle(message: TelegramUpdateObject): Promise<void> {
    console.log('TelegramWebhookManager', message)
  }
}