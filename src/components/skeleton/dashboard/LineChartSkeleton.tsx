const LineChartSkeleton = () => {
  return (
    <div className="h-85 animate-pulse">
      {/* Chart Body */}
      <div className="flex items-center gap-4 relative h-[calc(100%-50px)] pb-5">
        {/* Y-axis labels */}
        <div className="h-full flex flex-col justify-evenly ml-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-6 w-4 rounded bg-gray-300 dark:bg-gray-600"
            />
          ))}
        </div>

        {/* Chart Area */}
        <div className="relative h-full w-full">
          {/* Grid */}
          <div className="border-b border-l border-gray-300 dark:border-gray-600 h-full w-full">
            <div className="flex flex-col justify-evenly w-full h-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-px w-full bg-gray-300 dark:bg-gray-600"
                />
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="absolute -bottom-7 right-0 flex w-full justify-evenly">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-10 rounded bg-gray-300 dark:bg-gray-600"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartSkeleton;
