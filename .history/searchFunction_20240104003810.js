// searchFunction.js
const { Op } = require("sequelize");
const { User, Doctor_Infor, Allcode } = require("./src/models");

async function searchFunction() {
    const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Bachelor", "Doctor", "Associate Professor", "Professor"];

    const allcodeSearchCondition = {
        [Op.or]: [
            { valueVi: { [Op.in]: searchKeywords } },
            { valueEn: { [Op.in]: searchKeywords } },
        ],
    };

    try {
        const result = await Allcode.findAll({
            where: allcodeSearchCondition,
            raw: true,
        });

        return result;
    } catch (error) {
        console.error('Error executing Sequelize query:', error);
        throw new Error('Internal Server Error');
    }
}

module.exports = searchFunction;
