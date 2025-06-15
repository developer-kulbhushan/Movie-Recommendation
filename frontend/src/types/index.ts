export interface RecommendationQuery {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
}

export interface ApiResponse {
  response?: string;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}