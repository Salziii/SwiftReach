"use server";

import { hashSync } from "bcrypt";

export async function hash(password: string): Promise<string> {
 return hashSync(password, 10);
}
