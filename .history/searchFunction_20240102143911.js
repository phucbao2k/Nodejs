const { Op } = require("sequelize");
import { User } from "./src/models/user.js";

import { Doctor_Infor } from "./src/models/doctor_infor.js";
import { Allcode } from ("./src/models/allcode.js");


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
