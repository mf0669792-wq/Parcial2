

import { Request, Response } from "express";
import { Adoption, AdoptionI } from "../models/Adoption";
import { Dog } from "../models/Dog";

export class AdoptionController {

  public async getAllAdoptions(req: Request, res: Response) {

    try {

      const adoptions: AdoptionI[] = await Adoption.findAll({
        where: { status: "ACTIVE" },
        include: [{ model: Dog }]
      });

      res.status(200).json({ adoptions });

    } catch (error) {

      res.status(500).json({
        error: "Error fetching adoptions"
      });

    }
  }

  public async getAdoptionById(req: Request, res: Response) {

    try {

      const { id: pk } = req.params;

      const adoption = await Adoption.findOne({
        where: { id: pk, status: "ACTIVE" },
        include: [{ model: Dog }]
      });

      if (adoption) {

        res.status(200).json({ adoption });

      } else {

        res.status(404).json({
          error: "Adoption not found or inactive"
        });

      }

    } catch (error) {

      res.status(500).json({
        error: "Error fetching adoption"
      });

    }
  }

  public async createAdoption(req: Request, res: Response) {

    const {
      adoption_date,
      document_number,
      adopter_name,
      value,
      dog_id,
      status
    } = req.body;

    try {

      const body: AdoptionI = {
        adoption_date,
        document_number,
        adopter_name,
        value,
        dog_id,
        status
      };

      const newAdoption = await Adoption.create({ ...body });

      res.status(201).json(newAdoption);

    } catch (error: any) {

      res.status(400).json({
        error: error.message
      });

    }
  }

  public async updateAdoption(req: Request, res: Response) {

    const { id: pk } = req.params;

    const {
      adoption_date,
      document_number,
      adopter_name,
      value,
      dog_id,
      status
    } = req.body;

    try {

      const body: AdoptionI = {
        adoption_date,
        document_number,
        adopter_name,
        value,
        dog_id,
        status
      };

      const adoptionExist = await Adoption.findOne({
        where: { id: pk, status: "ACTIVE" }
      });

      if (adoptionExist) {

        await adoptionExist.update(body, {
          where: { id: pk }
        });

        res.status(200).json(adoptionExist);

      } else {

        res.status(404).json({
          error: "Adoption not found or inactive"
        });

      }

    } catch (error: any) {

      res.status(400).json({
        error: error.message
      });

    }
  }

  public async deleteAdoption(req: Request, res: Response) {

    try {

      const { id: pk } = req.params;

      const adoptionToDelete = await Adoption.findOne({
        where: { id: pk }
      });

      if (adoptionToDelete) {

        await adoptionToDelete.destroy();

        res.status(200).json({
          message: "Adoption deleted successfully"
        });

      } else {

        res.status(404).json({
          error: "Adoption not found"
        });

      }

    } catch (error) {

      res.status(500).json({
        error: "Error deleting adoption"
      });

    }
  }

  public async deleteAdoptionAdv(req: Request, res: Response) {

    try {

      const { id: pk } = req.params;

      const adoptionToUpdate = await Adoption.findOne({
        where: { id: pk, status: "ACTIVE" }
      });

      if (adoptionToUpdate) {

        await adoptionToUpdate.update({
          status: "INACTIVE"
        });

        res.status(200).json({
          message: "Adoption marked as inactive"
        });

      } else {

        res.status(404).json({
          error: "Adoption not found or inactive"
        });

      }

    } catch (error) {

      res.status(500).json({
        error: "Error marking adoption as inactive"
      });

    }
  }
}