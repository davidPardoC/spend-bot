import { Buffer } from "node:buffer";
import { Textract } from "npm:aws-sdk";

export class TextExtractService {
    textract = new Textract();

    extractText(image: Buffer): Promise<Textract.DetectDocumentTextResponse> {
        return new Promise((resolve, reject) => {
            this.textract.detectDocumentText({ Document: { Bytes: image } }).send((err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(data);
           });
        });
    }

}
