import { PageContainer } from "@/shared/components/layout/page-container";
import { View } from "@/shared/components/layout/view";
import { Spinner } from "@/shared/components/spinner";
import { getTranslations } from "next-intl/server";

const AuthLoading = async () => {
  const t = await getTranslations();
  return (
    <PageContainer className="justify-center items-center">
      <View className="items-center">
        <Spinner size={40} />
        <p className="text-2xl text-center">{t("authenticating")}...</p>
      </View>
    </PageContainer>
  );
};

export default AuthLoading;
