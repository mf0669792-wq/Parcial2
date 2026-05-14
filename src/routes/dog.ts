// routes/dog.ts

import { Application } from "express";
import { DogController } from "../controllers/dog.controller";

export class DogRoutes {

  public controller = new DogController();

  public routes(app: Application): void {

    app.route("/api/dog/public")
      .get(this.controller.getAllDogs)
      .post(this.controller.createDog);

    app.route("/api/dog/public/:id")
      .get(this.controller.getDogById)
      .patch(this.controller.updateDog)
      .delete(this.controller.deleteDog);

    app.route("/api/dog/public/:id/logic")
      .delete(this.controller.deleteDogAdv);

  }
}