export interface TelegramUpdateObject {
    update_id: number;
    message: TelegramMessage;
}

export interface TelegramMessage {
    message_id: number;
    from: TelegramUser;
    chat: TelegramChat;
    date: number;
    text: string;
    photo?: TelegramPhoto[];
}

export interface TelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
}

export interface TelegramChat {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    type: string;
}

export interface TelegramPhoto {
    file_id: string;
    file_unique_id: string;
    file_size: number;
    width: number;
    height: number;
}