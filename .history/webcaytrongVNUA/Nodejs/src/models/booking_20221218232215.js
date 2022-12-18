'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User,{foreignKey: 'patientId', targetKey: 'id', as: 'patientData'})
      Booking.belongsTo(models.Allcode, {
        foreignKey: 'timeType', targetKey: 'keyMap',
        as: 'timeTypeDataPatient'
      })
      Booking.belongsTo(models.Allcode, {
        foreignKey: 'price', targetKey: 'keyMap',
        as: 'priceTypeDataPatient'
      })
      Booking.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'doctorData' })
    }
  };
  Booking.init({
    image: DataTypes.TEXT,
    statusId: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    plantName: DataTypes.STRING,
    specialtyName: DataTypes.STRING,
    timeType: DataTypes.STRING,
    token: DataTypes.STRING,
    date: DataTypes.STRING,
    birthday: DataTypes.STRING,
    reasons: DataTypes.TEXT,
    phoneNumber: DataTypes.TEXT,
    doctorName: DataTypes.STRING,
    price: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};