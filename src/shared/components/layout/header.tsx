import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement>;

export const Header = ({ children, className, ...rest }: Props) => {
  return (
    <header className={cn("flex items-center mb-4", className)} {...rest}>
      {children}
    </header>
  );
};
