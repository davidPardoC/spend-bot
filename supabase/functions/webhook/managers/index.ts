import { profileRepository } from "../../_shared/repositories/index.ts";
import { telegramService } from "../../_shared/services/index.ts";
import { TelegramWebhookManager } from "./TelegramWebhookManager.ts";

export const telegramManager = new TelegramWebhookManager(
  telegramService,
  profileRepository,
);
