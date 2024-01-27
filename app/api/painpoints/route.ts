import { Painpoint } from "@/sql/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 return NextResponse.json(await Painpoint.findAll());
}
