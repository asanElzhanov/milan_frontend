import { env } from '@/shared/config';

import type { ApiMode } from './types';

const normalizeApiMode = (mode: string): ApiMode => (mode === 'real' ? 'real' : 'mock');

export const API_BASE_URL = env.apiUrl;
export const API_MODE = normalizeApiMode(env.apiMode);
export const isRealApiMode = API_MODE === 'real';
export const isMockApiMode = API_MODE === 'mock';
