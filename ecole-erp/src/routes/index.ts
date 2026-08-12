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
import { sallesRouter } from "@/modules/edt/salles/salles.routes";
import { creneauxRouter } from "@/modules/edt/creneaux/creneaux.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/etablissements", etablissementsRouter);
apiRouter.use("/annees-scolaires", anneesScolairesRouter);
apiRouter.use("/classes", classesRouter);
apiRouter.use("/eleves", elevesRouter);
apiRouter.use("/inscriptions", inscriptionsRouter);
apiRouter.use("/absences", absencesRouter);
apiRouter.use("/matieres", matieresRouter);
apiRouter.use("/cours", coursRouter);
apiRouter.use("/notes", notesRouter);
apiRouter.use("/personnel", personnelRouter);
apiRouter.use("/contrats", contratsRouter);
apiRouter.use("/bulletins-paie", bulletinsPaieRouter);
apiRouter.use("/factures", facturesRouter);
apiRouter.use("/salles", sallesRouter);
apiRouter.use("/creneaux-edt", creneauxRouter);
