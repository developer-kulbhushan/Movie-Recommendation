import React from 'react';
import { History, Trash2 } from 'lucide-react';
import { RecommendationQuery } from '../types';
import { RecommendationCard } from './RecommendationCard';

interface QueryHistoryProps {
  queries: RecommendationQuery[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export const QueryHistory: React.FC<QueryHistoryProps> = ({ queries, onRemove, onClearAll }) => {
  if (queries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <History className="h-5 w-5 mr-2" />
          Recent Queries
        </h2>
        <button
          onClick={onClearAll}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 className="h-4 w-4 mr-1.5" />
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {queries.map((query, index) => (
          <RecommendationCard
            key={query.id}
            query={query}
            onRemove={onRemove}
            isLatest={index === 0}
          />
        ))}
      </div>
    </div>
  );
};