type StepTitleProps = {
 active: boolean;
 title: string;
};

export const StepTitle = ({ active, title }: StepTitleProps) => {
 return (
  <h2
   className={`text-md lg:text-xl font-semibold drop-shadow-lg hover:drop-shadow-sm cursor-default ${
    active ? "text-primary-foreground" : "text-border"
   }`}
  >
   {title}
  </h2>
 );
};
