import { DataTypes, QueryInterface } from 'sequelize';

interface Props {
    context: QueryInterface;
}
export const up = async ({ context: queryInterface }: Props) => {
    await queryInterface.addColumn('print_models', 'featured', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    });
};

export const down = async ({ context: queryInterface }: Props) => {
    await queryInterface.removeColumn('print_models', 'featured');
};
