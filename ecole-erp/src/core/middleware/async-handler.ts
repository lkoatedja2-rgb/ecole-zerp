import { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Note: avec `express-async-errors` importé dans app.ts, ce wrapper n'est
 * plus strictement nécessaire (les rejets de promesses sont catchés
 * automatiquement). On le garde disponible pour plus de clarté/explicité
 * dans certains contrôleurs si besoin.
 */
export function asyncHandler(fn: RequestHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
