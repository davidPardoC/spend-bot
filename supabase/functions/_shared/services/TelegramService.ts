import { Buffer } from "node:buffer";
import { TelegramFileResponse } from "../entities/Telegram.ts";
import { pino } from "npm:pino";
import { Jimp } from "npm:jimp";
import AWS from "npm:aws-sdk";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";

export class TelegramService {
    botToken: string = Deno.env.get("TELEGRAM_TOKEN") || "";
    Logger = pino();
    s3 = new AWS.S3({ region: "us-east-1" });

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

    async downloadPhoto(fileId: string): Promise<string | undefined> {
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

            await Deno.writeFile(uploadPath, res.body);

            let outputPath = uploadPath.replace(".jpg", "");

            const image = await Jimp.read(uploadPath);

            await image.write(`${outputPath}.jpeg`);

            outputPath = `${outputPath}.jpeg`;

            const outputFile = readFileSync(outputPath);

            const awsS3Params = {
                Bucket: "spend-bot-invoices",
                Key: outputPath,
                Body: outputFile,
            };

            await new Promise((resolve, reject) => {
                this.s3.upload(
                    awsS3Params,
                    (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
                        if (err) {
                            reject(err);
                            console.error("Error uploading file:", err);
                        } else {
                            resolve(data);
                            console.log(
                                `File uploaded successfully. ${data.Location}`,
                            );
                        }
                    },
                );
            });

            return outputPath;
        } catch (error) {
            this.Logger.error(error);
            return;
        }
    }
}
