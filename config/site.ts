export type SiteConfig = typeof siteConfig

export const siteConfig = {
    fullName: "Portfolio",
    // description:
    //     "Beautifully designed components built with Radix UI and Tailwind CSS.",
    protected: false,
    mainNav: [
        {
            title: "Home",
            href: "",
        },
        {
            title: "About",
            href: "#about",
        },
        {
            title: "Contact",
            href: "#contact",
        }
    ]
}
