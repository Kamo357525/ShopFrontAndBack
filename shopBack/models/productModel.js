import {Model, DataTypes} from 'sequelize';
import sequelize from "../services/sequelize";
import Users from "./usersModel";

class Product extends Model {

}

Product.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'product',
        modelName: 'Product',
        timestamps:false,
        sequelize,
    })

Product.belongsTo(Users, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
Users.hasMany(Product, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
export default Product;