import { SendVerificationCodeForm } from "@/features/auth/components/send-verification-code-form";
import { VerifyCodeForm } from "@/features/auth/components/verify-code-form";
import { LanguageSelect } from "@/shared/components/language-select";
import { Main } from "@/shared/components/layout/main";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Title } from "@/shared/components/layout/title";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: {
    email?: string;
  };
};

const SignInPage = async ({ searchParams: { email } }: Props) => {
  const t = await getTranslations();

  return (
    <PageContainer className="md:grid md:place-items-center">
      <Main className="md:max-w-[500px] md:items-stretch">
        <header className="flex justify-between items-center mb-4">
          <Title>{t("signIn")}</Title>
          <LanguageSelect className="w-min" />
        </header>
        <div className="flex-grow flex">
          {email ? (
            <VerifyCodeForm email={email} />
          ) : (
            <SendVerificationCodeForm />
          )}
        </div>
      </Main>
    </PageContainer>
  );
};

export default SignInPage;
