create table profiles (
    id bigint primary key generated always as identity,
    telegram_id bigint not null,
    phone_number text not null,
    created_at timestamp not null default now(),
);