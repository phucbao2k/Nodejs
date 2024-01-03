// searchFunction.js
const { Op } = require("sequelize");
const unorm = require("unorm");
const { User, Doctor_Infor, Allcode } = require("./src/models");

async function searchFunction() {
    const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Bachelor", "Doctor", "Associate Professor", "Professor"];

    const normalizedSearchKeywords = searchKeywords.map(keyword => unorm.nfkd(keyword).replace(/[\u0300-\u036f]/g, ""));

    const positionSearchCondition = {
        [Op.or]: normalizedSearchKeywords.map(keyword => ({
            [Op.or]: [
                { 'Position.valueVi': { [Op.iLike]: `%${keyword}%` } },
                { 'Position.valueEn': { [Op.iLike]: `%${keyword}%` } },
            ],
        })),
    };

    try {
        const result = await User.findAll({
            include: [
                {
                    model: Doctor_Infor,
                    as: 'DoctorInfo',
                    attributes: ['clinicId', 'specialtyId'],
                },
                {
                    model: Allcode,
                    as: 'Position',
                    where: positionSearchCondition,
                    attributes: ['positionId'],
                },
            ],
            where: {
                [Op.or]: normalizedSearchKeywords.map(keyword => ({
                    [Op.or]: [
                        { firstName: { [Op.iLike]: `%${keyword}%` } },
                        { lastName: { [Op.iLike]: `%${keyword}%` } },
                    ],
                })),
            },
            raw: true,
        });

        return result;
    } catch (error) {
        console.error('Error executing Sequelize query:', error);
        throw new Error('Internal Server Error');
    }
}

module.exports = searchFunction;
