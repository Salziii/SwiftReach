import { Company, Painpoint, CompanyPainpoints } from "@/sql/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const companyId = request.nextUrl.searchParams.get("companyId");

 if (!companyId)
  return NextResponse.json({ error: "Provide A Company ID!" }, { status: 400 });

 if (!(await Company.findByPk(companyId)))
  return NextResponse.json(
   { error: `Company with ID ${companyId} does not exist!` },
   { status: 400 }
  );

 const painpoints: any[] = [];

 const companyPainpoints: any[] = await CompanyPainpoints.findAll({
  where: { company: companyId },
 });

 for (const companyPainpoint of companyPainpoints) {
  const painpoint = await Painpoint.findByPk(
   companyPainpoint.dataValues.painpoint
  );
  painpoints.push(painpoint);
 }

 return NextResponse.json(painpoints);
}

export async function POST(request: NextRequest) {
 const req = await request.json();
 const companyId: number = req.companyId;
 const painpoints: number[] = req.painpoints;

 if (!companyId)
  return NextResponse.json({ error: "Provide A Company ID!" }, { status: 400 });
 if (!painpoints)
  return NextResponse.json(
   { error: "Provide At Least One Painpoint!" },
   { status: 400 }
  );

 if (!(await Company.findByPk(companyId)))
  return NextResponse.json(
   { error: `Company with ID ${companyId} does not exist!` },
   { status: 400 }
  );

 for (const painpoint of painpoints) {
  if (painpoint) {
   if (!(await Painpoint.findByPk(painpoint)))
    return NextResponse.json(
     { error: `Painpoint with ID ${painpoint} does not exist!` },
     { status: 400 }
    );

   if (
    !(await CompanyPainpoints.findOne({
     where: { company: companyId, painpoint: painpoint },
    }))
   ) {
    await CompanyPainpoints.create({
     company: companyId,
     painpoint: painpoint,
    });
   }
  }
 }

 return NextResponse.json({}, { status: 200 });
}
