import "express-async-errors"; // doit être importé avant les routes pour catcher les erreurs async
import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { env } from "@/config/env";
import { apiRouter } from "@/routes";
import { errorHandler } from "@/core/middleware/error-handler";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(pinoHttp({ level: env.NODE_ENV === "test" ? "silent" : "info" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/v1", apiRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "NotFoundError", message: "Route introuvable" });
  });

  // Le error handler doit toujours être le dernier middleware.
  app.use(errorHandler);

  return app;
}
