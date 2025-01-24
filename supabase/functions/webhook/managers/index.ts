import { profileRepository } from "../../_shared/repositories/index.ts";
import {
  telegramService,
  textExtractService,
} from "../../_shared/services/index.ts";
import { TelegramWebhookManager } from "./TelegramWebhookManager.ts";

export const telegramManager = new TelegramWebhookManager(
  telegramService,
  profileRepository,
  textExtractService,
);
