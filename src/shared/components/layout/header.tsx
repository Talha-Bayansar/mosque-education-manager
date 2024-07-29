import { cn } from "@/lib/utils";
import { Title } from "./title";

type Props = {
  title?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
};

export const Header = ({ className, title, leading, trailing }: Props) => {
  return (
    <header
      className={cn("flex flex-col gap-2 items-start mb-4 w-full", className)}
    >
      <div className="hidden md:flex w-full items-center justify-between">
        <div className="flex items-center">
          {leading}
          {title && <Title>{title}</Title>}
        </div>
        {trailing}
      </div>
      {(leading || trailing) && (
        <div className="flex gap-4 justify-between items-center w-full md:hidden">
          {leading}
          {trailing}
        </div>
      )}
      {title && <Title className="md:hidden">{title}</Title>}
    </header>
  );
};
