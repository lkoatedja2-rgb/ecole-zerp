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
import { notesRouter } from "@/modules/pedagogie/notes/notes.routes";
import { personnelRouter } from "@/modules/rh/personnel/personnel.routes";
import { contratsRouter } from "@/modules/rh/contrats/contrats.routes";
import { bulletinsPaieRouter } from "@/modules/rh/bulletins-paie/bulletins-paie.routes";
import { facturesRouter } from "@/modules/comptabilite/factures/factures.routes";

export const apiRouter = Router();

// Identité / Auth
apiRouter.use("/auth", authRouter);

// Scolarité
apiRouter.use("/etablissements", etablissementsRouter);
apiRouter.use("/annees-scolaires", anneesScolairesRouter);
apiRouter.use("/classes", classesRouter);
apiRouter.use("/eleves", elevesRouter);
apiRouter.use("/inscriptions", inscriptionsRouter);

// Vie scolaire
apiRouter.use("/absences", absencesRouter);

// Pédagogie
apiRouter.use("/matieres", matieresRouter);
apiRouter.use("/cours", coursRouter);
apiRouter.use("/notes", notesRouter);

// RH
apiRouter.use("/personnel", personnelRouter);
apiRouter.use("/contrats", contratsRouter);
apiRouter.use("/bulletins-paie", bulletinsPaieRouter);

// Comptabilité
apiRouter.use("/factures", facturesRouter);

// TODO (prochaines itérations, même pattern module):
// - /modules/communication  (messagerie interne, notifications)
// - /modules/edt            (emploi du temps, salles - CreneauEdt existe déjà en DB)
// - /modules/vie-scolaire/sanctions
