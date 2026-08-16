# Activer la création de compte client — Guide Supabase

Le site utilise **Supabase** (base de données + authentification, hébergées, gratuites pour démarrer) pour la création de compte, la connexion et l'historique de commandes. Comptez environ 10 minutes pour tout activer.

## 1. Créer votre projet Supabase

1. Allez sur **[supabase.com](https://supabase.com)** et créez un compte gratuit.
2. Cliquez sur **New project**.
3. Choisissez un nom (ex. `dat-boutique`), un mot de passe de base de données (à conserver précieusement), et une région proche (ex. **Europe – Frankfurt**).
4. Patientez ~2 minutes que le projet soit prêt.

## 2. Créer les tables

1. Dans le menu de gauche, ouvrez **SQL Editor**.
2. Cliquez sur **New query**.
3. Ouvrez le fichier **`supabase-schema.sql`** fourni avec le site, copiez tout son contenu, collez-le dans l'éditeur.
4. Cliquez sur **Run**.

Cela crée automatiquement :
- une table **`profiles`** (nom, société, téléphone, adresse de chaque client),
- une table **`commandes`** (historique des commandes, liées à chaque client),
- les règles de sécurité (**RLS**) qui garantissent que chaque client ne peut voir que ses propres données.

## 3. Récupérer vos identifiants

1. Dans le menu de gauche, allez dans **Project Settings** (icône ⚙️) → **API**.
2. Copiez la **Project URL** (ex. `https://xxxxxxxx.supabase.co`).
3. Copiez la clé **`anon` `public`** (une longue chaîne de caractères).

## 4. Configurer le site

1. Ouvrez le fichier **`supabase-config.js`** à la racine du site.
2. Remplacez les deux valeurs :

```js
window.SUPABASE_URL = 'https://xxxxxxxx.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

3. Enregistrez, puis republiez l'ensemble des fichiers du site sur votre hébergement (le fichier modifié suffit si vous mettez à jour uniquement celui-ci).

## 5. (Recommandé) Ajuster la confirmation par e-mail

Par défaut, Supabase exige que chaque client clique sur un lien de confirmation reçu par e-mail avant de pouvoir se connecter.

- Pour **garder cette vérification** (recommandé en production) : rien à faire, mais pensez à personnaliser le modèle d'e-mail dans **Authentication → Email Templates**, et à ajouter votre nom de domaine dans **Authentication → URL Configuration** pour que les liens de confirmation redirigent vers votre site.
- Pour **désactiver la vérification** (pratique pendant les tests) : **Authentication → Providers → Email**, désactivez **Confirm email**.

## 6. Tester

1. Ouvrez `mon-compte.html` sur votre site.
2. Créez un compte test.
3. Passez une commande depuis la boutique (`index.html`) : elle doit apparaître automatiquement dans l'historique de `mon-compte.html`.

---

### Ce que ça change concrètement sur le site

- Un client peut créer un compte (nom, société, e-mail, téléphone, adresse, mot de passe).
- Une fois connecté, le formulaire de commande de la boutique est **pré-rempli automatiquement**.
- Chaque commande passée est **enregistrée dans son historique de compte**, en plus d'être envoyée par e-mail à D.A.T. comme avant (aucun changement côté réception des commandes).
- Tant que `supabase-config.js` n'est pas complété, le site fonctionne normalement (boutique, panier, envoi de commande par e-mail), mais affiche un message clair indiquant que la création de compte n'est pas encore activée.

### Coût

Le plan gratuit de Supabase suffit largement pour ce site (jusqu'à 50 000 utilisateurs actifs par mois, 500 Mo de base de données). Aucune carte bancaire n'est demandée à l'inscription.
