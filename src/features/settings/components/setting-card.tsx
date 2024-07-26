import { View } from "@/shared/components/layout/view";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

type Props = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export const SettingCard = ({ title, description, action }: Props) => {
  return (
    <Card className="flex justify-between items-center p-4">
      <View>
        <CardHeader className="p-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-muted-foreground w-full">
          {description}
        </CardContent>
      </View>
      {action && <CardFooter className="p-0 pl-4">{action}</CardFooter>}
    </Card>
  );
};
