import React from 'react';
import { Clock, FileText } from 'lucide-react';

interface SummaryProps {
  isLoading?: boolean;
  summary?: string;
}

export function Summary({ isLoading, summary }: SummaryProps) {
  if (!isLoading && !summary) return null;

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mt-8">
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Video Summary</h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Generated just now</span>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}