import { PainpointServices, Service } from "@/sql/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

 const painpointId = request.nextUrl.searchParams.get("painpointId")

 if (!painpointId) return NextResponse.json({ error: "Provide A Painpint ID!" }, { status: 500 })

 const services: any[] = [];

 const painpointServices = await PainpointServices.findAll({
  where: { painpoint: painpointId },
 });

 for (const painpointService of painpointServices) {
  const service = await Service.findByPk(painpointService.dataValues.service);
  services.push(service);
 }

 return Response.json(services);

}
