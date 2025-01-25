import { supabaseClient } from "../supabase/SupabaseClient";

export class BaseHandler {
    async verifyUser(id: number): Promise<any> {
        const { data, error } = await supabaseClient.from("profiles").select()
            .eq("telegram_id", id)
            .single();

        if (!data) {
            this.createUser(id);
        }
    }

    async createUser(telegram_id: number) {
        const { data, error } = await supabaseClient.from("profiles").insert({
            telegram_id: telegram_id,
        });

        if (error) {
            throw error
        }

        return data
    }
}
