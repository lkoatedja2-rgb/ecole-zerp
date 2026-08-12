import { PrismaClient, Role, TypeContrat } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed en cours...");

  const etablissement = await prisma.etablissement.create({
    data: {
      nom: "Lycée Démonstration",
      code: "LYC-DEMO",
      ville: "Paris",
    },
  });

  const anneeScolaire = await prisma.anneeScolaire.create({
    data: {
      etablissementId: etablissement.id,
      libelle: "2025-2026",
      dateDebut: new Date("2025-09-01"),
      dateFin: new Date("2026-07-05"),
      active: true,
    },
  });

  const periode1 = await prisma.periode.create({
    data: {
      anneeScolaireId: anneeScolaire.id,
      libelle: "Trimestre 1",
      dateDebut: new Date("2025-09-01"),
      dateFin: new Date("2025-12-19"),
    },
  });

  const passwordHash = await bcrypt.hash("Password123!", 12);

  const adminUser = await prisma.utilisateur.create({
    data: {
      etablissementId: etablissement.id,
      email: "admin@lycee-demo.fr",
      motDePasseHash: passwordHash,
      role: Role.ADMIN,
    },
  });

  const enseignantUser = await prisma.utilisateur.create({
    data: {
      etablissementId: etablissement.id,
      email: "prof.martin@lycee-demo.fr",
      motDePasseHash: passwordHash,
      role: Role.ENSEIGNANT,
    },
  });

  const personnel = await prisma.personnel.create({
    data: {
      utilisateurId: enseignantUser.id,
      nom: "Martin",
      prenom: "Claire",
      fonction: "Professeure de Mathématiques",
      dateEmbauche: new Date("2020-09-01"),
    },
  });

  await prisma.contrat.create({
    data: {
      personnelId: personnel.id,
      typeContrat: TypeContrat.CDI,
      dateDebut: new Date("2020-09-01"),
      salaireBrut: 3200,
    },
  });

  const classe = await prisma.classe.create({
    data: {
      etablissementId: etablissement.id,
      anneeScolaireId: anneeScolaire.id,
      nom: "2nde A",
      niveau: "Seconde",
    },
  });

  const matiere = await prisma.matiere.create({
    data: { libelle: "Mathématiques", code: "MATH" },
  });

  const cours = await prisma.cours.create({
    data: {
      classeId: classe.id,
      matiereId: matiere.id,
      personnelId: personnel.id,
    },
  });

  const eleveUser = await prisma.utilisateur.create({
    data: {
      etablissementId: etablissement.id,
      email: "eleve.dupont@lycee-demo.fr",
      motDePasseHash: passwordHash,
      role: Role.ELEVE,
    },
  });

  const eleve = await prisma.eleve.create({
    data: {
      utilisateurId: eleveUser.id,
      nom: "Dupont",
      prenom: "Lucas",
      dateNaissance: new Date("2010-03-15"),
      numeroIne: "1234567890A",
    },
  });

  await prisma.inscription.create({
    data: {
      eleveId: eleve.id,
      classeId: classe.id,
      anneeScolaireId: anneeScolaire.id,
      dateInscription: new Date("2025-09-01"),
    },
  });

  await prisma.note.create({
    data: {
      eleveId: eleve.id,
      coursId: cours.id,
      periodeId: periode1.id,
      valeur: 14.5,
      coefficient: 2,
      dateEvaluation: new Date("2025-10-10"),
    },
  });

  console.log("✅ Seed terminé.");
  console.log(`   Admin:      ${adminUser.email} / Password123!`);
  console.log(`   Enseignant: ${enseignantUser.email} / Password123!`);
  console.log(`   Élève:      ${eleveUser.email} / Password123!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
