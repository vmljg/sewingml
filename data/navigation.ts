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
export const navigationData: NavigationData = {
    brand: {
        name: "Pattern IQ",
        logo: "/logo.svg",
    },
    menuItems: [
        {
            title: "Patterns",
            subMenu: [
                {
                    title: "Create Pattern",
                    href: "/patterns/create",
                    description: "Generate a quilt block pattern using AI",
                },
                {
                    title: "Scraps",
                    href: "/patterns/scraps",
                    description: "Recycled generated patterns"
                },
                {
                    title: "My Patterns",
                    href: "/user/patterns",
                    description: "View and manage your patterns"
                }
            ],
        },
        {
            title: "Shop",
            subMenu: [
                {
                    title: "Fabrics",
                    href: "/shop/fabrics",
                    description: "Explore a wide range of fabrics",
                },
                {
                    title: "Notions",
                    href: "/shop/notions",
                    description: "Essential tools and supplies for sewing",
                }
            ],
        },
        {
            title: "Tools",
            subMenu: [
                {
                    title: "Quilt Block Creator",
                    href: "/tools/block-creator",
                    description: "Design your own quilt block",
                },
                {
                    title: "Quilt As You Go",
                    href: "/tools/quilt-as-you-go",
                    description: "Learn the quilt-as-you-go technique",
                },
            ],
        },
        {
            title: "About",
            href: "/about",
        },
    ],
    cta: {
        text: "Get Started",
        href: "/sign-up",
    },
}