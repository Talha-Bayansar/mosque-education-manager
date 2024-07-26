"use client";

import {
  SearchSelect,
  type SearchSelectItem,
} from "@/shared/components/search-select";
import { useSearchPeople } from "../hooks/use-search-people";
import { useTranslations } from "next-intl";
import { useDebounceValue } from "@/shared/hooks/use-debounce-value";

type Props = {
  selectedItem?: SearchSelectItem;
  onSelect: (value: string) => void;
};

export const SearchPeopleSelect = ({ selectedItem, onSelect }: Props) => {
  const t = useTranslations();
  const [query, setQuery] = useDebounceValue<string>("", 500);
  const {
    data: speakers,
    isLoading: isLoadingSpeakers,
    fetchNextPage,
  } = useSearchPeople({
    query,
  });

  return (
    <SearchSelect
      onNextPage={fetchNextPage}
      items={
        speakers?.pages
          .map((page) => {
            return page.data.map(
              (s) =>
                ({
                  label: `${s.lastName} ${s.firstName}`,
                  value: s.id,
                } as SearchSelectItem)
            );
          })
          .reduce((prev, next) => [...prev, ...next], []) ?? []
      }
      hasMore={speakers?.pages[speakers.pages.length - 1].metaData.hasNextPage}
      placeholder={t("selectSpeaker")}
      selectedItem={selectedItem}
      isLoading={isLoadingSpeakers}
      onSelect={onSelect}
      onQueryChange={setQuery}
    />
  );
};
