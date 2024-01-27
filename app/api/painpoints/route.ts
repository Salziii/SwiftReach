import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import { Company, Painpoint, PainpointServices, Service } from "@/sql/models";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
 return Response.json(await Painpoint.findAll({}));
}

export async function POST(request: Request) {

 Service.create({ name: "Point", image: "/strategy/3.webp" })

 return Response.json({});
}