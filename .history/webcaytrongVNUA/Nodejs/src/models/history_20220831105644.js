'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  History.init({
    
    patientId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
   
    roleid:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};