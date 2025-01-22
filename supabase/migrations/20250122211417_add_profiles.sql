
create table
profiles (
id bigint primary key generated always as identity,
telegram_id bigint unique,
phone_number text,
user_id uuid references auth.users on delete cascade not null,
created_at timestamptz default now()
);