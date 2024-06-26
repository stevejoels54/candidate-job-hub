import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Candidate extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public phoneNumber!: string;
  public email!: string;
  public callInterval!: string;
  public linkedIn!: string;
  public gitHub!: string;
  public comment!: string;
}

Candidate.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    callInterval: {
      type: DataTypes.TIME,
    },
    linkedIn: {
      type: DataTypes.STRING,
    },
    gitHub: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Candidate",
  }
);

export default Candidate;
