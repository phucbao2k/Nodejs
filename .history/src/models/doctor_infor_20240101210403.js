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
        try {
            const [rowsUpdated] = await sequelize.models.User.update(
                {
                    positionId: instance.positionId,
                    phoneNumber: instance.phoneNumber,
                },
                { where: { id: instance.doctorId } }
            );

            if (rowsUpdated > 0) {
                console.log(`Đã cập nhật thông tin cho User với id ${instance.doctorId}`);
            } else {
                console.log(`Không tìm thấy User với id ${instance.doctorId}`);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin User:', error);
        }
    });






    return Doctor_Infor;
};
