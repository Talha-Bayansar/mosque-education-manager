import { SendVerificationCodeForm } from "@/features/auth/components/send-verification-code-form";
import { VerifyCodeForm } from "@/features/auth/components/verify-code-form";
import { Header } from "@/shared/components/ui/header";
import { Main } from "@/shared/components/ui/main";
import { PageContainer } from "@/shared/components/ui/page-container";
import { Title } from "@/shared/components/ui/title";
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
      <Main className="md:max-w-[500px] flex-grow md:items-stretch">
        <Header>
          <Title>{t("signIn")}</Title>
        </Header>
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
