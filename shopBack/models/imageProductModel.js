import {Model, DataTypes} from 'sequelize';
import sequelize from "../services/sequelize";
import Product from "./productModel";

class Images extends Model {

}

Images.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        src: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'images',
        modelName: 'Images',
        timestamps:false,
        sequelize,
    })


Images.belongsTo(Product, {
    foreignKey: 'productId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Product.hasMany(Images, {
    foreignKey: 'productId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});

export default Images;