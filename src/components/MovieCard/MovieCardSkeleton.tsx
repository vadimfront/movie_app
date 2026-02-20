import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const MovieCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="w-full h-48 object-cover" />
        <Skeleton className="mt-2 w-3/4 h-6" />
      </CardContent>
    </Card>
  );
};