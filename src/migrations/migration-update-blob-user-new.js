const { QueryInterface, Sequelize } = require("sequelize");

module.exports = {
    up: (QueryInterface, Sequelize) => {
        return Promise.all([
            QueryInterface.changeColumn('Users', 'image', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            }),
            QueryInterface.changeColumn('bookings', 'image', {
                 type: Sequelize.BLOB('long'),
                 allowNull: true,
             })

        ])
    },
    down: (QueryInterface, Sequelize) => {
        return Promise.all([
            QueryInterface.changeColumn('Users', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            }),
            QueryInterface.changeColumn('bookings', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
}