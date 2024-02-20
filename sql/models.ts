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

const Meeting = sequelize.define('Meeting', {
 id: {
  type: DataTypes.BIGINT,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false
 },
 label: {
  type: DataTypes.STRING,
  allowNull: false
 },
 link: {
  type: DataTypes.TEXT
 },
 start: {
  type: DataTypes.DATE,
  allowNull: false
 },
 end: {
  type: DataTypes.DATE,
  allowNull: false
 }
});

const Step = sequelize.define('Step', {
 id: {
  type: DataTypes.BIGINT,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false
 },
 label: {
  type: DataTypes.STRING,
  allowNull: false
 },
 description: {
  type: DataTypes.TEXT,
  allowNull: false
 },
 youtubeVideoId: {
  type: DataTypes.STRING,
  allowNull: false
 }
});

const SubscriptionServices = sequelize.define("subscriptionServices", {})
Account.hasMany(SubscriptionServices, { foreignKey: "seller" })
Subscription.hasMany(SubscriptionServices, { foreignKey: "subscription" })
Service.hasMany(SubscriptionServices, { foreignKey: "service" })
SubscriptionServices.sync()

const PainpointServices = sequelize.define('painpointServices', {});
Painpoint.hasMany(PainpointServices, { foreignKey: "painpoint" })
Service.hasMany(PainpointServices, { foreignKey: "service" })
PainpointServices.sync()

const CompanyPainpoints = sequelize.define('companyPainpoints', {});
Painpoint.hasMany(CompanyPainpoints, { foreignKey: "painpoint" })
Company.hasMany(CompanyPainpoints, { foreignKey: "company" })
CompanyPainpoints.sync()

const meetingAccounts = sequelize.define('meetingAccounts', {})
Meeting.hasMany(meetingAccounts, { foreignKey: "meeting" })
Account.hasMany(meetingAccounts, { foreignKey: "account" })
meetingAccounts.sync()

const companySteps = sequelize.define('companySteps', {
 status: {
  type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "unavailable"
 }
})
Step.hasMany(companySteps, { foreignKey: "step" })
Company.hasMany(companySteps, { foreignKey: "company" })
companySteps.sync()

Company.hasMany(Account, { foreignKey: "company" })
Subscription.hasOne(Company, { foreignKey: "subscription" })
Account.hasMany(Subscription, { foreignKey: "seller" })

Company.sync()
Account.sync()
Subscription.sync()
Painpoint.sync()
Service.sync()
Meeting.sync()
Step.sync()

export { Account, Company, Subscription, SubscriptionServices, Painpoint, PainpointServices, Service, CompanyPainpoints, Meeting, meetingAccounts, Step, companySteps }