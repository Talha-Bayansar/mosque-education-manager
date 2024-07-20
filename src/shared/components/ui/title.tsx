import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLHeadingElement>;

export const Title = ({ children, className, ...rest }: Props) => {
  return (
    <h1 className={cn("text-3xl font-bold tracking-tight", className)}>
      {children}
    </h1>
  );
};
