'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
      Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
      Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeTypeData'})
      Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'priceId', as:'priceTypeData' })
      Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'provinceId', as: 'provinceTypeData' })
      Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'paymentId', as: 'paymentTypeData' })
      Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'positionId', as: 'positionTypeData' })
      Allcode.hasMany(models.Booking, {foreignKey: 'timeType', as: 'timeTypeDataPatient' })
      Allcode.hasMany(models.Booking, { foreignKey: 'priceId', as: 'priceTypeDataBooking' })
      Allcode.hasMany(models.Booking, { foreignKey: 'statusId', as: 'statusTypeDataBooking' })
      Allcode.hasMany(models.Booking, { foreignKey: 'gender', as: 'genderDataBooking' })
      Allcode.hasMany(models.Schedule, { foreignKey: 'priceId', as: 'priceTypeDataPatient' })

    }
  };
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};