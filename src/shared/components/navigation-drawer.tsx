"use server";

import { Link } from "@/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  Boxes,
  CalendarDays,
  FileImage,
  Home,
  ListTodo,
  type LucideIcon,
  Menu,
  Settings,
  User,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { routes } from "@/lib/routes";

type NavItem = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

export const NavigationDrawer = async () => {
  const t = await getTranslations();

  const navItems: NavItem[] = [
    {
      label: t("dashboard"),
      href: routes.dashboard.root,
      Icon: Home,
    },
    {
      label: t("tasks"),
      href: routes.dashboard.tasks.root,
      Icon: ListTodo,
    },
    {
      label: t("team"),
      href: routes.dashboard.team.root,
      Icon: Boxes,
    },
    {
      label: t("meetups"),
      href: routes.dashboard.meetups.root,
      Icon: CalendarDays,
    },
    {
      label: t("people"),
      href: routes.dashboard.people.root,
      Icon: User,
    },
    {
      label: t("groups"),
      href: routes.dashboard.groups.root,
      Icon: Users,
    },
    {
      label: t("posters"),
      href: routes.dashboard.posters.root,
      Icon: FileImage,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("toggleMenu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="flex flex-col gap-4 text-lg font-medium h-full">
          <div className="flex flex-col flex-grow gap-4 ">
            {navItems.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
          </div>
          <Link
            href={routes.dashboard.settings.root}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            {t("settings")}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
