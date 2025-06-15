import { useState, useCallback } from 'react';
import { RecommendationQuery, ApiResponse, ApiError } from '../types';

export const useRecommendations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [queryHistory, setQueryHistory] = useState<RecommendationQuery[]>([]);

  const fetchRecommendations = useCallback(async (userQuery: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch('http://127.0.0.1:8080/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_query: userQuery }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      const recommendations = data.response || data.message || 'No recommendations available';

      // Add to history
      const newQuery: RecommendationQuery = {
        id: Date.now().toString(),
        query: userQuery,
        response: recommendations,
        timestamp: new Date(),
      };

      setQueryHistory(prev => [newQuery, ...prev.slice(0, 9)]); // Keep last 10 queries
      
      return recommendations;
    } catch (err) {
      clearTimeout(timeoutId);
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          throw new Error('Request timed out after 30 seconds. Please try again.');
        }
        throw new Error(err.message || 'Failed to fetch recommendations');
      }
      
      throw new Error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setQueryHistory([]);
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setQueryHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  return {
    isLoading,
    error,
    queryHistory,
    fetchRecommendations,
    clearHistory,
    removeFromHistory,
    setError,
  };
};