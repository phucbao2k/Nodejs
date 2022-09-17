

export function up(queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.changeColumn('Users', 'image', {npx
            type: Sequelize.BLOB('long'),
            allowNull: true,
        })
    ])
}
export function down(queryInterface, Sequelize) {
    return Promise.all([
        queryInterface.changeColumn('Users', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        })
    ])
}