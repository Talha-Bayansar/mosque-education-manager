"use client";

import { useSession } from "@/features/auth/hooks/use-session";
import { cn } from "@/lib/utils";
import type { Session, User } from "lucia";

type Props = {
  sessionServer?:
    | {
        user: User;
        session: Session;
      }
    | {
        user: null;
        session: null;
      };
} & React.HTMLAttributes<HTMLDivElement>;

export const PageContainer = ({
  className,
  children,
  sessionServer,
  ...rest
}: Props) => {
  useSession({ initialData: sessionServer });

  return (
    <div className={cn("flex flex-col flex-grow", className)} {...rest}>
      {children}
    </div>
  );
};
