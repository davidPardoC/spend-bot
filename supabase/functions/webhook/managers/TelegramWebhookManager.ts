import { TelegramUpdateObject } from "../entities/TelegramUpdateObject.ts";
import { WebhookResponse } from "../entities/WebhookRespose.ts";
import { ProfileRepository } from "../../_shared/repositories/ProfileRepository.ts";
import { TelegramService } from "../../_shared/services/TelegramService.ts";
import localeEn from '../../_shared/locales/en.json' with { type: "json" }

export class TelegramWebhookManager {
  constructor(private telegramService: TelegramService, private profileRepo: ProfileRepository) {}

  async handle(message: TelegramUpdateObject): Promise<WebhookResponse> {
    const profile = await this.profileRepo.getByTelegramId(
      message.message.from.id,
    );

    if (!profile) {
      const profile = await this.profileRepo.createProfile(message.message.from.id);

      if (profile.telegram_id) {
        await this.telegramService.sendTextMessage(profile.telegram_id, localeEn.new_user);
      }

    }

    return { message: "ok" };
  }
}
