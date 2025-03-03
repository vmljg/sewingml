"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  title: string;
  href: string;
  description?: string;
}

interface MenuItem {
  title: string;
  href?: string;
  subMenu?: SubMenuItem[];
}

interface NavigationMenuProps {
  items: MenuItem[];
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsMenuOpen(false);
  };

  return (
    <div
      className={cn(
        isMenuOpen ? "menu-open h-[275px]" : "h-gutter",
        "starting:h-gutter bg-background group flex flex-col items-start justify-between transition-[height] transition-discrete duration-300 ease-in-out"
      )}
      onMouseLeave={handleMouseLeave}
    >
      <nav
        className={cn(
          "group border-on-background hidden w-full grid-flow-col place-items-start items-start space-x-8 border-dashed group-[.menu-open]:border-b md:grid"
        )}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col"
            onMouseEnter={() => handleMouseEnter(index)}
          >
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground flex translate-y-3.5 items-center py-2 text-sm font-medium transition-colors"
              >
                {item.title}
              </Link>
            ) : (
              <button
                className="text-muted-foreground hover:text-foreground flex translate-y-3.5 items-center py-2 text-sm font-medium transition-colors"
                aria-expanded={hoveredIndex === index}
                aria-haspopup="true"
              >
                {item.title}
                {item.subMenu && <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
            )}
          </div>
        ))}
      </nav>
      {items.map(
        (item, index) =>
          item.subMenu &&
          hoveredIndex === index && (
            <div
              key={index}
              className={cn(
                "border-on-background mt-8 mb-auto border-t-2 transition-opacity duration-200 ease-out starting:opacity-0",
                isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              {item.subMenu.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.href}
                  className="hover:bg-muted block p-2"
                >
                  <div className="font-medium">{subItem.title}</div>
                  {subItem.description && (
                    <div className="text-muted-foreground mt-1 text-xs">
                      {subItem.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )
      )}
    </div>
  );
}
