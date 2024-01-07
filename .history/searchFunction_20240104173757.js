// searchFunction.js
const { Op } = require("sequelize");
const { User, Doctor_Infor, Allcode } = require("./src/models");

async function searchFunction(searchTerm) {
    const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Master", "Doctor", "Associate Professor", "Professor"];

    // Nếu searchTerm không tồn tại hoặc là chuỗi trống, trả về kết quả tất cả các giá trị khớp với searchKeywords
    if (!searchTerm || searchTerm.trim() === "") {
        return Allcode.findAll({
            where: {
                [Op.or]: [
                    { valueVi: { [Op.in]: searchKeywords } },
                    { valueEn: { [Op.in]: searchKeywords } },
                ],
            },
            raw: true,
        });
    }

    // Nếu searchTerm tồn tại, giới hạn kết quả dựa trên searchTerm
    const allcodeSearchCondition = {
        [Op.or]: [
            { valueVi: { [Op.like]: `%${searchTerm}%` } },
            { valueEn: { [Op.like]: `%${searchTerm}%` } },
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
