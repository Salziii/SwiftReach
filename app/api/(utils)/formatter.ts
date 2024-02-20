import { Account, Company, CompanyPainpoints, Meeting, Painpoint, PainpointServices, Service, Step, Subscription, SubscriptionServices, companySteps, meetingAccounts } from "@/sql/models";
import { Model } from "sequelize/types/model";

export const format = (model: Model | null, depth : number = 1) => new Promise(async (resolve) => {

 depth--;
 const extended = depth > 0

 const data = model?.toJSON()

 if (model instanceof Account) {

  const meetings: any[] = []
  const meetingsRes = await meetingAccounts.findAll({ where: { account: data.id } })
  for (let i = 0; i < meetingsRes.length; i++) {
   meetings.push(extended ? await format(await Meeting.findByPk(meetingsRes[i].toJSON().meeting), depth) : meetingsRes[i].toJSON().meeting)
  }

  const soldSubscriptions: any[] = []
  const soldSubscriptionsRes = await Subscription.findAll({ where: { seller: data.id } })
  for (let i = 0; i < soldSubscriptionsRes.length; i++) {
   soldSubscriptions.push(extended ? await format(meetingsRes[i]) : meetingsRes[i].dataValues.id, depth)
  }

  const soldServices: any[] = []
  const soldServicesRes = await SubscriptionServices.findAll({ where: { seller: data.id } })
  for (let i = 0; i < soldServicesRes.length; i++) {
   soldServices.push({
    service: extended ? await format(await Service.findByPk(soldServicesRes[i].toJSON().service), depth) : soldServicesRes[i].toJSON().service,
    subscription: extended ? await format(await Subscription.findByPk((soldServicesRes[i].toJSON().subscription)), depth) : soldServicesRes[i].toJSON().subscription
   })
  }

  resolve({
   id: data.id,
   email: data.email,
   name: data.name,
   company: data.company ? extended ? await format(await Company.findByPk(data.company), depth) : data.company : null,
   employee: data.employee,
   meetings: meetings,
   sales: {
    subscriptions: soldSubscriptions,
    services: soldServices
   }
  })

 }

 if (model instanceof Company) {

  const accounts : any[] = []
  const accountsRes = await Account.findAll({ where: { company: data.id } })
  for (let i = 0; i < accountsRes.length; i++) {
   accounts.push(extended ? await format(accountsRes[i], depth) : accountsRes[i].toJSON().id)
  }

  const painpoints : any[] = []
  const painpointsRes = await CompanyPainpoints.findAll({ where: { company: data.id } })
  for (let i = 0; i < painpointsRes.length; i++) {
   painpoints.push(extended ? await format(await Painpoint.findByPk(painpointsRes[i].toJSON().painpoint), depth) : painpointsRes[i].toJSON().painpoint)
  }

  const steps : any[] = []
  const stepsRes = await companySteps.findAll({ where: { company: data.id } })
  for (let i = 0; i < stepsRes.length; i++) {
   steps.push({
    status: stepsRes[i].toJSON().status,
    step: extended ? await format(await Step.findByPk(stepsRes[i].toJSON().step), depth) : stepsRes[i].toJSON().step
   })
  }

  resolve({
   id: data.id,
   name: data.name,
   emailDomain: data.emailDomain,
   contactEmail: data.contactEmail,
   subscription: data.subscription ? extended ? await format(await Subscription.findByPk(data.subscription), depth) : data.subscription : null,
   accounts: accounts,
   painpoints: painpoints,
   steps: steps
  })

 }

 if (model instanceof Subscription) {

  const services: any[] = []
  const servicesRes = await SubscriptionServices.findAll({ where: { subscription: data.subscription } })
  for (let i = 0; i < servicesRes.length; i++) {
   services.push(extended ? await format(await Service.findByPk(servicesRes[i].toJSON().service), depth) : servicesRes[i].toJSON().service)
  }

  resolve({
   id: data.id,
   seller: extended ? await format(await Account.findByPk(data.seller), depth) : data.seller,
   startingDate: data.startingDate,
   minimumDate: data.minimumDate,
   endingDate: data.endingDate,
   baseFee: data.baseFee
  })

 }

 if (model instanceof Service) {

  const painpoints : any[] = []
  const painpointsRes = await PainpointServices.findAll({ where: { service: data.id } })
  for (let i = 0; i < painpointsRes.length; i++) {
   painpoints.push(extended ? await format(await Painpoint.findByPk(painpointsRes[i].toJSON().painpoint), depth) : painpointsRes[i].toJSON().painpoint)
  }

  resolve({
   id: data.id,
   name: data.name,
   description: data.description,
   price: data.description,
   performanceFee: data.performanceFee,
   saturated: data.saturated,
   image: data.image,
   painpoints: painpoints
  })

 }

 if (model instanceof Meeting) {

  const members: any[] = []
  const membersRes = await meetingAccounts.findAll({ where: { meeting: data.id } })
  for (let i = 0; i < membersRes.length; i++) {
   members.push(extended ? await format(await Account.findByPk(membersRes[i].toJSON().account), depth) : membersRes[i].toJSON().meeting)
  }

  resolve({
   id: data.id,
   label: data.label,
   link: data.link,
   start: data.start,
   end: data.end,
   members: members
  })

 }

 if (model instanceof Painpoint) {

  const services: any[] = []
  const servicesRes = await PainpointServices.findAll({ where: { painpoint: data.id } })
  for (let i = 0; i < servicesRes.length; i++) {
   services.push(extended ? await format(await Service.findByPk(servicesRes[i].toJSON().service), depth) : servicesRes[i].toJSON().service)
  }

  const companys: any[] = []
  const companysRes = await CompanyPainpoints.findAll({ where: { painpoint: data.id } })
  for (let i = 0; i < companysRes.length; i++) {
   companys.push(extended ? await format(await Company.findByPk(companysRes[i].toJSON().company), depth) : companysRes[i].toJSON().company)
  }

  resolve({
   id: data.id,
   name: data.name,
   description: data.description,
   image: data.image
  })

 }

 if (model instanceof Step) {

  resolve({
   id: data.id,
   label: data.label,
   description: data.description,
   video: data.youtubeVideoId
  })

 }

 resolve({})

})