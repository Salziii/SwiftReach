import React from "react";
import { ThreeDot } from "react-loading-indicators";

type LoadingIndicatorProps = {
 loading: boolean;
 children: React.ReactNode;
};

const Buttons = ({ loading, children }: LoadingIndicatorProps) => {
 if (loading)
  return <div className="w-full h-full flex flex-col justify-center">
   <ThreeDot variant="bob" color="#7e22ce" size="medium" />
  </div>

 return children;
};

export default Buttons;
