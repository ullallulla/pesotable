import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/db';

class PrintModel extends Model {}

PrintModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        fileUrl: {
            type: DataTypes.STRING,
        },
        downloads: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
        },
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'printModel',
    },
);

export default PrintModel;
