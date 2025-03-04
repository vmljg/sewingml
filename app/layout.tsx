import "./globals.css";
import type { Viewport } from "next";
import { splineSans } from "@/assets/fonts";
import { UserProvider } from "@/lib/auth";
import { getUser } from "@/lib/db/queries";
import TopNavigation from "@/components/top-navigation-with-mobile";
import AppNavigation from "@/components/app-navigation";
import MegaFooter from "@/components/mega-footer";

export { main as metadata } from "@/data/metadata";

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  const userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white text-black dark:bg-gray-950 dark:text-white ${splineSans.className}`}
    >
      <body className="flex min-h-screen flex-col">
        <UserProvider userPromise={userPromise}>
          <TopNavigation />
          <div className="grid flex-grow md:grid-cols-[var(--spacing-gutter)_1fr_auto]">
            <AppNavigation />
            <main className="pt-gutter flex flex-col items-center">
              {children}
            </main>
            <aside className="pt-gutter bg-background hidden flex-col items-center border-l-4 md:flex">
              {sidebar}
            </aside>
          </div>
          <footer className="border-t-4">
            <MegaFooter />
          </footer>
        </UserProvider>
      </body>
    </html>
  );
}
