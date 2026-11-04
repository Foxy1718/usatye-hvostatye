import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Усатые-хвостатые | Взять собаку из приюта «Печатники» в Москве",
  description: "Помогите собакам из приюта «Печатники» найти новый дом. Собаки в добрые руки: привиты, стерилизованы, здоровы. Посмотрите анкеты и заберите друга!",
  keywords: ["взять собаку из приюта", "собаки в добрые руки", "приют Печатники", "пристройство собак Москва", "отдам собаку в хорошие руки"],
  openGraph: {
    title: "Усатые-хвостатые | Приют «Печатники»",
    description: "Собаки, которые ищут дом. Привиты, стерилизованы, ждут вас!",
    url: "https://usatye-hvostatye.vercel.app",
    siteName: "Усатые-хвостатые",
    images: [
      {
        url: "/logo.png", // Показываем ваш логотип при репосте ссылки
        width: 800,
        height: 800,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
    verification: {
    yandex: "2efc4e14667bdf02",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
