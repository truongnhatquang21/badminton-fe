import "@/styles/global.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import NextTopLoader from "nextjs-toploader";

import { Toaster } from "@/components/ui/toaster";
import Providers from "@/Contexts/TanstackProvider";
import { ThemeProvider } from "@/Contexts/theme-provider";
import { AppConfig } from "@/utils/AppConfig";

export const metadata: Metadata = {
  title: "Bookminton",
};
export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!AppConfig.locales.includes(props.params.locale)) notFound();

  // Using internationalization in Client Components
  const messages = useMessages();
  // const session = getServerSession(authConfig);

  return (
    <html
      lang={props.params.locale}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body>
        <NextTopLoader color="gray" showSpinner={false} height={2} />
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Providers>
              <div className="mx-auto  ">{props.children}</div>
            </Providers>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
