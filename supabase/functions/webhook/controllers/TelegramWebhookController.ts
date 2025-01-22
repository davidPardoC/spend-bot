import { Request, Response } from "npm:@types/express@4.17.15";
import process from "node:process";
import { TelegramWebhookManager } from "../managers/TelegramWebhookManager.ts";
import { TelegramUpdateObject } from "../entities/TelegramMessage.ts";

export class TelegramWebhookController {
  constructor(private telegramManager: TelegramWebhookManager) {}

  handleHealthCheck(_req: Request, res: Response) {
    const status = {
      status: "ok",
      uptime: process.uptime(),
      message: "Healthy",
    };
    res.json(status);
  }

  async handleWebhook(req: Request, res: Response) {
    const response = await this.telegramManager.handle(
      req.body as TelegramUpdateObject,
    );
    res.json(response);
  }
}
