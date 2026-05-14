

import { Request, Response } from "express";
import { Dog, DogI } from "../models/Dog";
import { Adoption } from "../models/Adoption";

export class DogController {

  public async getAllDogs(req: Request, res: Response) {
    try {
      const dogs: DogI[] = await Dog.findAll({
        where: { status: "ACTIVE" },
        include: [{ model: Adoption }]
      });

      res.status(200).json({ dogs });

    } catch (error) {
      res.status(500).json({ error: "Error fetching dogs" });
    }
  }

  public async getDogById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const dog = await Dog.findOne({
        where: { id: pk, status: "ACTIVE" },
        include: [{ model: Adoption }]
      });

      if (dog) {
        res.status(200).json({ dog });
      } else {
        res.status(404).json({ error: "Dog not found or inactive" });
      }

    } catch (error) {
      res.status(500).json({ error: "Error fetching dog" });
    }
  }

  public async createDog(req: Request, res: Response) {

    const {
      breed,
      birth_date,
      color,
      vaccinated,
      status
    } = req.body;

    try {

      const body: DogI = {
        breed,
        birth_date,
        color,
        vaccinated,
        status
      };

      const newDog = await Dog.create({ ...body });

      res.status(201).json(newDog);

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateDog(req: Request, res: Response) {

    const { id: pk } = req.params;

    const {
      breed,
      birth_date,
      color,
      vaccinated,
      status
    } = req.body;

    try {

      const body: DogI = {
        breed,
        birth_date,
        color,
        vaccinated,
        status
      };

      const dogExist = await Dog.findOne({
        where: { id: pk, status: "ACTIVE" }
      });

      if (dogExist) {

        await dogExist.update(body, { where: { id: pk } });

        res.status(200).json(dogExist);

      } else {

        res.status(404).json({
          error: "Dog not found or inactive"
        });

      }

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteDog(req: Request, res: Response) {

    try {

      const { id: pk } = req.params;

      const dogToDelete = await Dog.findOne({
        where: { id: pk }
      });

      if (dogToDelete) {

        await dogToDelete.destroy();

        res.status(200).json({
          message: "Dog deleted successfully"
        });

      } else {

        res.status(404).json({
          error: "Dog not found"
        });

      }

    } catch (error) {
      res.status(500).json({
        error: "Error deleting dog"
      });
    }
  }

  public async deleteDogAdv(req: Request, res: Response) {

    try {

      const { id: pk } = req.params;

      const dogToUpdate = await Dog.findOne({
        where: { id: pk, status: "ACTIVE" }
      });

      if (dogToUpdate) {

        await dogToUpdate.update({
          status: "INACTIVE"
        });

        res.status(200).json({
          message: "Dog marked as inactive"
        });

      } else {

        res.status(404).json({
          error: "Dog not found or inactive"
        });

      }

    } catch (error) {
      res.status(500).json({
        error: "Error marking dog as inactive"
      });
    }
  }
}