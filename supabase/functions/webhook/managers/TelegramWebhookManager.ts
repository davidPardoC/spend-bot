import { TelegramPhoto, TelegramUpdateObject } from "../entities/TelegramUpdateObject.ts";
import { WebhookResponse } from "../entities/WebhookRespose.ts";
import { ProfileRepository } from "../../_shared/repositories/ProfileRepository.ts";
import { TelegramService } from "../../_shared/services/TelegramService.ts";
import localeEn from "../../_shared/locales/en.json" with { type: "json" };

export class TelegramWebhookManager {
  constructor(
    private telegramService: TelegramService,
    private profileRepo: ProfileRepository,
  ) {}

  async handle(message: TelegramUpdateObject): Promise<WebhookResponse> {

    const profile = await this.profileRepo.getByTelegramId(
      message.message.from.id,
    );

    if (!profile) {
      this.handleNewUser(message.message.from.id);
    }

    if (this.isPhotoMessage(message)) {
      const lastPhoto = (message.message.photo as TelegramPhoto[]).pop() as TelegramPhoto;

      const res = await this.telegramService.downloadPhoto(lastPhoto.file_id);
      console.log(res);
      await this.telegramService.sendTextMessage(
        message.message.from.id,
        localeEn.photo_received,
      );
    }

    return { message: "ok" };
  }

  private async handleNewUser(telegramChatId: number) {
    const profile = await this.profileRepo.createProfile(telegramChatId);

    if (profile.telegram_id) {
      await this.telegramService.sendTextMessage(
        profile.telegram_id,
        localeEn.new_user,
      );
    }
  }

  private isPhotoMessage(message: TelegramUpdateObject): boolean {
    if (message.message.photo && message.message.photo.length > 0) {
      return true;
    }
    return false;
  }
}
