"use server";

import db from "@/prisma/database";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export async function LoginRequired({
 children,
 path,
}: {
 children: React.ReactNode;
 path: string;
}) {
 if (!cookies().get("token")) redirect(path, RedirectType.push);
 return <>{children}</>;
}

export async function LoginForbidden({
 children,
 path,
}: {
 children: React.ReactNode;
 path: string;
}) {
 if (cookies().get("token")) redirect(path, RedirectType.push);
 return <>{children}</>;
}

export async function RequireEmployee({
 children,
 path,
}: {
 children: React.ReactNode;
 path: string;
}) {
 const token: string | undefined = cookies().get("token")?.value;
 if (!token) redirect(path, RedirectType.push);
 const data: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
 const account = await db.account.findUnique({ where: { id: data.id } });
 if (account?.role === "USER") redirect(path, RedirectType.push);

 return <>{children}</>;
}

export async function logout() {
 cookies().delete("token");
 cookies().delete("companyToken");
}
