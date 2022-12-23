'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Allcode,
        {foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData'})
      Schedule.belongsTo(models.User,
        { foreignKey: 'doctorId', targetKey: 'id', as: 'doctorData' })
     Schedule.belongsTo(models.Allcode, {
        foreignKey: 'priceId', targetKey: 'keyMap',
        as: 'priceTypeDataPatient'
      })
    }
  };
  Schedule.init({

    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};