"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";
import { View } from "./layout/view";
import { usePathname } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { generateArray } from "@/lib/utils";

type Props = {
  columns: ColumnDef<any, any>[];
  data: any[];
  totalCount?: number;
};

const PAGE_SIZE = 10;

export const AppTable = ({ columns, data, totalCount = 10 }: Props) => {
  const t = useTranslations();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = Number(page ?? 1);
  const path = usePathname();
  const totalPages = Math.ceil(totalCount / 10);

  const getPreviousUrl = () => {
    const params = new URLSearchParams([
      ["page", `${pageNumber <= 1 ? pageNumber : pageNumber - 1}`],
    ]);
    const url = `${path}?${params}`;
    return url;
  };

  const getNextUrl = () => {
    const params = new URLSearchParams([
      ["page", `${pageNumber >= totalPages ? pageNumber : pageNumber + 1}`],
    ]);
    const url = `${path}?${params}`;
    return url;
  };

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams([["page", `${page}`]]);
    const url = `${path}?${params}`;
    return url;
  };

  return (
    <View className="w-full">
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("noResults")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={getPreviousUrl()!} />
          </PaginationItem>
          {generateArray(totalPages).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page + 1 === pageNumber}
                href={getPageUrl(page + 1)}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href={getNextUrl()!} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </View>
  );
};
