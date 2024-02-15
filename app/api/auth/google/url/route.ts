import { getOAuth2Client } from "@/lib/google/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

 const auth = await getOAuth2Client()

 return NextResponse.json({
  authUrl: auth.generateAuthUrl({
   access_type: 'offline',
   scope: ['https://www.googleapis.com/auth/calendar']
  })
 })
}
