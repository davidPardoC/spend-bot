import { Context, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Update } from "telegraf/typings/core/types/typegram";
import { BaseHandler } from "./BaseHandler";

export class BotHandler extends BaseHandler {
    bot: Telegraf<Context<Update>>;

    constructor(bot: Telegraf<Context<Update>>) {
        super();
        this.bot = bot;
    }

    start() {
        this.handleHelpCommand();
        this.handleTextMessage();
        this.handlePhotoMessage();
        this.handleError();
    }

    private handleTextMessage() {
        this.bot.on(message("text"), async (ctx) => {
            await this.verifyUser(ctx.from.id);
            ctx.reply("Hello baby!");
        });
    }

    private handlePhotoMessage() {
        this.bot.on(message("photo"), async (ctx) => {
            await this.verifyUser(ctx.from.id);
            const url = await ctx.telegram.getFileLink(
                ctx.message.photo[ctx.message.photo.length - 1].file_id,
            );
            return ctx.reply("Hello baby -> Photo");
        });
    }

    private handleHelpCommand() {
        this.bot.command("help", (ctx) => ctx.reply("Help command"));
    }

    private handleError() {
        this.bot.catch((err, ctx) => {
            console.log(
                `Ooops, encountered an error for ${ctx.updateType}`,
                err,
            );
            ctx.reply("Ooops, encountered an error");
        });
    }
}
