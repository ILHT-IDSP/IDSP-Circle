import { PrismaClient } from '@/generated/prisma/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const createPrismaClient = () => {
	// Create a base Prisma client for middleware
	const prismaBase = new PrismaClient();

	// Apply middleware for query monitoring
	if (process.env.NODE_ENV === 'development') {
		// Adding a middleware to log slow queries
		prismaBase.$use(async (params, next) => {
			const start = Date.now();
			const result = await next(params);
			const duration = Date.now() - start;

			if (duration > 100) {
				// Log queries taking more than 100ms
				console.log(`[SLOW QUERY] ${duration}ms - ${params.model}.${params.action}`);

				// Add more details for debugging in development
				console.log(`Query params:`, JSON.stringify(params, null, 2));
			}

			return result;
		});

		// Middleware for query caching
		const queryCache = new Map();
		const CACHE_TTL = 2000; // 2 seconds TTL for identical queries in development

		prismaBase.$use(async (params, next) => {
			// Only cache read operations
			if (!['findUnique', 'findFirst', 'findMany', 'count', 'aggregate'].includes(params.action)) {
				return next(params);
			}

			// Create a cache key from the query details
			const cacheKey = `${params.model}.${params.action}.${JSON.stringify(params.args)}`;

			// Check if we have a cached result for this exact query
			const cached = queryCache.get(cacheKey);
			if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
				console.log(`[CACHE HIT] ${params.model}.${params.action}`);
				return cached.result;
			}

			// Execute the query
			const result = await next(params);

			// Cache the result
			queryCache.set(cacheKey, {
				timestamp: Date.now(),
				result,
			});

			// Clean up old cache entries
			setTimeout(() => {
				if (queryCache.has(cacheKey)) {
					queryCache.delete(cacheKey);
				}
			}, CACHE_TTL);

			return result;
		});
	}

	// Finally, extend with Accelerate after applying middleware
	return prismaBase.$extends(withAccelerate());
};

type PrismaClientWithExtensions = ReturnType<typeof createPrismaClient>;

const globalForPrisma = global as unknown as {
	prisma: PrismaClientWithExtensions;
};

// Use a single Prisma Client instance
const prisma: PrismaClientWithExtensions = process.env.NODE_ENV === 'production' ? createPrismaClient() : globalForPrisma.prisma || (globalForPrisma.prisma = createPrismaClient());

export default prisma;
