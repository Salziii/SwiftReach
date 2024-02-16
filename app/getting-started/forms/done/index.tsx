import Link from "@/app/(components)/transition/link";
import { motion } from "framer-motion";

const Done = ({
  button,
  data,
  setData,
}: {
  button: any;
  data: any;
  setData: any;
}) => <div className="h-full w-full flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="flex flex-col">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-green-500 w-2/3"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
              d="M4.5 12l6 6 12-15"
            />
          </svg>
        </div>
        <h1 className="flex justify-center font-bold text-4xl pb-4">
          Meeting Vereinbart
        </h1>
        <h2 className="flex justify-center text-2xl mb-12">
          Email checken nicht vergessen 😉
        </h2>
        <div className="flex justify-center">
          <Link className="px-10 py-3 font-medium text-base border-solid border-2 rounded-full border-white text-white bg-transparent hover:opacity-60 hover:cursor-pointer" href="/userarea" >Done</Link>
        </div>
      </div>
    </div>
  </div>

export default Done;
