import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config';
import { Umzug, SequelizeStorage } from 'umzug';

export const sequelize = new Sequelize(DATABASE_URL);

const migrationConf = {
    migrations: {
        glob: 'src/migrations/*.ts',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
};

export const runMigrations = async () => {
    const migrator = new Umzug(migrationConf);
    const migrations = await migrator.up();
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    });
};

export const rollbackMigration = async () => {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConf);
    await migrator.down();
};

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await runMigrations();
        console.log('connected to database');
    } catch (error) {
        console.log('failed to connect to the database');
        console.log(error);
        return process.exit(1);
    }
    return null;
};
