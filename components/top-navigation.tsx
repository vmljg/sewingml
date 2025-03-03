import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavigationMenu } from "./navigation-menu"

// Define types for our navigation data
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

interface NavigationData {
  brand: {
    name: string
    logo?: string
  }
  menuItems: MenuItem[]
  cta: {
    text: string
    href: string
  }
}

// Sample navigation data
const navigationData: NavigationData = {
  brand: {
    name: "Acme Inc",
    logo: "/placeholder.svg?height=40&width=120",
  },
  menuItems: [
    {
      title: "Products",
      subMenu: [
        {
          title: "Analytics Platform",
          href: "/products/analytics",
          description: "Real-time data analytics and visualization tools",
        },
        {
          title: "Marketing Suite",
          href: "/products/marketing",
          description: "End-to-end marketing automation solutions",
        },
        {
          title: "CRM System",
          href: "/products/crm",
          description: "Customer relationship management platform",
        },
      ],
    },
    {
      title: "Solutions",
      subMenu: [
        {
          title: "For Enterprise",
          href: "/solutions/enterprise",
          description: "Scalable solutions for large organizations",
        },
        {
          title: "For Startups",
          href: "/solutions/startups",
          description: "Affordable tools to grow your business",
        },
      ],
    },
    {
      title: "Resources",
      subMenu: [
        {
          title: "Documentation",
          href: "/resources/docs",
          description: "Guides and API references",
        },
        {
          title: "Blog",
          href: "/resources/blog",
          description: "Latest news and articles",
        },
        {
          title: "Webinars",
          href: "/resources/webinars",
          description: "Educational online events",
        },
      ],
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
  cta: {
    text: "Get Started",
    href: "/signup",
  },
}

export default function TopNavigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Brand/Logo Column */}
          <div className="flex items-center">
            {navigationData.brand.logo ? (
              <Link href="/" className="flex items-center space-x-2">
                <img
                  src={navigationData.brand.logo || "/placeholder.svg"}
                  alt={navigationData.brand.name}
                  className="h-10"
                />
              </Link>
            ) : (
              <Link href="/" className="text-xl font-bold">
                {navigationData.brand.name}
              </Link>
            )}
          </div>

          {/* Navigation Links Column */}
          <NavigationMenu items={navigationData.menuItems} />

          {/* CTA Button Column */}
          <div>
            <Button className="rounded-full" asChild>
              <Link href={navigationData.cta.href}>{navigationData.cta.text}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

