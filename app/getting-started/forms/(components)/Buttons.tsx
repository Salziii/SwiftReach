import React from "react";

const Buttons = (props: any) => {
 const { submit, button } = props;

 return (
  <div className="pt-10 max-h-24 flex justify-end gap-5">
   <button
    onClick={submit}
    className="px-10 py-3 font-medium text-base border-solid border-2 rounded-full border-white text-white bg-transparent hover:opacity-60 hover:cursor-pointer"
   >
    {button.canScroll() ? "Next" : "Finish"}
   </button>
  </div>
 );
};

export default Buttons;
