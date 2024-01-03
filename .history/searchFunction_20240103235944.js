// searchFunction.js
const { Op } = require("sequelize");
const { User, Doctor_Infor, Allcode } = require("./src/models");

async function searchFunction() {
    const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Bachelor", "Doctor", "Associate Professor", "Professor"];

    const userSearchCondition = {
        [Op.or]: [
            { firstName: { [Op.like]: { [Op.any]: searchKeywords.map(keyword => `%${keyword}%`) } } },
            { lastName: { [Op.like]: { [Op.any]: searchKeywords.map(keyword => `%${keyword}%`) } } },
        ],
    };

    const allcodeSearchCondition = {
        [Op.or]: [
            { 'Position.valueVi': { [Op.in]: searchKeywords } },
            { 'Position.valueEn': { [Op.in]: searchKeywords } },
        ],
    };

    try {
        const result = await User.findAll({
            include: [
                {
                    model: Doctor_Infor,
                    as: 'DoctorInfo', // Đặt alias cho quan hệ
                    attributes: ['clinicId', 'specialtyId'],
                },
                {
                    model: Allcode,
                    as: 'Position', // Đặt alias cho quan hệ
                    where: allcodeSearchCondition,
                    attributes: ['positionId'],
                },
            ],
            where: userSearchCondition,
            raw: true,
        });

        return result;
    } catch (error) {
        console.error('Error executing Sequelize query:', error);
        throw new Error('Internal Server Error');
    }
}

module.exports = searchFunction;
