
require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE_NAME,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": process.env.DB_DIALECT,
        "define": {
            "freezeTableName": true
        },
        dialectOptions:
            process.env.DB_SSL === 'true' ?
                {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                } : {}
        ,
        "timezone": "+07:00"
    },
    "test": {
        "username": "admin",
        "password": "phuccnttc63",
        "database": "tabaophuc",
        "host": "database-1.cm0zuquo48wm.ap-southeast-1.rds.amazonaws.com",
        "dialect": "mysql"
    },
    "production": {
        "username": "admin",
        "password": "phuccnttc63",
        "database": "tabaophuc",
        "host": "database-1.cm0zuquo48wm.ap-southeast-1.rds.amazonaws.com",
        "dialect": "mysql"
    }
};