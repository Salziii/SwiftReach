import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
 dialect: 'sqlite',
 storage: 'sql/database.sqlite',
 logging: false
});

export default sequelize;
