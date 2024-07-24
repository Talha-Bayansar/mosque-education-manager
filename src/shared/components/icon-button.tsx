"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import React from "react";

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Button
        variant={"ghost"}
        className={cn("w-auto h-auto rounded-full p-3", className)}
        ref={ref}
        {...rest}
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
