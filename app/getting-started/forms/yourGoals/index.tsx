import React, { useState } from "react";
import Buttons from "../(components)/Buttons";
import GoalCard from "./(components)/GoalCard";
import { AreaChartIcon, BarChart4Icon, BarChartIcon, LineChartIcon } from "lucide-react";
import LoadingIndicator from "../(components)/LoadingIndicator";
import { toast } from "sonner";
import axios from "axios";

export type Goal = {
 title: string;
 description?: string;
 icon:any;
};

const YourGoals = (props: any) => {
 const { button, data, setData } = props;

 const [loading, setLoading] = useState(false);

 const [selectedGoals, setSelectedGoals] = useState<number[]>([]);

 const handleClick = (i:number) => {
  const tempArray = [...selectedGoals]
  if(tempArray[i]==i){delete tempArray[i]}
  else {tempArray[i]=i}

  setSelectedGoals(tempArray)

  console.log(selectedGoals)
 }

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

  setLoading(true)

  if (selectedGoals.length < 1) {
   
   setLoading(false)

   toast.warning("Whoops!", {
     description: "Select at least 1 goal!"
   })

  } else {

   const res = await axios.post("/api/company", {  })

   const { error, painpoints } = res.data;

   if (error) {

     setLoading(false)

     toast.warning("Whoops!", {
       description: error
     })

    } else {

      setData({
        ...data,
        painpoints: painpoints,
      });

      setLoading(false);

      button.submit();
    }

   button.submit();

  }

 }

 return (
  <div className="w-5/6 flex flex-col justify-center">
   <LoadingIndicator loading={loading}>
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
     {goals.map((goal, i) => (
      <GoalCard goal={goal} selected={selectedGoals[i]==i} handleClick={handleClick} index={i} />
     ))}
    </div>
    <Buttons submit={submit} button={button} />
   </LoadingIndicator>
  </div>
 );
};

export default YourGoals;
