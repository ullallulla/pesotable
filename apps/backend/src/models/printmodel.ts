import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../utils/db';

type PrintModelAttributes = {
    id: number,
    title: string,
    description: string,
    userId: string,
    price: number,
    isPublished: boolean,
    imageUrl: string,
    fileUrl: string,
    downloads: number,
    rating: number,
    featured: boolean
}

type PrintModelCreationAttributes = Optional<PrintModelAttributes, 'id'>

class PrintModel extends Model<PrintModelAttributes, PrintModelCreationAttributes> {
    declare id: number;
    declare title: string;
    declare description: string;
    declare userId: string;
    declare price: number;
    declare isPublished: boolean;
    declare imageUrl: string;
    declare fileUrl: string;
    declare downloads: number;
    declare rating: number;
    declare featured: boolean;
}

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
            type: DataTypes.STRING,
            allowNull: false,
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
        featured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: 'printModel',
    },
);

export default PrintModel;
