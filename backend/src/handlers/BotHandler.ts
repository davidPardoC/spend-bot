import { Context, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Update } from "telegraf/typings/core/types/typegram";

export class BotHandler {
    bot: Telegraf<Context<Update>>

    constructor(bot: Telegraf<Context<Update>>) {
        this.bot = bot;
    }

    start() {
        this.handleHelpCommand();
        this.handleTextMessage();
        this.handlePhotoMessage();
    }

    private handleTextMessage() {
        this.bot.on(message("text"), ctx => ctx.reply("Hello baby!"));
    }

    private handlePhotoMessage() {
        this.bot.on(message("photo"), async ctx => {
            const url = await ctx.telegram.getFileLink(ctx.message.photo[ctx.message.photo.length - 1].file_id);
            console.log({ url });
            return ctx.reply("Hello baby -> Photo");
        });
    }

    private handleHelpCommand() {
        this.bot.command("help", ctx => ctx.reply("Help command"));
    }
}