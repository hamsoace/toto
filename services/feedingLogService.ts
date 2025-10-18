import api from './api';
import { FeedingLog, NewFeedingLogPayload } from '../types';

export const getFeedingLogs = async (babyId: string): Promise<FeedingLog[]> => {
  const response = await api.get(`/feeding-logs/baby/${babyId}`);
  // Assuming the API returns a { data: FeedingLog[] } structure
  return response.data.data;
};

export const addFeedingLog = async (log: NewFeedingLogPayload): Promise<FeedingLog> => {
  const response = await api.post('/feeding-logs', log);
  // Assuming the API returns a { data: FeedingLog } structure
  return response.data.data;
};
