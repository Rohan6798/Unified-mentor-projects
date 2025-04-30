import React from 'react';

interface ChartProps {
  data: number[];
  labels: string[];
  height?: number;
}

export function Chart({ data, labels, height = 200 }: ChartProps) {
  const maxValue = Math.max(...data);
  
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="flex h-full items-end justify-between">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div 
              className="w-full mx-1 bg-blue-500 hover:bg-blue-600 transition-colors rounded-t"
              style={{ 
                height: `${(value / maxValue) * 100}%`,
                minHeight: '20px'
              }}
            />
            <span className="text-xs text-gray-600 mt-2">{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}