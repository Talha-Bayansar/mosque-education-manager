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
import { Fragment } from "react";

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
              <Fragment key={`${item.label}`}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href!}>{item.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator key={`${item.label}_separator`} />
              </Fragment>
            );
          } else {
            return (
              <BreadcrumbItem key={`${item.label}`}>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
