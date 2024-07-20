"use server";

import { routes } from "@/lib/routes";
import {
  Boxes,
  CalendarDays,
  FileImage,
  Home,
  ListTodo,
  LucideIcon,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

type NavItem = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

export const SideNavigation = async () => {
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
    <TooltipProvider>
      <aside className="fixed top-0 bottom-0 left-0 hidden flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 h-full px-2 sm:py-5">
          <div className="flex flex-col gap-4 items-center flex-grow">
            {navItems.map(({ label, href, Icon }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button variant="ghost">
                    <Link href={href}>
                      <Icon />
                      <span className="sr-only">{label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Link href={routes.dashboard.settings.root}>
                  <Settings />
                  <span className="sr-only">{t("settings")}</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t("settings")}</p>
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
};
