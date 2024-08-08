import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  disabled,
}: ToolButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={disabled}
            onClick={onClick}
            size="icon"
            className={cn({
              "bg-primary/20": isActive,
            })}
            variant={"ghost"}
          >
            <Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
