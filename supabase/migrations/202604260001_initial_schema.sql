create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  role text not null default 'customer' check (role in ('customer','admin','dispatcher','technician')),
  avatar_url text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  base_price numeric,
  icon text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id) on delete cascade,
  make text,
  model text,
  year int,
  plate_number text,
  color text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id) on delete cascade,
  service_id uuid references public.services(id),
  vehicle_id uuid references public.vehicles(id),
  issue_description text,
  pickup_location text,
  latitude numeric,
  longitude numeric,
  scheduled_at timestamptz,
  status text not null default 'pending' check (status in ('pending','accepted','technician_assigned','on_the_way','arrived','completed','cancelled')),
  assigned_technician_id uuid references public.profiles(id),
  estimated_arrival_minutes int,
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.booking_status_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id) on delete cascade,
  status text,
  note text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  message text,
  status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  name text,
  description text,
  price numeric,
  features jsonb,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.customer_otp_sessions (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  otp_code text not null,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.get_current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    new.phone,
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace function public.insert_booking_status_event()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' or old.status is distinct from new.status then
    insert into public.booking_status_events (booking_id, status, note, created_by)
    values (new.id, new.status, new.admin_notes, auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

do $$
declare
  table_name text;
begin
  foreach table_name in array array['profiles','services','vehicles','bookings','contact_messages','pricing_plans']
  loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end $$;

drop trigger if exists booking_status_event_insert on public.bookings;
create trigger booking_status_event_insert
after insert or update of status on public.bookings
for each row execute function public.insert_booking_status_event();

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.vehicles enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_status_events enable row level security;
alter table public.contact_messages enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.customer_otp_sessions enable row level security;

drop policy if exists "profiles own read" on public.profiles;
create policy "profiles own read" on public.profiles for select to authenticated using (id = auth.uid() or public.get_current_user_role() in ('admin','dispatcher'));
drop policy if exists "profiles own update" on public.profiles;
create policy "profiles own update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "services active read" on public.services;
create policy "services active read" on public.services for select to authenticated using (is_active = true or public.get_current_user_role() in ('admin','dispatcher'));
drop policy if exists "services admin write" on public.services;
create policy "services admin write" on public.services for all to authenticated using (public.get_current_user_role() in ('admin','dispatcher')) with check (public.get_current_user_role() in ('admin','dispatcher'));

drop policy if exists "pricing active read" on public.pricing_plans;
create policy "pricing active read" on public.pricing_plans for select to authenticated using (is_active = true or public.get_current_user_role() in ('admin','dispatcher'));
drop policy if exists "pricing admin write" on public.pricing_plans;
create policy "pricing admin write" on public.pricing_plans for all to authenticated using (public.get_current_user_role() in ('admin','dispatcher')) with check (public.get_current_user_role() in ('admin','dispatcher'));

drop policy if exists "vehicles own" on public.vehicles;
create policy "vehicles own" on public.vehicles for all to authenticated using (customer_id = auth.uid() or public.get_current_user_role() in ('admin','dispatcher')) with check (customer_id = auth.uid() or public.get_current_user_role() in ('admin','dispatcher'));

drop policy if exists "bookings customer insert" on public.bookings;
create policy "bookings customer insert" on public.bookings for insert to authenticated with check (customer_id = auth.uid());
drop policy if exists "bookings customer read" on public.bookings;
create policy "bookings customer read" on public.bookings for select to authenticated using (
  customer_id = auth.uid()
  or public.get_current_user_role() in ('admin','dispatcher')
  or assigned_technician_id = auth.uid()
);
drop policy if exists "bookings customer cancel" on public.bookings;
create policy "bookings customer cancel" on public.bookings for update to authenticated using (customer_id = auth.uid() and status in ('pending','accepted')) with check (customer_id = auth.uid());
drop policy if exists "bookings staff update" on public.bookings;
create policy "bookings staff update" on public.bookings for update to authenticated using (public.get_current_user_role() in ('admin','dispatcher') or assigned_technician_id = auth.uid()) with check (public.get_current_user_role() in ('admin','dispatcher','technician'));

drop policy if exists "booking events participant read" on public.booking_status_events;
create policy "booking events participant read" on public.booking_status_events for select to authenticated using (
  exists (
    select 1 from public.bookings b
    where b.id = booking_id
      and (b.customer_id = auth.uid() or b.assigned_technician_id = auth.uid() or public.get_current_user_role() in ('admin','dispatcher'))
  )
);

drop policy if exists "contact anyone create" on public.contact_messages;
create policy "contact anyone create" on public.contact_messages for insert to anon, authenticated with check (true);
drop policy if exists "contact staff read" on public.contact_messages;
create policy "contact staff read" on public.contact_messages for select to authenticated using (public.get_current_user_role() in ('admin','dispatcher'));
drop policy if exists "contact staff update" on public.contact_messages;
create policy "contact staff update" on public.contact_messages for update to authenticated using (public.get_current_user_role() in ('admin','dispatcher')) with check (public.get_current_user_role() in ('admin','dispatcher'));

drop policy if exists "otp service only" on public.customer_otp_sessions;
create policy "otp service only" on public.customer_otp_sessions for all using (false);

insert into public.services (name, slug, description, base_price, icon)
values
  ('Battery Jump Start', 'battery-jump-start', 'Dead battery? We will get you back on the road fast.', 45, 'BatteryCharging'),
  ('Tire Replacement', 'tire-replacement', 'Flat tire? We bring the tools and help with the fix.', 55, 'Disc3'),
  ('Emergency Fuel Delivery', 'emergency-fuel-delivery', 'Out of fuel? We deliver enough to get you moving.', 35, 'Fuel'),
  ('On-site Mechanic', 'on-site-mechanic', 'Mobile mechanic services for repairs on the spot.', 85, 'Wrench'),
  ('Towing Support', 'towing-support', 'Coordinated towing support when roadside repair is not enough.', 120, 'Truck')
on conflict (slug) do update set description = excluded.description, base_price = excluded.base_price, icon = excluded.icon, is_active = true;

insert into public.pricing_plans (name, description, price, features)
values
  ('Basic Roadside', 'For occasional drivers who want reliable help on call.', 19, '["One active vehicle","Jump start support","Fuel delivery coordination","Standard ETA"]'::jsonb),
  ('Standard Assistance', 'Balanced roadside coverage for daily drivers.', 39, '["Two active vehicles","Priority dispatch","Tire change support","Service history"]'::jsonb),
  ('Premium Care', 'Fast response and wider coverage for families and fleets.', 79, '["Four active vehicles","Premium response queue","On-site mechanic checks","Dedicated support line"]'::jsonb);
