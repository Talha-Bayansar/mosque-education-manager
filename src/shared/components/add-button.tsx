import { Plus } from "lucide-react";
import { IconButton } from "./icon-button";
import { type ButtonProps } from "./ui/button";

type Props = ButtonProps;

export const AddButton = (props: Props) => {
  return (
    <IconButton {...props}>
      <Plus />
    </IconButton>
  );
};
