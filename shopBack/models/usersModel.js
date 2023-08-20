import {Model, DataTypes} from 'sequelize';
import sequelize from "../services/sequelize";

class Users extends Model {

}

Users.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return undefined
            }
        },
        imageProfile: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        tableName: 'users',
        modelName: 'Users',
        timestamps:false,
        sequelize,
    })

export default Users;