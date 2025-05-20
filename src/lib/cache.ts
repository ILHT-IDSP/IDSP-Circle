import { createClient } from 'redis';

/**
 * Redis client for caching frequent database queries
 *
 * Set up with an environment variable:
 * REDIS_URL=redis://username:password@host:port
 */
const redisClient = createClient({
	url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', err => {
	console.error('Redis client error:', err);
});

// Connect to Redis lazily - only when actually needed
let isConnected = false;
async function ensureConnection() {
	if (!isConnected) {
		await redisClient.connect();
		isConnected = true;
	}
}

/**
 * Cache wrapper for database queries
 * @param key - Unique key for the cached data
 * @param ttl - Time to live in seconds
 * @param fetchFn - Function to fetch data if not in cache
 * @returns The cached or freshly fetched data
 */
export async function cacheFn<T>(key: string, ttl: number, fetchFn: () => Promise<T>): Promise<T> {
	// Skip caching if Redis is not available or in development mode
	if (!process.env.REDIS_URL && process.env.NODE_ENV !== 'production') {
		return fetchFn();
	}

	try {
		await ensureConnection();

		// Try to get from cache first
		const cached = await redisClient.get(key);

		if (cached) {
			return JSON.parse(cached) as T;
		}

		// If not in cache, fetch fresh data
		const data = await fetchFn();

		// Store in cache
		await redisClient.set(key, JSON.stringify(data), {
			EX: ttl,
		});

		return data;
	} catch (error) {
		console.error('Cache error:', error);
		// Fallback to direct fetch if caching fails
		return fetchFn();
	}
}

/**
 * Clear a specific cache entry
 */
export async function clearCache(key: string): Promise<void> {
	if (!process.env.REDIS_URL && process.env.NODE_ENV !== 'production') {
		return;
	}

	try {
		await ensureConnection();
		await redisClient.del(key);
	} catch (error) {
		console.error('Failed to clear cache:', error);
	}
}

/**
 * Clear multiple cache entries by pattern
 */
export async function clearCachePattern(pattern: string): Promise<void> {
	if (!process.env.REDIS_URL && process.env.NODE_ENV !== 'production') {
		return;
	}

	try {
		await ensureConnection();
		const keys = await redisClient.keys(pattern);

		if (keys.length > 0) {
			await redisClient.del(keys);
		}
	} catch (error) {
		console.error('Failed to clear cache pattern:', error);
	}
}
