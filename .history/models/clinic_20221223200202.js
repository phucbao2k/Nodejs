'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Clinic.init({

    // email: DataTypes.STRING,
    // firstName: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    descriptionHTML: DataTypes.TEXT,
    descriptionMarkdown: DataTypes.TEXT,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};