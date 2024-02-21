import { NextRequest, NextResponse } from "next/server";
import { format } from "../(utils)/formatter";
import { Company } from "@/sql/models";

export async function GET(request: NextRequest) {
 try {

  const id = request.nextUrl.searchParams.get("id");

  return NextResponse.json(await format(await Company.findByPk(id!), 3), { status: 200 });

 } catch (error: any) {
  return Response.json({ errors: error.message }, { status: 500 });
 }
}