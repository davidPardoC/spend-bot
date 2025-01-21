import { Request, Response } from "npm:@types/express@4.17.15";
import process from "node:process";

export class TelegramWebhookController {

  handleHealthCheck(_req: Request, res:Response){
    const status = {
      status: "ok",
      uptime: process.uptime(),
      message: "Healthy",
    }
    res.json(status);
  }

  handleWebhook(_req: Request, res:Response){
    res.send("Welcome to the Dinosaur API!");
  }
}