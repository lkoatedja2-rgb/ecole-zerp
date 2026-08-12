import bcrypt from "bcryptjs";
import { prisma } from "@/core/prisma";
import { NotFoundError, ConflictError } from "@/core/errors";
import { CreatePersonnelInput } from "./personnel.schemas";

const SALT_ROUNDS = 12;

export const personnelService = {
  async create(input: CreatePersonnelInput) {
    const existing = await prisma.utilisateur.findUnique({ where: { email: input.email } });
    if (existing) throw new ConflictError("Un utilisateur avec cet email existe déjà");

    const motDePasseHash = await bcrypt.hash(input.motDePasse, SALT_ROUNDS);

    return prisma.$transaction(async (tx) => {
      const utilisateur = await tx.utilisateur.create({
        data: {
          etablissementId: input.etablissementId,
          email: input.email,
          motDePasseHash,
          role: input.role,
        },
      });

      return tx.personnel.create({
        data: {
          utilisateurId: utilisateur.id,
          nom: input.nom,
          prenom: input.prenom,
          fonction: input.fonction,
          dateEmbauche: input.dateEmbauche,
        },
      });
    });
  },

  list(etablissementId: string) {
    return prisma.personnel.findMany({
      where: { utilisateur: { etablissementId } },
      include: { utilisateur: { select: { email: true, role: true, actif: true } } },
      orderBy: [{ nom: "asc" }],
    });
  },

  async getById(id: string) {
    const personnel = await prisma.personnel.findUnique({
      where: { id },
      include: { utilisateur: true, contrats: true, cours: { include: { matiere: true, classe: true } } },
    });
    if (!personnel) throw new NotFoundError("Personnel");
    return personnel;
  },
};
