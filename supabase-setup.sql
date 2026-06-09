-- =============================================
-- ТАБЛИЦЫ
-- =============================================

create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  is_pro boolean default false,
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
);

create table if not exists net_worth_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  month date not null,
  cash numeric default 0,
  investments numeric default 0,
  real_estate numeric default 0,
  other_assets numeric default 0,
  loans numeric default 0,
  credit_cards numeric default 0,
  other_liabilities numeric default 0,
  created_at timestamptz default now(),
  unique(user_id, month)
);

create table if not exists saved_calculations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  calculator_type text not null,
  title text not null,
  inputs jsonb,
  results jsonb,
  created_at timestamptz default now()
);

-- =============================================
-- ВКЛЮЧИТЬ ROW LEVEL SECURITY (защита данных)
-- Без этого любой мог бы читать чужие данные!
-- =============================================

alter table profiles enable row level security;
alter table net_worth_entries enable row level security;
alter table saved_calculations enable row level security;

-- =============================================
-- ПОЛИТИКИ ДЛЯ profiles
-- Каждый видит и редактирует только свой профиль
-- =============================================

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

-- =============================================
-- ПОЛИТИКИ ДЛЯ net_worth_entries
-- Каждый видит и меняет только свои записи
-- =============================================

create policy "Users can view own net worth entries"
  on net_worth_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own net worth entries"
  on net_worth_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own net worth entries"
  on net_worth_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete own net worth entries"
  on net_worth_entries for delete
  using (auth.uid() = user_id);

-- =============================================
-- ПОЛИТИКИ ДЛЯ saved_calculations
-- Каждый видит и меняет только свои расчёты
-- =============================================

create policy "Users can view own saved calculations"
  on saved_calculations for select
  using (auth.uid() = user_id);

create policy "Users can insert own saved calculations"
  on saved_calculations for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own saved calculations"
  on saved_calculations for delete
  using (auth.uid() = user_id);

-- =============================================
-- AUTO-CREATE PROFILE при регистрации
-- =============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
