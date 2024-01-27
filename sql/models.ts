import sequelize from "./sequilize";
import { DataTypes } from "sequelize";

const Account = sequelize.define('Account', {
 id: {
  type: DataTypes.BIGINT,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false
 },
 name: {
  type: DataTypes.STRING,
  allowNull: false
 },
 email: {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false
 },
 password: {
  type: DataTypes.STRING
 },
 employee: {
  type: DataTypes.BOOLEAN
 },
 verificationCode: {
  type: DataTypes.STRING(36),
  unique: true
 }
});

const Company = sequelize.define('Company', {
 id: {
  type: DataTypes.BIGINT,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false
 },
 name: {
  type: DataTypes.STRING,
  allowNull: false
 },
 emailDomain: {
  type: DataTypes.STRING,
  unique: true
 },
 contactEmail: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
 },
 stripeCustomerId: {
  type: DataTypes.STRING,
  unique: true
 }
});

const Subscription = sequelize.define('Subscription', {
 id: {
  type: DataTypes.BIGINT,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false
 },
 startingDate: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW,
  allowNull: false
 },
 minimumDate: {
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW,
  allowNull: false
 },
 endingDate: {
  type: DataTypes.DATE
 },
 baseFee: {
  type: DataTypes.BIGINT
 }
});

const SubscriptionServices = sequelize.define("subscriptionServices", {})

const Service = sequelize.define("Service", {
 id: {
  type: DataTypes.BIGINT,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false
 },
 name: {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false
 },
 description: {
  type: DataTypes.TEXT,
 },
 price: {
  type: DataTypes.BIGINT,
  defaultValue: 0,
  allowNull: false
 },
 performanceFee: {
  type: DataTypes.BIGINT,
  defaultValue: 0,
  allowNull: false
 },
 saturated: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
  allowNull: false
 },
 image: {
  type: DataTypes.TEXT,
 }
})

const Painpoint = sequelize.define('Painpoint', {
 id: {
  type: DataTypes.BIGINT,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false
 },
 name: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
 },
 description: {
  type: DataTypes.TEXT,
 },
 image: {
  type: DataTypes.STRING,
  allowNull: false
 }
});

const PainpointServices = sequelize.define('painpointServices', {});
const CompanyPainpoints = sequelize.define('companyPainpoints', {})

Company.hasMany(Account, { foreignKey: "company" })
Subscription.hasOne(Company, { foreignKey: "subscription" })
Account.hasMany(Subscription, { foreignKey: "seller" })
Account.hasMany(SubscriptionServices, { foreignKey: "seller" })
Subscription.hasMany(SubscriptionServices, { foreignKey: "subscription" })
Service.hasMany(SubscriptionServices, { foreignKey: "service" })
Painpoint.hasMany(PainpointServices, { foreignKey: "painpoint" })
Service.hasMany(PainpointServices, { foreignKey: "service" })
Painpoint.hasMany(CompanyPainpoints, { foreignKey: "painpoint" })
Company.hasMany(CompanyPainpoints, { foreignKey: "company" })

Company.sync()
Account.sync()
Subscription.sync()
Painpoint.sync()
Service.sync()
PainpointServices.sync()
CompanyPainpoints.sync()


export { Account, Company, Subscription, Painpoint, PainpointServices, Service, CompanyPainpoints }