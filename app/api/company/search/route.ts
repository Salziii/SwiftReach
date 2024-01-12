import Company from "@/sql/models/Company";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {

 const { where } = await request.json()
 return Response.json(await Company.findOne({ where: where }));
}