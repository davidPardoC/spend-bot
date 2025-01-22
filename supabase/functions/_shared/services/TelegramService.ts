export class TelegramService {
    url: string = `https://api.telegram.org/bot${Deno.env.get('TELEGRAM_TOKEN')}/sendMessage`

    async sendTextMessage(chatId: number, text: string) {
        const body = {
            chat_id: chatId,
            text: text
        }

        await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

}