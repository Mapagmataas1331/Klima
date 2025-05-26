import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./animations.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://etiquette-conf.ru"),
  title: {
    default: "Конференции по этикету",
    template: "Конференции по этикету | %s",
  },
  description:
    "Организация премиальных мероприятий с фокусом на деловом этикете. Мастер-классы от топ-спикеров, нетворкинг в среде профессионалов и кейсы из реальной практики.",
  alternates: {
    canonical: "https://etiquette-conf.ru",
  },
  applicationName: "Etiquette",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://etiquette-conf.ru",
    siteName: "Etiquette Conf",
    title: "Конференции по Этикету | Профессиональные мероприятия международного уровня",
    description:
      "Организация премиальных мероприятий с фокусом на деловом этикете. Мастер-классы от топ-спикеров, нетворкинг в среде профессионалов и кейсы из реальной практики.",
    images: [
      {
        url: "https://etiquette-conf.ru/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Конференции по Этикету | Искусство делового общения на международном уровне",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Конференции по Этикету | Профессиональные этикет-мероприятия",
    description:
      "Премиум ивенты с экспертами международного уровня: этикет, протокол и деловая коммуникация",
    images: ["https://etiquette-conf.ru/og.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Etiquette",
    statusBarStyle: "black-translucent",
  },
  other: {
    "vk:image": "https://etiquette-conf.ru/og.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  keywords: [
    "ettiquette conferences",
    "ettiquette conference",
    "etiquette conf",
    "ettiquette",
    "conferences",
    "conference",
    "conf",
    "конференции по этикету",
    "конференция по этикету",
    "конференции",
    "конференция",
    "этикет",
    "этикет-мероприятия",
    "этикет-мероприятие",
    "этикет мероприятия",
    "этикет мероприятие",
    "мероприятия",
    "мероприятие",
    "деловой этикет",
    "деловая коммуникация",
    "протокол",
    "бизнес-этикет",
    "бизнес этикет",
    "бизнес",
    "профессиональные мероприятия",
    "профессиональное мероприятие",
    "профессиональная конференция",
    "профессиональные конференции",
    "премиум мероприятия",
    "премиум мероприятие",
    "премиум конференция",
    "премиум конференции",
    "премиум ивент",
    "премиум ивенты",
    "международные мероприятия",
    "международное мероприятие",
    "международная конференция",
    "международные конференции",
    "мероприятия международного уровня",
    "мероприятие международного уровня",
    "конференция международного уровня",
    "конференции международного уровня",
    "мероприятия на международном уровне",
    "мероприятие на международном уровне",
    "конференция на международном уровне",
    "конференции на международном уровне",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
