import { useEffect, useRef } from "react";
import { Spinner } from "./spinner";
import { View } from "./layout/view";
import { cn } from "@/lib/utils";

type Props = {
  isLoading: boolean;
  fetchNextPage: () => unknown;
  hasMore: boolean;
  children: React.ReactNode;
};

export const InfiniteScroll = ({
  isLoading,
  fetchNextPage,
  hasMore,
  children,
}: Props) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (hasMore) {
          fetchNextPage();
        }
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  return (
    <View
      className={cn({
        "gap-0": !hasMore,
      })}
    >
      <View className="gap-0">{children}</View>
      <div ref={loaderRef} className="flex justify-center items-center">
        {isLoading && <Spinner />}
      </div>
    </View>
  );
};
