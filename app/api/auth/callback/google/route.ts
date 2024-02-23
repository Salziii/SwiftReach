import { getOAuth2Client } from "@/lib/google/auth";
import { writeFile } from "fs";
import { RedirectType, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const code = request.nextUrl.searchParams.get("code")

 const auth = await getOAuth2Client()

 auth.getToken(code!, (err, token) => {

  if (err) return NextResponse.json({ error: err }, { status: 400 });

  writeFile(
   "google/token.json",
   JSON.stringify(token),
   (err) => {
    if (err) return NextResponse.json({ error: err }, { status: 500 })
   }
  )
 })

 redirect("/", RedirectType.replace)

}