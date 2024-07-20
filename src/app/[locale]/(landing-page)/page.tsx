import { routes } from "@/lib/routes";
import { Link } from "@/navigation";
import { Button } from "@/shared/components/ui/button";
import { Main } from "@/shared/components/ui/main";
import { PageContainer } from "@/shared/components/ui/page-container";
import { getTranslations } from "next-intl/server";

export default async function LandingPage() {
  const t = await getTranslations();

  return (
    <PageContainer>
      <Main className="justify-center md:items-center flex-grow gap-10">
        <div className="text-center space-y-6">
          <div className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">{t("appName")}</h1>
          </div>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto">
            {t("appDescription")}
          </p>

          <div className="space-y-4 md:space-x-4">
            <Button className="w-full md:w-1/3" asChild>
              <Link href={routes.dashboard.root}>{t("getStarted")}</Link>
            </Button>
          </div>
        </div>
      </Main>
    </PageContainer>
  );
}
