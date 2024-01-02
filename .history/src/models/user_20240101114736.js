'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' });
      User.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' });
      User.hasOne(models.Doctor_Infor, { foreignKey: 'positionId', as: 'positionTypeData' });
      User.hasOne(models.Doctor_Infor, { foreignKey: 'phoneNumber', as: 'doctorPhone' });
      User.hasMany(models.Schedule, { foreignKey: 'doctorId', as: 'doctorData' });
      User.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' });
      User.hasMany(models.Booking, { foreignKey: 'doctorId', as: 'doctorNameData' });
    }
  }

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.TEXT,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  // Hook để cập nhật Doctor_Infor khi cập nhật positionId trong User
  User.beforeUpdate(async (instance) => {
    // Tìm Doctor_Infor liên quan
    const doctorInfor = await sequelize.models.Doctor_Infor.findOne({
      where: { doctorId: instance.doctorId },
    });

    // Cập nhật positionId trong bảng Doctor_Infor
    if (doctorInfor) {
      doctorInfor.positionId = instance.positionId;
      await doctorInfor.save();
    }
  });

  return User;
};
