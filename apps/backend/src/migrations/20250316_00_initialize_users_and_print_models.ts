import { DataTypes, QueryInterface } from 'sequelize';

interface Props {
    context: QueryInterface;
}

export const up = async ({ context: queryInterface }: Props) => {
    await queryInterface.createTable('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
    await queryInterface.createTable('print_models', {
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
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
        },
        is_published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        image_url: {
            type: DataTypes.STRING,
        },
        file_url: {
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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
};

export const down = async ({ context: queryInterface }: Props) => {
    await queryInterface.dropTable('print_models');
    await queryInterface.dropTable('users');
};
