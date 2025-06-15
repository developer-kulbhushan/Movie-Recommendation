import React, { useState, useRef } from 'react';
import { Send, X, Loader2 } from 'lucide-react';

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const QueryInput: React.FC<QueryInputProps> = ({ onSubmit, isLoading, error }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
      setQuery('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearInput = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What would you like recommendations for?"
            maxLength={maxLength}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 placeholder-gray-500"
            disabled={isLoading}
          />
          
          {query && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-sm ${
            query.length > maxLength * 0.9 ? 'text-orange-600' : 'text-gray-500'
          }`}>
            {query.length}/{maxLength}
          </span>

          <button
            type="submit"
            disabled={!query.trim() || isLoading || !!error}
            className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Getting Recommendations...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Get Recommendations
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};