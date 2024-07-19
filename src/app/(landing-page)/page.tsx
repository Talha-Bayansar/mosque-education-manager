import { routes } from "@/lib/routes";
import { Button } from "@/shared/components/ui/button";
import { Main } from "@/shared/components/ui/main";
import { PageContainer } from "@/shared/components/ui/page-container";
import Link from "next/link";

export default function Page() {
  return (
    <PageContainer>
      <Main className="justify-center md:items-center flex-grow gap-10">
        <div className="text-center space-y-6">
          <div className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">Mosque education manager</h1>
          </div>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto">
            Manage the education system with ease for your mosque.
          </p>

          <div className="space-y-4 md:space-x-4">
            <Button className="w-full md:w-1/3" asChild>
              <Link href={routes.dashboard.root}>Get Started</Link>
            </Button>
          </div>
        </div>
      </Main>
    </PageContainer>
  );
}
