import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "@/core/errors";
import { Prisma } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  // Erreurs métier explicites
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      details: err.details,
    });
  }

  // Erreurs de validation Zod
  if (err instanceof ZodError) {
    return res.status(422).json({
      error: "ValidationError",
      message: "Données invalides",
      details: err.flatten(),
    });
  }

  // Erreurs Prisma connues (contrainte unique, clé étrangère, etc.)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "ConflictError",
        message: "Une ressource avec ces valeurs existe déjà",
        details: err.meta,
      });
    }
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "NotFoundError",
        message: "Ressource introuvable",
      });
    }
  }

  // Erreur inattendue
  req.log?.error({ err }, "Erreur non gérée");
  return res.status(500).json({
    error: "InternalServerError",
    message: "Une erreur interne est survenue",
  });
}
