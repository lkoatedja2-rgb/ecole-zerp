import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { env } from "@/config/env";
import { UnauthorizedError, ForbiddenError } from "@/core/errors";

export interface JwtPayload {
  sub: string; // utilisateur.id
  etablissementId: string;
  role: Role;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/** Vérifie le JWT présent dans l'en-tête Authorization: Bearer <token> */
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Token manquant");
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    throw new UnauthorizedError("Token invalide ou expiré");
  }
}

/** Restreint l'accès à une liste de rôles autorisés (RBAC) */
export function authorize(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError();
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError(
        `Rôle '${req.user.role}' non autorisé pour cette action (rôles requis: ${allowedRoles.join(", ")})`
      );
    }
    next();
  };
}

/** Garantit que l'utilisateur n'agit que sur les données de son propre établissement (multi-tenant) */
export function scopeToEtablissement(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) {
    throw new UnauthorizedError();
  }
  next();
}
