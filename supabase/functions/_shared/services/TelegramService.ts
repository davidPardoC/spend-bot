import { TelegramFileResponse } from "../entities/Telegram.ts";
import { supabaseClient } from "../supabase/SupabaseClient.ts";

export class TelegramService {
    botToken: string = Deno.env.get("TELEGRAM_TOKEN") || "";

    async sendTextMessage(chatId: number, text: string) {
        const url: string =
            `https://api.telegram.org/bot${this.botToken}/sendMessage`;

        const body = {
            chat_id: chatId,
            text: text,
        };

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    async downloadPhoto(fileId: string) {
        const body = { file_id: fileId };

        const response = await fetch(
            `https://api.telegram.org/bot${this.botToken}/getFile`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            },
        );

        const bodyJson: TelegramFileResponse = await response.json();

        const downloadUrl =
            `https://api.telegram.org/file/bot${this.botToken}/${bodyJson.result.file_path}`;

        try {
            const res = await fetch(downloadUrl);
            if (!res.body) {
                throw new Error("No body in response");
            }
            const uploadPath = "/tmp/" +
                bodyJson.result.file_path.split("/")[1];
            console.log("Downloading file to", uploadPath);
            await Deno.writeFile(uploadPath, res.body);
            console.log("File downloaded to", res.body);
            const file = await Deno.open(uploadPath);
            const { data, error } = await supabaseClient.storage.from(
                "invoices",
            ).upload(
                bodyJson.result.file_path,
                file.readable,
            );

            console.log(data);

            if (error) {
                throw error;
            }

        } catch (error) {
            console.log(error);
        }
    }
}
