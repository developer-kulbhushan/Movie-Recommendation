import React, { useState } from 'react';
import { Share2, Save, Copy, Check, Trash2 } from 'lucide-react';
import { RecommendationQuery } from '../types';

interface RecommendationCardProps {
  query: RecommendationQuery;
  onRemove?: (id: string) => void;
  isLatest?: boolean;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  query, 
  onRemove,
  isLatest = false 
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(query.response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleSave = () => {
    // In a real app, this would save to localStorage or a backend
    localStorage.setItem(`recommendation_${query.id}`, JSON.stringify(query));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Recommendation',
          text: `Query: ${query.query}\n\nRecommendation: ${query.response}`,
        });
      } catch (err) {
        console.error('Failed to share:', err);
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
    }).format(timestamp);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4 transition-all duration-300 hover:shadow-md ${
      isLatest ? 'animate-fade-in' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">Your Query</h3>
          <p className="text-gray-600 text-sm bg-gray-50 rounded-lg p-3 italic">
            "{query.query}"
          </p>
        </div>
        <span className="text-xs text-gray-500 ml-4 flex-shrink-0">
          {formatTime(query.timestamp)}
        </span>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
        <div className="text-gray-700 leading-relaxed bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
          {query.response.split('\n').map((line, index) => (
            <p key={index} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1.5 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1.5" />
                Copy
              </>
            )}
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4 mr-1.5 text-green-600" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1.5" />
                Save
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Share2 className="h-4 w-4 mr-1.5" />
            Share
          </button>
        </div>

        {onRemove && (
          <button
            onClick={() => onRemove(query.id)}
            className="inline-flex items-center px-2 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};