import { Account, Company, Subscription } from "@/sql/models";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {

 const company = await Company.create({
  name: "Rieger Materials",
  contactEmail: "contact@rigger.com"
 })
 const seller = await Account.create({ name: "Nick Singerer", email: "nsingerer@gmail.com", emplyee: true })
 const subscription = await Subscription.create({
  seller: seller!.getDataValue("id"),
 })
 Company.update({ subscription: subscription!.getDataValue("id") }, { where: { id: company!.getDataValue("id") } })
 const companyMember = await Account.create({ name: "SamFuel Rigger", email: "samfuel.rieger01@web.de", company: company!.getDataValue("id") })

 return Response.json({});
}