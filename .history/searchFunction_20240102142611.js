const { Op } = require("sequelize");
const { User} = require("./src/models/user.js");
const { Doctor_Infor } = require("./src/models/doctor_infor.js");
const { Allcode } = require("./src/models/allcode.js");


async function searchFunction() {
    const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Phó", "Thạc", "Sĩ"];

    const userSearchCondition = {
        [Op.or]: [
            { firstName: { [Op.like]: { [Op.any]: searchKeywords.map(keyword => `%${keyword}%`) } } },
            { lastName: { [Op.like]: { [Op.any]: searchKeywords.map(keyword => `%${keyword}%`) } } },
        ],
    };

    const allcodeSearchCondition = {
        [Op.or]: [
            { 'Allcode.valueVi': { [Op.in]: searchKeywords } },
            { 'Allcode.valueEn': { [Op.in]: searchKeywords } },
        ],
    };

    try {
        const result = await User.findAll({
            include: [
                {
                    model: Doctor_Infor,
                    attributes: ['clinicId', 'specialtyId'],
                },
                {
                    model: Allcode,
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
