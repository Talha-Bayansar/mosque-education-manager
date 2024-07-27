import { cn, generateArray } from "@/lib/utils";
import { ButtonSkeleton } from "./ui/button";
import { InputSkeleton } from "./ui/input";

type Props = {
  submitButton: React.ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

export const AppForm = ({
  children,
  className,
  submitButton,
  ...rest
}: Props) => {
  return (
    <form
      className={cn(
        "flex flex-col flex-grow w-full max-w-2xl justify-between md:justify-start gap-8",
        className
      )}
      {...rest}
    >
      <div className="flex flex-col gap-8">{children}</div>
      {submitButton}
    </form>
  );
};

export const AppFormSkeleton = () => {
  return (
    <form className="flex flex-col flex-grow w-full max-w-2xl justify-between md:justify-start gap-8">
      <div className="flex flex-col gap-8">
        {generateArray(3).map((item) => (
          <InputSkeleton key={item} />
        ))}
      </div>
      <ButtonSkeleton />
    </form>
  );
};
