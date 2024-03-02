import { RedirectType, redirect } from "next/navigation";

export async function GET() {
 redirect("/userarea", RedirectType.replace)
}