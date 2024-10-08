"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Spinner } from "./spinner";
import { InfiniteScroll } from "./infinite-scroll";

export type SearchSelectItem = {
  label: string;
  value: string;
};

type Props = {
  items: SearchSelectItem[];
  selectedItem?: SearchSelectItem;
  placeholder: string;
  isLoading?: boolean;
  onSelect: (value: string) => void;
  onQueryChange?: (value: string) => void;
  hasMore?: boolean;
  onNextPage?: () => unknown;
  isFetchingNextPage?: boolean;
  disabled?: boolean;
};

export const SearchSelect = ({
  items,
  selectedItem,
  placeholder,
  isLoading,
  onSelect,
  onQueryChange,
  hasMore = false,
  onNextPage,
  isFetchingNextPage = false,
  disabled = false,
}: Props) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedItem?.value || "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          className="justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label ||
              selectedItem?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={onQueryChange}
            placeholder={t("search")}
          />

          {isLoading ? (
            <div className="grid place-items-center py-2">
              <Spinner />
            </div>
          ) : (
            <>
              <CommandEmpty>{t("noResults")}</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <InfiniteScroll
                    isLoading={isFetchingNextPage}
                    hasMore={hasMore}
                    fetchNextPage={() => {
                      if (onNextPage) {
                        onNextPage();
                      }
                    }}
                  >
                    {items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          if (onSelect) {
                            onSelect(currentValue);
                          }
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </InfiniteScroll>
                </CommandGroup>
              </CommandList>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
