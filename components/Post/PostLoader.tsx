import { Skeleton } from "@/components/ui/skeleton";

export function PostLoader() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[500px] w-[600px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[600px]" />
        <Skeleton className="h-4 w-[450px]" />
      </div>
    </div>
  );
}
