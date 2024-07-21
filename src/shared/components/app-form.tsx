import { cn } from "@/lib/utils";

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
