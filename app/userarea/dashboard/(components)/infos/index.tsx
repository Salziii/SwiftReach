import { InfinityIcon } from "lucide-react"

export default function Infos({ infos }: { infos: any[] }) {
  return <div className="mt-8 w-full flex justify-between gap-6">
  {infos.map((info) => (
   <div className="w-full h-32 bg-card border shadow-lg rounded-md px-2 flex" >
    <div className="w-1/4 flex justify-center">
     <div className="flex flex-col justify-center">
      {info.icon}
     </div>
    </div>
    <div className="h-full flex flex-col justify-center">
     <h2 className="font-bold">
      {info.title}
     </h2>
     <h1 className="font-bold text-4xl mt-1">
      {info.data} {info.unit}
     </h1>
     <h3 className="text-sm mt-2">
      {
       (() => {
        const percent = Math.round((100 * info.data / info.lastData) - 100)
        return <div className="flex">
         <span className={(+!(percent > 0) ^ +info.betterMore ? "text-green-500" : "text-red-500") + " flex mr-[3px]"}>
          {
           isFinite(percent)
            ? <>{Math.abs(percent)}</>
            : <InfinityIcon className="mr-[1px]" size={18} />
          }
          %
         </span>
         {(percent >= 0) ? "more" : "less"} than last week
        </div>
       })()
      }
     </h3>
    </div>
   </div>
  ))}
 </div>
}
