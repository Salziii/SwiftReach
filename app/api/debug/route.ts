import { Painpoint } from "@/sql/models";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
 
 Painpoint.create({ name: "Wenig Besucher", description: "Ihr wollt mehr Kunden?", image: "https://cdn-icons-png.flaticon.com/512/77/77672.png" })
 Painpoint.create({ name: "Schlechte Conversion Rate", description: "Ihr hättet gerne entschlossenere Kunden?", image: "https://cdn-icons-png.flaticon.com/512/2278/2278988.png" })
 Painpoint.create({ name: "Kleine Socialmedia Profile", description: "Mehr Follower auf Instagram, Facebook, ... gefällig?", image: "https://cdn-icons-png.flaticon.com/512/983/983886.png" })

 return Response.json({});
}
