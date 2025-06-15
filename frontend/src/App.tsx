import React from 'react';
import { MessageSquare, Sparkles, History } from 'lucide-react';
import { useRecommendations } from './hooks/useRecommendations';
import { QueryInput } from './components/QueryInput';
import { QueryHistory } from './components/QueryHistory';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const {
    isLoading,
    error,
    queryHistory,
    fetchRecommendations,
    clearHistory,
    removeFromHistory,
    setError,
  } = useRecommendations();

  const handleSubmit = async (query: string) => {
    try {
      await fetchRecommendations(query);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleErrorDismiss = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Movie Recommendation AI Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized recommendations powered by artificial intelligence. 
            Ask anything and receive tailored suggestions.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center mb-2">
              <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Intelligent</h3>
            </div>
            <p className="text-sm text-gray-600">
              Advanced AI algorithms provide personalized recommendations based on your specific needs.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center mb-2">
              <MessageSquare className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Conversational</h3>
            </div>
            <p className="text-sm text-gray-600">
              Natural language processing understands your queries in plain English.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center mb-2">
              <History className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Memory</h3>
            </div>
            <p className="text-sm text-gray-600">
              Keep track of your previous queries and easily access past recommendations.
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <ErrorMessage message={error} onDismiss={handleErrorDismiss} />
        )}

        {/* Query Input */}
        <QueryInput
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />

        {/* Query History */}
        <QueryHistory
          queries={queryHistory}
          onRemove={removeFromHistory}
          onClearAll={clearHistory}
        />

        {/* Footer */}
        <footer className="text-center py-8 mt-12 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Powered by advanced AI technology. Your queries are processed securely and recommendations are generated in real-time.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;