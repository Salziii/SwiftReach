type DotProps = {
 active: boolean;
};

export const Dot = ({ active }: DotProps) => {
 return (
  <div
   className={`w-[20px] h-[20px] rounded-full drop-shadow-lg hover:drop-shadow-sm ${
    active ? "bg-primary-foreground" : "bg-muted"
   }`}
  ></div>
 );
};
