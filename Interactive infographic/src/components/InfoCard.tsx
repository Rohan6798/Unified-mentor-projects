import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface InfoCardProps {
  title: string;
  value: string;
  change: number;
  description: string;
}

export function InfoCard({ title, value, change, description }: InfoCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="flex items-center mt-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <div className={`ml-3 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
          <span className="font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
}