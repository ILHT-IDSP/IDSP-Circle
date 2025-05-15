// Route handler param types fix for Next.js 15
declare module 'next/dist/server/future/route-handler-module-loader' {
	export interface RouteHandlerParams {
		readonly params?: Record<string, string | string[]>;
	}
}
