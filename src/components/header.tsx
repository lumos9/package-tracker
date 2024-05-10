"use client"

import { siteConfig } from "../../config/site"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Moon, Sun, } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import Link from "next/link"
import { NavItem } from "../../types/nav"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation';

interface MainNavProps {
    items?: NavItem[]
}

export function Header({ items }: MainNavProps) {
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
    const { theme, setTheme } = useTheme()
    const params = useParams();
    const [currentHash, setCurrentHash] = useState<string | null>(null);

    useEffect(() => {
        // Function to check if the URL hash is '#about'
        const checkHash = () => {
            const currentHash = window.location.hash;
            //console.log(`currentHash: '${currentHash}'`)
            return currentHash;
        };

        // Update the hash state whenever the pathname changes
        const newHash = checkHash();
        setCurrentHash(newHash);
    }, [params]); // Depend on pathname to re-check when URL changes


    const handleMobileMenuClick = () => {
        if (showMobileMenu) {
            setShowMobileMenu(false)
        } else {
            setShowMobileMenu(true)
        }
    };

    const closeMobileMenu = () => {
        setShowMobileMenu(false)
    }

    const scrollToSection = (sectionId: any, top: any) => {
        const yOffset = 0; // header height offset
        const element = document.getElementById(sectionId);
        if (element) {
            console.log(`scrolling now to section with id: '${sectionId}'`)
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: top === 0 ? 0 : y, behavior: 'smooth' });
        } else {
            console.log(`Element with id: '${sectionId}' not found`)
        }
    };

    function removePoundPrefix(s: any) {
        if (!s) return s;
        if (s.startsWith('#')) {
            return s.substring(1);
        }
        return s;
    }

    return (
        <header className="bg-background sticky top-0 z-40 w-full border-b">
            <div className="p-4 md:container flex h-15 items-center justify-between">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <div className="lg:hidden cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground" onClick={handleMobileMenuClick}>
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Icons.menu className="w-5 h-5" />
                        </div>
                        {
                            showMobileMenu && (
                                <div className="absolute top-16 left-0 w-full flex flex-col gap-4 bg-background border-b p-4">
                                    {
                                        items?.map((item, index) =>
                                            item.href !== null && (
                                                <Link
                                                    key={index}
                                                    href={item.href ? '/' + item.href : ''}
                                                    onClick={() => removePoundPrefix(item.href) ? scrollToSection(removePoundPrefix(item.href), null) : scrollToSection("home", 0)}
                                                    scroll={false}
                                                    className={cn(
                                                        "flex items-center gap-4 rounded-lg hover:bg-accent hover:text-accent-foreground p-3",
                                                        item.disabled && "cursor-not-allowed opacity-80",
                                                        currentHash === item.href && 'bg-neutral-100 dark:bg-neutral-800',
                                                        currentHash !== item.href &&
                                                        'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                                    )}
                                                >
                                                    {item.title}
                                                </Link>
                                            )
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <nav className="flex items-center gap-4">
                    {
                        items?.length && (
                            <div className="hidden lg:flex items-center gap-4">
                                {
                                    items?.map((item, index) =>
                                        item.href !== null && (
                                            <Link
                                                key={index}
                                                href={item.href ? '/' + item.href : ''}
                                                onClick={() => removePoundPrefix(item.href) ? scrollToSection(removePoundPrefix(item.href), null) : scrollToSection("home", 0)}
                                                scroll={false}
                                                className={cn(
                                                    "flex justify-center items-center ease-in-out py-2 md:px-4 px-2 rounded-md",
                                                    item.disabled && "cursor-not-allowed opacity-80",
                                                    currentHash === item.href && 'bg-neutral-100 dark:bg-neutral-800',
                                                    currentHash !== item.href &&
                                                    'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        )
                                    )
                                }
                            </div>
                        )
                    }
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        <Sun className="dark:hidden h-[1.5rem] w-[1.3rem]" />
                        <Moon className="hidden dark:block h-[1.2rem] w-[1.1rem]" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </nav>
            </div>
        </header>
    );
}
