import React from "react";

const Buttons = ({ submit, button } : { submit : () => Promise<Boolean>, button : { canScroll: () => boolean, submit: () => void } }) => {

 const handleClick = async () => {
  if (await submit()) button.submit();
 }

 return (
  <div className="pt-10 max-h-24 flex justify-end gap-5">
   <button
    onClick={handleClick}
    className="px-10 py-3 font-medium text-base border-solid border-2 rounded-full border-white text-white bg-transparent hover:opacity-60 hover:cursor-pointer"
   >
    {button.canScroll() ? "Next" : "Done"}
   </button>
  </div>
 );
};

export default Buttons;
