import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <p className="animate-pulse pt-10 text-center font-bold text-[#013B94]">
          Sit tight - we&apos;re just scanning the market for the best deals!
        </p>
      </div>

      <div className="flex justify-center py-10">
        <div className="h-10 w-10 animate-bounce rounded-full bg-[#013B94]" />
      </div>

      <div className="space-y-2 p-5">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="mx-auto flex max-w-7xl space-x-2">
            <Skeleton className="h-20 w-20 rounded-lg md:h-44 md:w-44" />
            <Skeleton className="h-44 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoadingPage;
