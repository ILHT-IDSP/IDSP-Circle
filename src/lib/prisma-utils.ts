import prisma from './prisma';
import { Prisma } from '@/generated/prisma/edge';

/**
 * Utility class for optimizing prisma queries
 */
export class PrismaUtils {
	/**
	 * Enhanced findMany with batching capabilities
	 * Use this when you need to load many related records to avoid N+1 issues
	 */
	static async batchedFindMany<T, R>(items: T[], keyExtractor: (item: T) => number | string, queryExecutor: (ids: (number | string)[]) => Promise<R[]>, keyInResult: (result: R) => number | string): Promise<Map<number | string, R[]>> {
		if (items.length === 0) return new Map();

		const ids = items.map(keyExtractor);
		const results = await queryExecutor([...new Set(ids)]);

		return results.reduce((acc, result) => {
			const key = keyInResult(result);
			if (!acc.has(key)) {
				acc.set(key, []);
			}
			acc.get(key)!.push(result);
			return acc;
		}, new Map<number | string, R[]>());
	}

	/**
	 * Create a dataloader-like function for batching similar queries
	 */	static createBatchLoader<T extends number, R>(loadFn: (ids: T[]) => Promise<R[]>, keyExtractor: (item: R) => T | null) {
		return async (ids: T[]): Promise<Map<T, R>> => {
			if (ids.length === 0) return new Map();

			const uniqueIds = [...new Set(ids)];
			const results = await loadFn(uniqueIds);

			return results.reduce((acc, result) => {
				const key = keyExtractor(result);
				if (key !== null) {
					acc.set(key, result);
				}
				return acc;
			}, new Map<T, R>());
		};
	}

	/**
	 * Execute queries in transaction for better performance
	 * Use this when you need to make multiple related database operations
	 */	static async transaction<T>(fn: (tx: any) => Promise<T>): Promise<T> {
		return prisma.$transaction(fn) as Promise<T>;
	}

	/**
	 * Pagination utility that uses cursor-based pagination for better performance
	 * with large datasets compared to offset-based pagination
	 */	static async paginateCursor<T, C extends keyof any>(
		model: any,
		{
			take = 10,
			cursor,
			cursorField = 'id' as C,
			where = {},
			orderBy = { [cursorField]: 'desc' },
			include = {},
		}: {
			take?: number;
			cursor?: any;
			cursorField?: C;
			where?: any;
			orderBy?: any;
			include?: any;
		}
	): Promise<{ items: T[]; nextCursor: any | null }> {
		const items = await model.findMany({
			take: take + 1, // take one extra to check if there are more
			cursor: cursor ? { [cursorField]: cursor } : undefined,
			where,
			orderBy,
			include,
		}) as any[];

		const hasMore = items.length > take;
		const data = hasMore ? items.slice(0, take) : items;
		const nextCursor = hasMore ? data[data.length - 1][cursorField] : null;

		return {
			items: data as T[],
			nextCursor,
		};
	}
}

/**
 * Optimized select helpers - reduces over-fetching by selecting only needed fields
 */
export const userBasicSelect = {
	id: true,
	username: true,
	name: true,
	profileImage: true,
};

export const circleBasicSelect = {
	id: true,
	name: true,
	avatar: true,
	isPrivate: true,
};

export const albumBasicSelect = {
	id: true,
	title: true,
	coverImage: true,
	isPrivate: true,
	createdAt: true,
	creatorId: true,
};

export const photoBasicSelect = {
	id: true,
	url: true,
	createdAt: true,
};
