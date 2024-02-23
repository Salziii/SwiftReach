import { emailValid, getEmailDomain, isCustomEmail } from "@/lib/utils";
import db from "@/prisma/database";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {

 await db.company.update({
  where: { id: 3 },
  data: {
   steps: {
    createMany: {
     data: (
      await db.step.findMany()
     ).map((step) => ({ stepId: step.id, status: "PENDING" })),
    },
   },
  },
 });

}
