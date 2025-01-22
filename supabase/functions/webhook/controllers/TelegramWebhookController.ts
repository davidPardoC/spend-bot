import { Request, Response } from "npm:@types/express@4.17.15";
import process from "node:process";
import { TelegramWebhookManager } from "../managers/TelegramWebhookManager.ts";

export class TelegramWebhookController {

  constructor(private telegramManager: TelegramWebhookManager) {}

  handleHealthCheck(_req: Request, res:Response){
    const status = {
      status: "ok",
      uptime: process.uptime(),
      message: "Healthy",
    }
    res.json(status);
  }

  async  handleWebhook(_req: Request, res:Response){
    const message:any = {}
    await this.telegramManager.handle(message);
    res.send("Welcome to the Dinosaur API!");
  }
}