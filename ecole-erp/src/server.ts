import { createApp } from "@/app";
import { env } from "@/config/env";
import { prisma } from "@/core/prisma";

async function main() {
  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n${signal} reçu, arrêt en cours...`);
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

main().catch((err) => {
  console.error("Échec du démarrage du serveur:", err);
  process.exit(1);
});
