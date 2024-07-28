import { routes } from "@/lib/routes";
import { Link } from "@/navigation";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const PostersPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("posters")}</Title>
        <div className="flex flex-grow justify-end">
          <Link
            href={routes.dashboard.posters.templates.root}
            className="hover:underline"
          >
            {t("posterTemplates")}
          </Link>
        </div>
      </Header>
    </Main>
  );
};

export default PostersPage;
