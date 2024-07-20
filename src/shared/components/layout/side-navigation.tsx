import { routes } from "@/lib/routes";
import { Home } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Link } from "@/navigation";

export const SideNavigation = () => {
  return (
    <TooltipProvider>
      <aside className="fixed top-0 bottom-0 left-0 hidden flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Link href={routes.dashboard.root}>
                  <Home />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
};
