import { Service } from "@/sql/models";

export async function GET() {
 return Response.json(await Service.findAll({}));
}
