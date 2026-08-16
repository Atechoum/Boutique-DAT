-- ============================================================================
-- D.A.T. — Boutique Capsules LAVAZZA FIRMA
-- Schéma Supabase pour la création de compte client
-- À exécuter une seule fois dans : Supabase > SQL Editor > New query > Run
-- ============================================================================

-- 1. Table des profils clients (liée 1-pour-1 à l'utilisateur d'authentification)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  nom text,
  societe text,
  telephone text,
  adresse text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Un client peut voir son propre profil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Un client peut modifier son propre profil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Un client peut créer son propre profil"
  on public.profiles for insert
  with check (auth.uid() = id);


-- 2. Table de l'historique des commandes
create table if not exists public.commandes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  panier jsonb not null,
  adresse_livraison text,
  message text,
  statut text default 'Reçue',
  created_at timestamp with time zone default now()
);

alter table public.commandes enable row level security;

create policy "Un client peut voir ses propres commandes"
  on public.commandes for select
  using (auth.uid() = user_id);

create policy "Un client peut créer ses propres commandes"
  on public.commandes for insert
  with check (auth.uid() = user_id);


-- 3. Création automatique d'un profil vide à l'inscription
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nom, societe, telephone, adresse)
  values (
    new.id,
    new.raw_user_meta_data->>'nom',
    new.raw_user_meta_data->>'societe',
    new.raw_user_meta_data->>'telephone',
    new.raw_user_meta_data->>'adresse'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- Fin du script. Vos tables "profiles" et "commandes" sont prêtes,
-- avec sécurité au niveau des lignes (RLS) : chaque client ne voit que
-- ses propres données.
-- ============================================================================
