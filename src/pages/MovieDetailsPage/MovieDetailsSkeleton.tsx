import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

export const MovieDetailsSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="w-full h-64 object-cover" />
        <Skeleton className="mt-4 w-full h-8" />
        <Skeleton className="mt-2 w-full h-4" />
        <Skeleton className="mt-1 w-full h-4" />
        <Skeleton className="mt-1 w-3/4 h-4" />
        <Skeleton className="mt-2 w-1/2 h-4" />
        <Skeleton className="mt-2 w-1/4 h-4" />
        <div className="mt-4"></div>
      </CardContent>
    </Card>
  );
};