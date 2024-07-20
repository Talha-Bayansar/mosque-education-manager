import { SendVerificationCodeForm } from "@/features/auth/components/send-verification-code-form";
import { VerifyCodeForm } from "@/features/auth/components/verify-code-form";
import { Header } from "@/shared/components/ui/header";
import { Main } from "@/shared/components/ui/main";
import { PageContainer } from "@/shared/components/ui/page-container";
import { Title } from "@/shared/components/ui/title";

type Props = {
  searchParams: {
    email?: string;
  };
};

const SignInPage = ({ searchParams: { email } }: Props) => {
  return (
    <PageContainer>
      <Main className="flex-grow">
        <Header>
          <Title>Sign in</Title>
        </Header>
        <div className="flex flex-grow flex-col md:justify-center md:items-center">
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
