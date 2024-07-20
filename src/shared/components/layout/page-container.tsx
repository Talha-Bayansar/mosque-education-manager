import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const PageContainer = ({ className, children, ...rest }: Props) => {
  return (
    <div className={cn("flex flex-col flex-grow", className)} {...rest}>
      {children}
    </div>
  );
};
