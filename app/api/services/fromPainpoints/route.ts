import { PainpointServices, Service } from "@/sql/models";

export async function PUT(request: Request) {
 const services: any[] = [];
 for (const painpoint of (await request.json()).data.painpoints) {
  const painpointServices = await PainpointServices.findAll({
   where: { painpoint: painpoint },
  });
  for (const painpointService of painpointServices) {
   const service = await Service.findByPk(painpointService.dataValues.service);
   services.push(service);
  }
 }
 return Response.json(services);
}
