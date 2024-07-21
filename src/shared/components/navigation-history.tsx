import { isLastOfArray } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Link } from "@/navigation";

type Props = {
  items: NavigationHistoryItem[];
};

export type NavigationHistoryItem = {
  href?: string;
  label: string;
};

export const NavigationHistory = ({ items }: Props) => {
  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        {items.map((item, i) => {
          if (!isLastOfArray(i, items)) {
            return (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href!}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            );
          } else {
            return (
              <BreadcrumbItem>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
