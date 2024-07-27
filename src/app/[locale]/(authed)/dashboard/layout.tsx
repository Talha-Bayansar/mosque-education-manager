"use server";

import { getSession } from "@/features/auth/server-actions/auth";
import { routes } from "@/lib/routes";
import { redirect } from "@/navigation";
import { PageContainer } from "@/shared/components/layout/page-container";
import { SideNavigation } from "@/shared/components/layout/side-navigation";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await getSession();

  if (!session.session) redirect(routes.signin.root);

  return (
    <PageContainer sessionServer={session} className="sm:pl-[72px]">
      <SideNavigation />
      {children}
    </PageContainer>
  );
};

export default DashboardLayout;
