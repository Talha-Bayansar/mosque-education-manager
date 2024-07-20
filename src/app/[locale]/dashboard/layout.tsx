"use server";

import { getSession } from "@/features/auth/server-actions/auth";
import { routes } from "@/lib/routes";
import { redirect } from "@/navigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await getSession();

  if (!session.session) redirect(routes.signin.root);

  return children;
};

export default DashboardLayout;
