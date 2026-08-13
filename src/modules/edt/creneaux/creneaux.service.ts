import { prisma } from "@/core/prisma";
import { ConflictError, NotFoundError } from "@/core/errors";
import { CreateCreneauInput } from "./creneaux.schemas";

export const creneauxService = {
  async create(input: CreateCreneauInput) {
    const cours = await prisma.cours.findUnique({
      where: { id: input.coursId },
      select: { personnelId: true },
    });
    if (!cours) throw new NotFoundError("Cours");

    const conflitSalle = await prisma.creneauEdt.findFirst({
      where: {
        salleId: input.salleId,
        debut: { lt: input.fin },
        fin: { gt: input.debut },
      },
    });
    if (conflitSalle) {
      throw new ConflictError("La salle est déjà occupée sur ce créneau horaire");
    }

    const conflitEnseignant = await prisma.creneauEdt.findFirst({
      where: {
        debut: { lt: input.fin },
        fin: { gt: input.debut },
        cours: { personnelId: cours.personnelId },
      },
    });
    if (conflitEnseignant) {
      throw new ConflictError("L'enseignant a déjà un cours programmé sur ce créneau horaire");
    }

    return prisma.creneauEdt.create({
      data: input,
      include: { salle: true, cours: { include: { matiere: true, classe: true, personnel: true } } },
    });
  },

  listForClasse(classeId: string, debut?: Date, fin?: Date) {
    return prisma.creneauEdt.findMany({
      where: {
        cours: {

vu
cat > src/modules/edt/creneaux/creneaux.service.ts << 'EOF'
import { prisma } from "@/core/prisma";
import { ConflictError, NotFoundError } from "@/core/errors";
import { CreateCreneauInput } from "./creneaux.schemas";

export const creneauxService = {
  async create(input: CreateCreneauInput) {
    const cours = await prisma.cours.findUnique({
      where: { id: input.coursId },
      select: { personnelId: true },
    });
    if (!cours) throw new NotFoundError("Cours");

    const conflitSalle = await prisma.creneauEdt.findFirst({
      where: {
        salleId: input.salleId,
        debut: { lt: input.fin },
        fin: { gt: input.debut },
      },
    });
    if (conflitSalle) {
      throw new ConflictError("La salle est déjà occupée sur ce créneau horaire");
    }

    const conflitEnseignant = await prisma.creneauEdt.findFirst({
      where: {
        debut: { lt: input.fin },
        fin: { gt: input.debut },
        cours: { personnelId: cours.personnelId },
      },
    });
    if (conflitEnseignant) {
      throw new ConflictError("L'enseignant a déjà un cours programmé sur ce créneau horaire");
    }

    return prisma.creneauEdt.create({
      data: input,
      include: { salle: true, cours: { include: { matiere: true, classe: true, personnel: true } } },
    });
  },

  listForClasse(classeId: string, debut?: Date, fin?: Date) {
    return prisma.creneauEdt.findMany({
      where: {
        cours: {
