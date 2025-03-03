"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SubMenuItem {
  title: string
  href: string
  description?: string
}

interface MenuItem {
  title: string
  href?: string
  subMenu?: SubMenuItem[]
}

interface MobileNavigationProps {
  items: MenuItem[]
  brand: {
    name: string
    logo?: string
  }
  cta: {
    text: string
    href: string
  }
}

export function MobileNavigation({ items, brand, cta }: MobileNavigationProps) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({})

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between py-4">
              {brand.logo ? (
                <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="h-8" />
              ) : (
                <span className="text-lg font-bold">{brand.name}</span>
              )}
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>

            <nav className="flex-1 overflow-auto py-4">
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index}>
                    {item.href && !item.subMenu ? (
                      <Link
                        href={item.href}
                        className="flex items-center py-2 px-3 text-base font-medium rounded-md hover:bg-muted"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <Collapsible open={openItems[index]} onOpenChange={() => toggleItem(index)}>
                        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-3 text-base font-medium rounded-md hover:bg-muted">
                          {item.title}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${openItems[index] ? "rotate-180" : ""}`}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="ml-4 mt-2 space-y-2 border-l pl-4">
                            {item.subMenu?.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.href}
                                  className="flex items-center py-2 px-3 text-sm rounded-md hover:bg-muted"
                                >
                                  <span>{subItem.title}</span>
                                  <ChevronRight className="ml-auto h-4 w-4" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="py-4 border-t">
              <Button className="w-full rounded-full" asChild>
                <Link href={cta.href}>{cta.text}</Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

