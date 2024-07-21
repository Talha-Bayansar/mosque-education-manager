import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/shared/providers/react-query-provider";
import { Toaster } from "@/shared/components/ui/sonner";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mosque education manager",
  description:
    "Mosque education manager is an application to manage various aspects of the islamic education in mosques.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <div
              className="flex flex-col min-h-screen w-full overflow-x-hidden bg-background"
              vaul-drawer-wrapper=""
            >
              {children}
            </div>
          </ReactQueryProvider>
          <Toaster position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
