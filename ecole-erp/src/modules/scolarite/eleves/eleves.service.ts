import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { prisma } from "@/core/prisma";
import { NotFoundError, ConflictError } from "@/core/errors";
import { CreateEleveInput, UpdateEleveInput } from "./eleves.schemas";

const SALT_ROUNDS = 12;

export const elevesService = {
  async create(input: CreateEleveInput) {
    const existing = await prisma.utilisateur.findUnique({ where: { email: input.email } });
    if (existing) throw new ConflictError("Un utilisateur avec cet email existe déjà");

    const motDePasseHash = await bcrypt.hash(input.motDePasse, SALT_ROUNDS);

    return prisma.$transaction(async (tx) => {
      const utilisateur = await tx.utilisateur.create({
        data: {
          etablissementId: input.etablissementId,
          email: input.email,
          motDePasseHash,
          role: Role.ELEVE,
        },
      });

      const eleve = await tx.eleve.create({
        data: {
          utilisateurId: utilisateur.id,
          nom: input.nom,
          prenom: input.prenom,
          dateNaissance: input.dateNaissance,
          numeroIne: input.numeroIne,
        },
      });

      if (input.responsableIds?.length) {
        await tx.eleveResponsable.createMany({
          data: input.responsableIds.map((responsableId) => ({
            eleveId: eleve.id,
            responsableId,
          })),
        });
      }

      return eleve;
    });
  },

  list(etablissementId: string) {
    return prisma.eleve.findMany({
      where: { utilisateur: { etablissementId } },
      include: { utilisateur: { select: { email: true, actif: true } } },
      orderBy: [{ nom: "asc" }, { prenom: "asc" }],
    });
  },

  async getById(id: string) {
    const eleve = await prisma.eleve.findUnique({
      where: { id },
      include: {
        utilisateur: { select: { email: true, actif: true } },
        responsables: { include: { responsable: true } },
        inscriptions: { include: { classe: true, anneeScolaire: true } },
      },
    });
    if (!eleve) throw new NotFoundError("Élève");
    return eleve;
  },

  async update(id: string, input: UpdateEleveInput) {
    await this.getById(id);
    return prisma.eleve.update({ where: { id }, data: input });
  },
};
