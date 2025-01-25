import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { BotHandler } from "./handlers/BotHandler";

dotenv.config();

export const createWebhook = async () => {
    const token = process.env.TELEGRAM_TOKEN || "";
    const webhookDomain = process.env.WEBHOOK_DOMAIN || "";
    const bot = new Telegraf(token);

    const handlers = new BotHandler(bot);

    handlers.start();

    return bot.createWebhook({ domain: webhookDomain });
}