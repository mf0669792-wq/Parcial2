// models/Adoption.ts

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface AdoptionI {
  id?: number;
  adoption_date: Date;
  document_number: string;
  adopter_name: string;
  value: number;
  dog_id: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Adoption extends Model {
  public id!: number;
  public adoption_date!: Date;
  public document_number!: string;
  public adopter_name!: string;
  public value!: number;
  public dog_id!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Adoption.init(
  {
    adoption_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: "Adoption date must be valid",
        },
      },
    },

    document_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Document number cannot be empty",
        },
      },
    },

    adopter_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Adopter name cannot be empty",
        },
        len: {
          args: [2, 120],
          msg: "Adopter name must contain between 2 and 120 characters",
        },
      },
    },

    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: "Value must be numeric",
        },
        min: {
          args: [0],
          msg: "Value cannot be negative",
        },
      },
    },

    dog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dogs",
        key: "id",
      },
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Adoption",
    tableName: "adoptions",
    timestamps: false,
  }
);