import { generateArray } from "@/lib/utils";
import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <>
      {generateArray(2).map((i) => (
        <Card key={i}>
          <Skeleton className="h-60 w-full" />
        </Card>
      ))}
    </>
  );
};

export default DashboardLoading;
