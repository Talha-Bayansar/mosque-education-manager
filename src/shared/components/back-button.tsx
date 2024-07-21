import { Link } from "@/navigation";
import { ArrowLeft } from "lucide-react";
import { IconButton } from "./icon-button";
import type { ButtonProps } from "./ui/button";

type Props = ButtonProps & {
  href: string;
};

export const BackButton = ({ href, ...rest }: Props) => {
  return (
    <IconButton {...rest}>
      <Link href={href} className="mr-2">
        <ArrowLeft className="text-primary" />
      </Link>
    </IconButton>
  );
};
