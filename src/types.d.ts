declare module 'next-auth' {
	/**
	 * The shape of the user object returned in the OAuth providers' `profile` callback,
	 * or the second parameter of the `session` callback, when using a database.
	 */
	interface User {
		id: string;
		username: string;
		name?: string | null;
		email?: string;
		image?: string;
		profileImage?: string;
		circleCount?: number;
		albumCount?: number;
		followersCount?: number;
		followingCount?: number;
	}
	/**
	 * The shape of the account object returned in the OAuth providers' `account` callback,
	 * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
	 */
	interface Account {
		provider?: string;
		type?: string;
		providerAccountId?: string;
	}

	/**
	 * Returned by `useSession`, `auth`, contains information about the active session.
	 */
	interface Session {
		user?: User;
	}
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		idToken?: string;
		id?: string;
		username?: string;
		image?: string;
		circleCount?: number;
		albumCount?: number;
		followersCount?: number;
		followingCount?: number;
	}
}
