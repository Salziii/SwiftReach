import { Step, companySteps } from "@/sql/models";
import { NextRequest, NextResponse } from "next/server";
import { format } from "../(utils)/formatter";

export async function GET(request: NextRequest) {
 const steps : any[] = []
 const stepsRes = await Step.findAll()
 for (let i = 0; i < stepsRes.length; i++) {
  steps.push(await format(stepsRes[i]))
 }
 return NextResponse.json(steps, { status: 200 })
}

const steps = [
 { title: "Erwartbares", description: "Was in Zukunft zu erwarten ist", status: "finished", video: "" },
 { title: "Erinnerungen", description: "Checkliste abarbeiten", status: "pending", video: "" },
 { title: "Ads Manager Integration", description: "Werbemanager Daten überreichen", status: "pending", video: "" },
 { title: "Euere Kunden", description: "Ziel Markt herausfinden", status: "pending", video: "" },
 { title: "Strategie Session", description: "KickOff Call buchen", status: "pending", video: "" },
 { title: "Liftoff", description: "Letzte Worte", status: "pending", video: "" }
]

export async function POST() {

 for (let i = 0; i < steps.length; i++) {
  await Step.create({ label: steps[i].title, description: steps[i].description, youtubeVideoId: steps[i].video })
  await companySteps.create({ company: 2, step: i+1 })
 }

 await companySteps.update({ status: "finished" }, {  where: { company: 2, step: 1 } })
 await companySteps.update({ status: "pending" }, {  where: { company: 2, step: 2 } })

 return NextResponse.json({})

}