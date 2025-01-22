import { supabaseClient } from "../supabase/SupabaseClient.ts";

export class ProfileRepository {
    async getByTelegramId(telegramId: number) {
        const { data } = await supabaseClient.from("profiles").select("*").eq(
            "telegram_id",
            telegramId,
        ).single();

        return data;
    }

    async createProfile(telegramId: number) {
        const { data, error } = await supabaseClient.from("profiles").insert({
            telegram_id: telegramId,
        }).select().single();

        if (error) {
            throw error;
        }

        return data;
    }
}
