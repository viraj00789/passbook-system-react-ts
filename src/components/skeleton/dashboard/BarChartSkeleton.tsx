export default function BarChartSkeleton() {
  return (
    <div className="flex gap-2">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="w-full h-12 animate-pulse bg-gray-200 dark:bg-gray-600 rounded-md"
        />
      ))}
    </div>
  );
}
