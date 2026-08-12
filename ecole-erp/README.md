# École ERP — Backend

Backend du logiciel de gestion d'établissement scolaire, sous forme de
**monolithe modulaire** en Node.js/TypeScript. Chaque module correspond à un
domaine métier de l'architecture cible (auth, scolarité, vie scolaire,
pédagogie, RH, comptabilité...) et pourra être extrait en microservice
indépendant plus tard sans réécrire la logique métier — les modules ne
s'appellent jamais directement entre eux autrement que via leurs `service.ts`.

## Stack

- **Runtime**: Node.js 22 + TypeScript
- **Framework HTTP**: Express
- **Base de données**: PostgreSQL + Prisma ORM
- **Auth**: JWT + RBAC (contrôle d'accès par rôle)
- **Validation**: Zod

## Structure

```
src/
  app.ts                    # config Express (middlewares, routes, erreurs)
  server.ts                 # point d'entrée (démarrage/arrêt propre)
  config/env.ts              # variables d'environnement validées
  core/
    prisma.ts                # client Prisma singleton
    errors.ts                # classes d'erreurs métier
    middleware/
      auth.ts                 # authenticate() + authorize() (JWT/RBAC)
      error-handler.ts         # gestion centralisée des erreurs
  routes/index.ts             # agrégateur de toutes les routes /api/v1/*
  modules/
    auth/                     # inscription, connexion, JWT
    scolarite/
      etablissements/
      annees-scolaires/
      classes/
      eleves/
      inscriptions/
    vie-scolaire/
      absences/
    pedagogie/
      matieres/
      cours/
      notes/
    rh/
      personnel/
      contrats/
      bulletins-paie/
    comptabilite/
      factures/
prisma/
  schema.prisma              # modèle de données complet (ERD fourni)
  seed.ts                    # jeu de données de démonstration
```

Chaque module suit systématiquement le même pattern à 4 fichiers :
- `*.schemas.ts`   → validation des entrées (Zod)
- `*.service.ts`   → logique métier + accès Prisma
- `*.controller.ts`→ adaptation HTTP (req/res)
- `*.routes.ts`    → déclaration des routes + permissions (RBAC)

## Démarrage rapide

```bash
# 1. Copier la config d'environnement
cp .env.example .env

# 2. Démarrer PostgreSQL en local
docker compose up -d

# 3. Installer les dépendances
npm install

# 4. Générer le client Prisma + appliquer le schéma
npm run prisma:generate
npm run prisma:migrate

# 5. Charger des données de démonstration (optionnel)
npm run prisma:seed

# 6. Lancer le serveur en mode développement
npm run dev
```

Le serveur démarre sur `http://localhost:4000`.
Vérification : `GET /health`.

## Comptes de démonstration (après seed)

| Rôle       | Email                          | Mot de passe   |
|------------|---------------------------------|----------------|
| Admin      | admin@lycee-demo.fr             | Password123!   |
| Enseignant | prof.martin@lycee-demo.fr       | Password123!   |
| Élève      | eleve.dupont@lycee-demo.fr      | Password123!   |

## Exemple d'utilisation de l'API

```bash
# Connexion
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lycee-demo.fr","motDePasse":"Password123!"}'

# → renvoie { token, utilisateur }
# Réutiliser le token :
curl http://localhost:4000/api/v1/eleves \
  -H "Authorization: Bearer <token>"
```

## Sécurité mise en place

- Mots de passe hashés avec bcrypt (12 rounds)
- JWT signé (HS256), expiration configurable
- RBAC : chaque route déclare explicitement les rôles autorisés
- Isolation multi-établissement : le `etablissementId` de l'utilisateur
  connecté scope les requêtes (à renforcer avec des policies Prisma/RLS
  Postgres en production)
- Validation stricte des entrées (Zod) sur chaque route d'écriture
- Gestion centralisée des erreurs (jamais de stack trace exposée en prod)
- Helmet (en-têtes HTTP sécurisés) + CORS configurable

## Prochaines étapes suggérées

1. **Tests** : ajouter des tests d'intégration (Vitest + Supertest) module
   par module, en commençant par `auth` et `eleves`.
2. **Module Emploi du temps (EDT)** : le modèle `CreneauEdt`/`Salle` existe
   déjà en base ; il reste à écrire le module applicatif (détection de
   conflits de créneaux notamment).
3. **Module Communication** : messagerie interne / notifications
   (potentiellement via une queue : BullMQ + Redis).
4. **Sanctions** (vie scolaire) : même pattern que `absences`.
5. **Refresh tokens** : actuellement JWT simple ; ajouter un mécanisme de
   refresh token + révocation pour une meilleure sécurité en production.
6. **Front-end** : à construire séparément (React/Vue), consomme l'API REST
   sous `/api/v1/*`.
7. **Migration vers microservices** : si la charge le justifie, chaque
   dossier sous `modules/` peut devenir un service indépendant avec sa
   propre base de données, en s'appuyant sur le découpage déjà en place.
