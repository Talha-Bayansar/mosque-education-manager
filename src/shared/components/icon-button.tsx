"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ children, className, ...rest }: Props) => {
  return (
    <Button
      variant={"ghost"}
      className={cn("h-auto rounded-full p-3", className)}
      {...rest}
    >
      {children}
    </Button>
  );
};
