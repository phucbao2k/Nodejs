'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Doctor_Infor extends Model {
        static associate(models) {
            Doctor_Infor.belongsTo(models.User, { foreignKey: 'doctorId' });
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' });
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' });
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' });
            Doctor_Infor.belongsTo(models.User, { foreignKey: 'positionId', as: 'positionTypeData' });
            Doctor_Infor.belongsTo(models.User, { foreignKey: 'phoneNumber', as: 'doctorPhone' });
        }
    };

    Doctor_Infor.init({
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        positionId: DataTypes.STRING,
        count: DataTypes.STRING,
        phoneNumber: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
    });

    // Hook để cập nhật User khi cập nhật positionId trong Doctor_Infor
    Doctor_Infor.beforeUpdate(async (instance) => {
        // Tìm User liên quan
        const user = await sequelize.models.User.findOne({
            where: { doctorId: instance.doctorId },
        });

        // Cập nhật positionId trong bảng User
        if (user) {
            user.positionId = instance.positionId;
            await user.save();
        }
    });

    return Doctor_Infor;
};
