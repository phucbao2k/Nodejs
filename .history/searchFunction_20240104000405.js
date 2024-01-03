// searchFunction.js
const { Op, literal } = require("sequelize");
const { User, Doctor_Infor, Allcode } = require("./src/models");

async function searchFunction() {
    const searchKeywords = ["Thạc sĩ", "Tiến sĩ", "Phó giáo sư", "Giáo sư", "Bachelor", "Doctor", "Associate Professor", "Professor"];

    const userSearchCondition = {
        [Op.or]: [
            literal(`User.firstName LIKE '%${searchKeywords.join("%' OR User.firstName LIKE '%")}%'`),
            literal(`User.lastName LIKE '%${searchKeywords.join("%' OR User.lastName LIKE '%")}%'`),
        ],
    };

    const allcodeSearchCondition = {
        [Op.or]: [
            literal(`Position.valueVi IN ('${searchKeywords.join("', '")}')`),
            literal(`Position.valueEn IN ('${searchKeywords.join("', '")}')`),
        ],
    };

    try {
        const result = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'], // Chỉ lấy những trường cần thiết
            include: [
                {
                    model: Doctor_Infor,
                    attributes: ['clinicId', 'specialtyId'],
                    where: {
                        doctorId: literal('`User`.`id`'), // Sử dụng User.id làm điều kiện cho quan hệ
                    },
                },
                {
                    model: Allcode,
                    as: 'Position',
                    attributes: ['positionId'],
                    where: allcodeSearchCondition,
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
