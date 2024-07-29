import { routes } from "@/lib/routes";
import { Link } from "@/navigation";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const PostersPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header
        leading={<NavigationDrawer />}
        title={t("posters")}
        trailing={
          <Link
            href={routes.dashboard.posters.templates.root}
            className="hover:underline"
          >
            {t("posterTemplates")}
          </Link>
        }
      />
    </Main>
  );
};

export default PostersPage;
