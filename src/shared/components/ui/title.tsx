import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLHeadingElement>;

export const Title = ({ children, className, ...rest }: Props) => {
  return (
    <h1 className={cn("text-4xl font-semibold", className)}>{children}</h1>
  );
};
