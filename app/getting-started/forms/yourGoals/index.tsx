import React from "react";
import Buttons from "../(components)/Buttons";
import GoalCard from "./(components)/GoalCard";
import { AreaChartIcon, BarChart4Icon, BarChartIcon, LineChartIcon } from "lucide-react";

export type Goal = {
 title: string;
 description?: string;
 icon:any;
};

const YourGoals = (props: any) => {
 const { button, data, setData } = props;

 const goals: Goal[] = [
  { title: "More Customers", icon: <LineChartIcon className="scale-150 text-primary-foreground" /> },
  { title: "SwiftReach", description: "Work with us", icon: <BarChart4Icon className="scale-150 text-primary-foreground" /> },
  {
   title: "Bigger Social Media Profiles",
   description: "Boost your reach on soical media",
   icon: <AreaChartIcon className="scale-150 text-primary-foreground" />,
  },
 ]; 

 async function submit() {
  button.submit();
 }

 return (
  <div className="w-5/6 flex flex-col justify-center">
   <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
    {goals.map((goal) => (
     <GoalCard goal={goal} />
    ))}
   </div>
   <Buttons submit={submit} button={button} />
  </div>
 );
};

export default YourGoals;
