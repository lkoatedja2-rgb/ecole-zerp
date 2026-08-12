import { Router } from "express";

import { authRouter } from "@/modules/auth/auth.routes";
import { etablissementsRouter } from "@/modules/scolarite/etablissements/etablissements.routes";
import { anneesScolairesRouter } from "@/modules/scolarite/annees-scolaires/annees-scolaires.routes";
import { classesRouter } from "@/modules/scolarite/classes/classes.routes";
import { elevesRouter } from "@/modules/scolarite/eleves/eleves.routes";
import { inscriptionsRouter } from "@/modules/scolarite/inscriptions/inscriptions.routes";
import { absencesRouter } from "@/modules/vie-scolaire/absences/absences.routes";
import { matieresRouter } from "@/modules/pedagogie/matieres/matieres.routes";
import { coursRouter } from "@/modules/pedagogie/cours/cours.routes";
import { not

// Scolarité
apiRouter.use("/etablissements", etablissementsRouter);
apiRouter.use("/annees-scolaires", anneesScolairesRouter);
apiRouter.use("/classes", classesRouter);
apiRouter.use("/eleves", elevesRouter);
apiRouter.use("/inscripti