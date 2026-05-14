// routes/adoption.ts

import { Application } from "express";
import { AdoptionController } from "../controllers/adoption.controller";

export class AdoptionRoutes {

  public controller = new AdoptionController();

  public routes(app: Application): void {

    app.route("/api/adoption/public")
      .get(this.controller.getAllAdoptions)
      .post(this.controller.createAdoption);

    app.route("/api/adoption/public/:id")
      .get(this.controller.getAdoptionById)
      .patch(this.controller.updateAdoption)
      .delete(this.controller.deleteAdoption);

    app.route("/api/adoption/public/:id/logic")
      .delete(this.controller.deleteAdoptionAdv);

  }
}