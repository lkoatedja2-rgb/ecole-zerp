import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "@/core/prisma";
import { env } from "@/config/env";
import { ConflictError, UnauthorizedError } from "@/core/errors";
import { LoginInput, RegisterInput } from "./auth.schemas";

const SALT_ROUNDS = 12;

export const authService = {
  async register(input: RegisterInput) {
    const existing = await prisma.utilisateur.findUnique({ where: { email: input.email } });
    if (existing) {
      throw new ConflictError("Un utilisateur avec cet email existe déjà");
    }

    const motDePasseHash = await bcrypt.hash(input.motDePasse, SALT_ROUNDS);

    const utilisateur = await prisma.utilisateur.create({
      data: {
        etablissementId: input.etablissementId,
        email: input.email,
        motDePasseHash,
        role: input.role,
      },
      select: { id: true, email: true, role: true, etablissementId: true, actif: true },
    });

    return utilisateur;
  },

  async login(input: LoginInput) {
    const utilisateur = await prisma.utilisateur.findUnique({ where: { email: input.email } });

    if (!utilisateur || !utilisateur.actif) {
      throw new UnauthorizedError("Identifiants invalides");
    }

    const motDePasseValide = await bcrypt.compare(input.motDePasse, utilisateur.motDePasseHash);
    if (!motDePasseValide) {
      throw new UnauthorizedError("Identifiants invalides");
    }

    const signOptions: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"] };

    const token = jwt.sign(
      {
        sub: utilisateur.id,
        etablissementId: utilisateur.etablissementId,
        role: utilisateur.role,
        email: utilisateur.email,
      },
      env.JWT_SECRET,
      signOptions
    );

    return {
      token,
      utilisateur: {
        id: utilisateur.id,
        email: utilisateur.email,
        role: utilisateur.role,
        etablissementId: utilisateur.etablissementId,
      },
    };
  },

  async me(utilisateurId: string) {
    return prisma.utilisateur.findUniqueOrThrow({
      where: { id: utilisateurId },
      select: {
        id: true,
        email: true,
        role: true,
        actif: true,
        etablissementId: true,
        personnel: true,
        eleve: true,
        responsable: true,
      },
    });
  },
};
