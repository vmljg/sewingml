import { NavigationMenu } from "./navigation-menu";
import { MobileNavigation } from "./mobile-navigation";
import Link from "next/link";
import { navigationData } from "@/data/navigation";
import Image from "next/image";

export default function TopNavigationWithMobile() {
  return (
    <header className="bg-background text-on-background group fixed top-0 z-10 col-span-3 flex max-h-fit min-h-fit w-full items-center justify-around border-b-4 border-black transition-[height] transition-discrete md:hover:h-[50vh] starting:h-16">
      {/* Brand/Logo Column */}
      {navigationData.brand.logo ? (
        <Link
          href="/"
          className="group link mr-auto flex items-center space-x-2 self-start transition-colors duration-200 ease-out group-hover:bg-black"
        >
          <Image
            src={navigationData.brand.logo || "/logo.svg"}
            alt={navigationData.brand.name}
            className="m-3 h-10 rounded border border-black group-[.link]:hover:rounded-none"
            width={40}
            height={40}
          />
        </Link>
      ) : (
        <Link href="/" className="text-xl font-bold">
          {navigationData.brand.name}
        </Link>
      )}

      {/* Navigation Links Column */}
      <NavigationMenu items={navigationData.menuItems} />

      {/* Mobile Navigation */}
      <MobileNavigation
        items={navigationData.menuItems}
        brand={navigationData.brand}
        cta={navigationData.cta}
      />

      {/* CTA Button Column - Hidden on mobile */}
      <div className="h-gutter group cta-wrapper ml-auto hidden place-items-center self-start px-8 transition-colors duration-200 ease-out group-hover:bg-black md:grid">
        <Link
          href={navigationData.cta.href}
          className="m-auto rounded-full border-2 px-4 py-2 font-medium group-hover:text-white"
        >
          {navigationData.cta.text}
        </Link>
      </div>
    </header>
  );
}
