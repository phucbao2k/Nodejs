const { Op } = require("sequelize");
const { User, Doctor_Infor, Allcode } = require("./src/models");

async function searchFunction(searchTerm) {
    // Nếu searchTerm không tồn tại hoặc là chuỗi trống, trả về kết quả tất cả các giá trị khớp với searchKeywords
    if (!searchTerm || searchTerm.trim() === "") {
        return Doctor_Infor.findAll({
            attributes: ['valueVi', 'valueEn'],  // Chọn các cột cần hiển thị
            raw: true,
        });
    }

    // Nếu searchTerm tồn tại, giới hạn kết quả dựa trên searchTerm
    const doctorInforSearchCondition = {
        [Op.or]: [
            { valueVi: { [Op.like]: `%${searchTerm}%` } },
            { valueEn: { [Op.like]: `%${searchTerm}%` } },
        ],
    };

    try {
        const result = await Doctor_Infor.findAll({
            attributes: ['valueVi', 'valueEn'],  // Chọn các cột cần hiển thị
            where: doctorInforSearchCondition,
            raw: true,
        });

        return result;
    } catch (error) {
        console.error('Error executing Sequelize query:', error);
        throw new Error('Internal Server Error');
    }
}

module.exports = searchFunction;
