import {
    TextractClient,
    DetectDocumentTextCommand,
    DetectDocumentTextCommandInput,
} from "npm:@aws-sdk/client-textract";
import { pino } from "npm:pino";

export class TextExtractService {
    textract = new TextractClient({ region: "us-east-1" });
    Logger = pino();

    async extractText(
        imagePath:string,
    ): Promise<any> {
        const input: DetectDocumentTextCommandInput = {
            Document: {
               S3Object: {
                Bucket: "spend-bot-invoices",
                Name: imagePath,
               }
            }
        };

        const command = new DetectDocumentTextCommand(input);

        const response = await this.textract.send(command);

        console.log(response);
    }
}
