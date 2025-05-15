
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Circle
 * 
 */
export type Circle = $Result.DefaultSelection<Prisma.$CirclePayload>
/**
 * Model Membership
 * 
 */
export type Membership = $Result.DefaultSelection<Prisma.$MembershipPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Like
 * 
 */
export type Like = $Result.DefaultSelection<Prisma.$LikePayload>
/**
 * Model Follow
 * 
 */
export type Follow = $Result.DefaultSelection<Prisma.$FollowPayload>
/**
 * Model Album
 * 
 */
export type Album = $Result.DefaultSelection<Prisma.$AlbumPayload>
/**
 * Model UserSettings
 * 
 */
export type UserSettings = $Result.DefaultSelection<Prisma.$UserSettingsPayload>
/**
 * Model AlbumComment
 * 
 */
export type AlbumComment = $Result.DefaultSelection<Prisma.$AlbumCommentPayload>
/**
 * Model AlbumLike
 * 
 */
export type AlbumLike = $Result.DefaultSelection<Prisma.$AlbumLikePayload>
/**
 * Model Photo
 * 
 */
export type Photo = $Result.DefaultSelection<Prisma.$PhotoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  MEMBER: 'MEMBER',
  MODERATOR: 'MODERATOR',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.circle`: Exposes CRUD operations for the **Circle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Circles
    * const circles = await prisma.circle.findMany()
    * ```
    */
  get circle(): Prisma.CircleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.membership`: Exposes CRUD operations for the **Membership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memberships
    * const memberships = await prisma.membership.findMany()
    * ```
    */
  get membership(): Prisma.MembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.like`: Exposes CRUD operations for the **Like** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Likes
    * const likes = await prisma.like.findMany()
    * ```
    */
  get like(): Prisma.LikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.follow`: Exposes CRUD operations for the **Follow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Follows
    * const follows = await prisma.follow.findMany()
    * ```
    */
  get follow(): Prisma.FollowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.album`: Exposes CRUD operations for the **Album** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Albums
    * const albums = await prisma.album.findMany()
    * ```
    */
  get album(): Prisma.AlbumDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSettings`: Exposes CRUD operations for the **UserSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSettings
    * const userSettings = await prisma.userSettings.findMany()
    * ```
    */
  get userSettings(): Prisma.UserSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.albumComment`: Exposes CRUD operations for the **AlbumComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlbumComments
    * const albumComments = await prisma.albumComment.findMany()
    * ```
    */
  get albumComment(): Prisma.AlbumCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.albumLike`: Exposes CRUD operations for the **AlbumLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlbumLikes
    * const albumLikes = await prisma.albumLike.findMany()
    * ```
    */
  get albumLike(): Prisma.AlbumLikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.photo`: Exposes CRUD operations for the **Photo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Photos
    * const photos = await prisma.photo.findMany()
    * ```
    */
  get photo(): Prisma.PhotoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Circle: 'Circle',
    Membership: 'Membership',
    Post: 'Post',
    Comment: 'Comment',
    Like: 'Like',
    Follow: 'Follow',
    Album: 'Album',
    UserSettings: 'UserSettings',
    AlbumComment: 'AlbumComment',
    AlbumLike: 'AlbumLike',
    Photo: 'Photo'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "circle" | "membership" | "post" | "comment" | "like" | "follow" | "album" | "userSettings" | "albumComment" | "albumLike" | "photo"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Circle: {
        payload: Prisma.$CirclePayload<ExtArgs>
        fields: Prisma.CircleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CircleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CircleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload>
          }
          findFirst: {
            args: Prisma.CircleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CircleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload>
          }
          findMany: {
            args: Prisma.CircleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload>[]
          }
          create: {
            args: Prisma.CircleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload>
          }
          createMany: {
            args: Prisma.CircleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CircleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload>[]
          }
          delete: {
            args: Prisma.CircleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload>
          }
          update: {
            args: Prisma.CircleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload>
          }
          deleteMany: {
            args: Prisma.CircleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CircleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CircleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload>[]
          }
          upsert: {
            args: Prisma.CircleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CirclePayload>
          }
          aggregate: {
            args: Prisma.CircleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCircle>
          }
          groupBy: {
            args: Prisma.CircleGroupByArgs<ExtArgs>
            result: $Utils.Optional<CircleGroupByOutputType>[]
          }
          count: {
            args: Prisma.CircleCountArgs<ExtArgs>
            result: $Utils.Optional<CircleCountAggregateOutputType> | number
          }
        }
      }
      Membership: {
        payload: Prisma.$MembershipPayload<ExtArgs>
        fields: Prisma.MembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findFirst: {
            args: Prisma.MembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findMany: {
            args: Prisma.MembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          create: {
            args: Prisma.MembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          createMany: {
            args: Prisma.MembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          delete: {
            args: Prisma.MembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          update: {
            args: Prisma.MembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          deleteMany: {
            args: Prisma.MembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          upsert: {
            args: Prisma.MembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          aggregate: {
            args: Prisma.MembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMembership>
          }
          groupBy: {
            args: Prisma.MembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<MembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.MembershipCountArgs<ExtArgs>
            result: $Utils.Optional<MembershipCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Like: {
        payload: Prisma.$LikePayload<ExtArgs>
        fields: Prisma.LikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findFirst: {
            args: Prisma.LikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          findMany: {
            args: Prisma.LikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          create: {
            args: Prisma.LikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          createMany: {
            args: Prisma.LikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          delete: {
            args: Prisma.LikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          update: {
            args: Prisma.LikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          deleteMany: {
            args: Prisma.LikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>[]
          }
          upsert: {
            args: Prisma.LikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LikePayload>
          }
          aggregate: {
            args: Prisma.LikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLike>
          }
          groupBy: {
            args: Prisma.LikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<LikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.LikeCountArgs<ExtArgs>
            result: $Utils.Optional<LikeCountAggregateOutputType> | number
          }
        }
      }
      Follow: {
        payload: Prisma.$FollowPayload<ExtArgs>
        fields: Prisma.FollowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FollowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FollowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findFirst: {
            args: Prisma.FollowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FollowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findMany: {
            args: Prisma.FollowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          create: {
            args: Prisma.FollowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          createMany: {
            args: Prisma.FollowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FollowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          delete: {
            args: Prisma.FollowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          update: {
            args: Prisma.FollowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          deleteMany: {
            args: Prisma.FollowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FollowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FollowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          upsert: {
            args: Prisma.FollowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          aggregate: {
            args: Prisma.FollowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFollow>
          }
          groupBy: {
            args: Prisma.FollowGroupByArgs<ExtArgs>
            result: $Utils.Optional<FollowGroupByOutputType>[]
          }
          count: {
            args: Prisma.FollowCountArgs<ExtArgs>
            result: $Utils.Optional<FollowCountAggregateOutputType> | number
          }
        }
      }
      Album: {
        payload: Prisma.$AlbumPayload<ExtArgs>
        fields: Prisma.AlbumFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlbumFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlbumFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload>
          }
          findFirst: {
            args: Prisma.AlbumFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlbumFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload>
          }
          findMany: {
            args: Prisma.AlbumFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload>[]
          }
          create: {
            args: Prisma.AlbumCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload>
          }
          createMany: {
            args: Prisma.AlbumCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlbumCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload>[]
          }
          delete: {
            args: Prisma.AlbumDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload>
          }
          update: {
            args: Prisma.AlbumUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload>
          }
          deleteMany: {
            args: Prisma.AlbumDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlbumUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlbumUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload>[]
          }
          upsert: {
            args: Prisma.AlbumUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumPayload>
          }
          aggregate: {
            args: Prisma.AlbumAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlbum>
          }
          groupBy: {
            args: Prisma.AlbumGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlbumGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlbumCountArgs<ExtArgs>
            result: $Utils.Optional<AlbumCountAggregateOutputType> | number
          }
        }
      }
      UserSettings: {
        payload: Prisma.$UserSettingsPayload<ExtArgs>
        fields: Prisma.UserSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          findFirst: {
            args: Prisma.UserSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          findMany: {
            args: Prisma.UserSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>[]
          }
          create: {
            args: Prisma.UserSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          createMany: {
            args: Prisma.UserSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>[]
          }
          delete: {
            args: Prisma.UserSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          update: {
            args: Prisma.UserSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          deleteMany: {
            args: Prisma.UserSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>[]
          }
          upsert: {
            args: Prisma.UserSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSettingsPayload>
          }
          aggregate: {
            args: Prisma.UserSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSettings>
          }
          groupBy: {
            args: Prisma.UserSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<UserSettingsCountAggregateOutputType> | number
          }
        }
      }
      AlbumComment: {
        payload: Prisma.$AlbumCommentPayload<ExtArgs>
        fields: Prisma.AlbumCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlbumCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlbumCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload>
          }
          findFirst: {
            args: Prisma.AlbumCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlbumCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload>
          }
          findMany: {
            args: Prisma.AlbumCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload>[]
          }
          create: {
            args: Prisma.AlbumCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload>
          }
          createMany: {
            args: Prisma.AlbumCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlbumCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload>[]
          }
          delete: {
            args: Prisma.AlbumCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload>
          }
          update: {
            args: Prisma.AlbumCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload>
          }
          deleteMany: {
            args: Prisma.AlbumCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlbumCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlbumCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload>[]
          }
          upsert: {
            args: Prisma.AlbumCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumCommentPayload>
          }
          aggregate: {
            args: Prisma.AlbumCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlbumComment>
          }
          groupBy: {
            args: Prisma.AlbumCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlbumCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlbumCommentCountArgs<ExtArgs>
            result: $Utils.Optional<AlbumCommentCountAggregateOutputType> | number
          }
        }
      }
      AlbumLike: {
        payload: Prisma.$AlbumLikePayload<ExtArgs>
        fields: Prisma.AlbumLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlbumLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlbumLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload>
          }
          findFirst: {
            args: Prisma.AlbumLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlbumLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload>
          }
          findMany: {
            args: Prisma.AlbumLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload>[]
          }
          create: {
            args: Prisma.AlbumLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload>
          }
          createMany: {
            args: Prisma.AlbumLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlbumLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload>[]
          }
          delete: {
            args: Prisma.AlbumLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload>
          }
          update: {
            args: Prisma.AlbumLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload>
          }
          deleteMany: {
            args: Prisma.AlbumLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlbumLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlbumLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload>[]
          }
          upsert: {
            args: Prisma.AlbumLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlbumLikePayload>
          }
          aggregate: {
            args: Prisma.AlbumLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlbumLike>
          }
          groupBy: {
            args: Prisma.AlbumLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlbumLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlbumLikeCountArgs<ExtArgs>
            result: $Utils.Optional<AlbumLikeCountAggregateOutputType> | number
          }
        }
      }
      Photo: {
        payload: Prisma.$PhotoPayload<ExtArgs>
        fields: Prisma.PhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          findFirst: {
            args: Prisma.PhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          findMany: {
            args: Prisma.PhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>[]
          }
          create: {
            args: Prisma.PhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          createMany: {
            args: Prisma.PhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>[]
          }
          delete: {
            args: Prisma.PhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          update: {
            args: Prisma.PhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          deleteMany: {
            args: Prisma.PhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>[]
          }
          upsert: {
            args: Prisma.PhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhotoPayload>
          }
          aggregate: {
            args: Prisma.PhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhoto>
          }
          groupBy: {
            args: Prisma.PhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhotoCountArgs<ExtArgs>
            result: $Utils.Optional<PhotoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    circle?: CircleOmit
    membership?: MembershipOmit
    post?: PostOmit
    comment?: CommentOmit
    like?: LikeOmit
    follow?: FollowOmit
    album?: AlbumOmit
    userSettings?: UserSettingsOmit
    albumComment?: AlbumCommentOmit
    albumLike?: AlbumLikeOmit
    photo?: PhotoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Album: number
    AlbumComment: number
    AlbumLike: number
    createdCircles: number
    comments: number
    following: number
    followers: number
    likes: number
    memberships: number
    posts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | UserCountOutputTypeCountAlbumArgs
    AlbumComment?: boolean | UserCountOutputTypeCountAlbumCommentArgs
    AlbumLike?: boolean | UserCountOutputTypeCountAlbumLikeArgs
    createdCircles?: boolean | UserCountOutputTypeCountCreatedCirclesArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    following?: boolean | UserCountOutputTypeCountFollowingArgs
    followers?: boolean | UserCountOutputTypeCountFollowersArgs
    likes?: boolean | UserCountOutputTypeCountLikesArgs
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    posts?: boolean | UserCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAlbumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlbumWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAlbumCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlbumCommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAlbumLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlbumLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedCirclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CircleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type CircleCountOutputType
   */

  export type CircleCountOutputType = {
    Album: number
    members: number
    posts: number
  }

  export type CircleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | CircleCountOutputTypeCountAlbumArgs
    members?: boolean | CircleCountOutputTypeCountMembersArgs
    posts?: boolean | CircleCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * CircleCountOutputType without action
   */
  export type CircleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CircleCountOutputType
     */
    select?: CircleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CircleCountOutputType without action
   */
  export type CircleCountOutputTypeCountAlbumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlbumWhereInput
  }

  /**
   * CircleCountOutputType without action
   */
  export type CircleCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
  }

  /**
   * CircleCountOutputType without action
   */
  export type CircleCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    comments: number
    likes: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | PostCountOutputTypeCountCommentsArgs
    likes?: boolean | PostCountOutputTypeCountLikesArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
  }


  /**
   * Count Type AlbumCountOutputType
   */

  export type AlbumCountOutputType = {
    AlbumComment: number
    AlbumLike: number
    Photo: number
  }

  export type AlbumCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    AlbumComment?: boolean | AlbumCountOutputTypeCountAlbumCommentArgs
    AlbumLike?: boolean | AlbumCountOutputTypeCountAlbumLikeArgs
    Photo?: boolean | AlbumCountOutputTypeCountPhotoArgs
  }

  // Custom InputTypes
  /**
   * AlbumCountOutputType without action
   */
  export type AlbumCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumCountOutputType
     */
    select?: AlbumCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlbumCountOutputType without action
   */
  export type AlbumCountOutputTypeCountAlbumCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlbumCommentWhereInput
  }

  /**
   * AlbumCountOutputType without action
   */
  export type AlbumCountOutputTypeCountAlbumLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlbumLikeWhereInput
  }

  /**
   * AlbumCountOutputType without action
   */
  export type AlbumCountOutputTypeCountPhotoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    username: string | null
    password: string | null
    bio: string | null
    profileImage: string | null
    coverImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isProfilePrivate: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    username: string | null
    password: string | null
    bio: string | null
    profileImage: string | null
    coverImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isProfilePrivate: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    username: number
    password: number
    bio: number
    profileImage: number
    coverImage: number
    createdAt: number
    updatedAt: number
    isProfilePrivate: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    username?: true
    password?: true
    bio?: true
    profileImage?: true
    coverImage?: true
    createdAt?: true
    updatedAt?: true
    isProfilePrivate?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    username?: true
    password?: true
    bio?: true
    profileImage?: true
    coverImage?: true
    createdAt?: true
    updatedAt?: true
    isProfilePrivate?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    username?: true
    password?: true
    bio?: true
    profileImage?: true
    coverImage?: true
    createdAt?: true
    updatedAt?: true
    isProfilePrivate?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string | null
    username: string
    password: string
    bio: string | null
    profileImage: string | null
    coverImage: string | null
    createdAt: Date
    updatedAt: Date
    isProfilePrivate: boolean | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    bio?: boolean
    profileImage?: boolean
    coverImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isProfilePrivate?: boolean
    Album?: boolean | User$AlbumArgs<ExtArgs>
    AlbumComment?: boolean | User$AlbumCommentArgs<ExtArgs>
    AlbumLike?: boolean | User$AlbumLikeArgs<ExtArgs>
    createdCircles?: boolean | User$createdCirclesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    bio?: boolean
    profileImage?: boolean
    coverImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isProfilePrivate?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    bio?: boolean
    profileImage?: boolean
    coverImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isProfilePrivate?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    password?: boolean
    bio?: boolean
    profileImage?: boolean
    coverImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isProfilePrivate?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "username" | "password" | "bio" | "profileImage" | "coverImage" | "createdAt" | "updatedAt" | "isProfilePrivate", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | User$AlbumArgs<ExtArgs>
    AlbumComment?: boolean | User$AlbumCommentArgs<ExtArgs>
    AlbumLike?: boolean | User$AlbumLikeArgs<ExtArgs>
    createdCircles?: boolean | User$createdCirclesArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Album: Prisma.$AlbumPayload<ExtArgs>[]
      AlbumComment: Prisma.$AlbumCommentPayload<ExtArgs>[]
      AlbumLike: Prisma.$AlbumLikePayload<ExtArgs>[]
      createdCircles: Prisma.$CirclePayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      following: Prisma.$FollowPayload<ExtArgs>[]
      followers: Prisma.$FollowPayload<ExtArgs>[]
      likes: Prisma.$LikePayload<ExtArgs>[]
      memberships: Prisma.$MembershipPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
      settings: Prisma.$UserSettingsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string | null
      username: string
      password: string
      bio: string | null
      profileImage: string | null
      coverImage: string | null
      createdAt: Date
      updatedAt: Date
      isProfilePrivate: boolean | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Album<T extends User$AlbumArgs<ExtArgs> = {}>(args?: Subset<T, User$AlbumArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    AlbumComment<T extends User$AlbumCommentArgs<ExtArgs> = {}>(args?: Subset<T, User$AlbumCommentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    AlbumLike<T extends User$AlbumLikeArgs<ExtArgs> = {}>(args?: Subset<T, User$AlbumLikeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdCircles<T extends User$createdCirclesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdCirclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    following<T extends User$followingArgs<ExtArgs> = {}>(args?: Subset<T, User$followingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followers<T extends User$followersArgs<ExtArgs> = {}>(args?: Subset<T, User$followersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends User$likesArgs<ExtArgs> = {}>(args?: Subset<T, User$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settings<T extends User$settingsArgs<ExtArgs> = {}>(args?: Subset<T, User$settingsArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly coverImage: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly isProfilePrivate: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Album
   */
  export type User$AlbumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    where?: AlbumWhereInput
    orderBy?: AlbumOrderByWithRelationInput | AlbumOrderByWithRelationInput[]
    cursor?: AlbumWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * User.AlbumComment
   */
  export type User$AlbumCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    where?: AlbumCommentWhereInput
    orderBy?: AlbumCommentOrderByWithRelationInput | AlbumCommentOrderByWithRelationInput[]
    cursor?: AlbumCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlbumCommentScalarFieldEnum | AlbumCommentScalarFieldEnum[]
  }

  /**
   * User.AlbumLike
   */
  export type User$AlbumLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    where?: AlbumLikeWhereInput
    orderBy?: AlbumLikeOrderByWithRelationInput | AlbumLikeOrderByWithRelationInput[]
    cursor?: AlbumLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlbumLikeScalarFieldEnum | AlbumLikeScalarFieldEnum[]
  }

  /**
   * User.createdCircles
   */
  export type User$createdCirclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    where?: CircleWhereInput
    orderBy?: CircleOrderByWithRelationInput | CircleOrderByWithRelationInput[]
    cursor?: CircleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CircleScalarFieldEnum | CircleScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User.following
   */
  export type User$followingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.followers
   */
  export type User$followersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.likes
   */
  export type User$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    cursor?: LikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    cursor?: MembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.settings
   */
  export type User$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    where?: UserSettingsWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Circle
   */

  export type AggregateCircle = {
    _count: CircleCountAggregateOutputType | null
    _avg: CircleAvgAggregateOutputType | null
    _sum: CircleSumAggregateOutputType | null
    _min: CircleMinAggregateOutputType | null
    _max: CircleMaxAggregateOutputType | null
  }

  export type CircleAvgAggregateOutputType = {
    id: number | null
    creatorId: number | null
  }

  export type CircleSumAggregateOutputType = {
    id: number | null
    creatorId: number | null
  }

  export type CircleMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    avatar: string | null
    coverImage: string | null
    isPrivate: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: number | null
  }

  export type CircleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    avatar: string | null
    coverImage: string | null
    isPrivate: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: number | null
  }

  export type CircleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    avatar: number
    coverImage: number
    isPrivate: number
    createdAt: number
    updatedAt: number
    creatorId: number
    _all: number
  }


  export type CircleAvgAggregateInputType = {
    id?: true
    creatorId?: true
  }

  export type CircleSumAggregateInputType = {
    id?: true
    creatorId?: true
  }

  export type CircleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    avatar?: true
    coverImage?: true
    isPrivate?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type CircleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    avatar?: true
    coverImage?: true
    isPrivate?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type CircleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    avatar?: true
    coverImage?: true
    isPrivate?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
    _all?: true
  }

  export type CircleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Circle to aggregate.
     */
    where?: CircleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Circles to fetch.
     */
    orderBy?: CircleOrderByWithRelationInput | CircleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CircleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Circles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Circles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Circles
    **/
    _count?: true | CircleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CircleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CircleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CircleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CircleMaxAggregateInputType
  }

  export type GetCircleAggregateType<T extends CircleAggregateArgs> = {
        [P in keyof T & keyof AggregateCircle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCircle[P]>
      : GetScalarType<T[P], AggregateCircle[P]>
  }




  export type CircleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CircleWhereInput
    orderBy?: CircleOrderByWithAggregationInput | CircleOrderByWithAggregationInput[]
    by: CircleScalarFieldEnum[] | CircleScalarFieldEnum
    having?: CircleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CircleCountAggregateInputType | true
    _avg?: CircleAvgAggregateInputType
    _sum?: CircleSumAggregateInputType
    _min?: CircleMinAggregateInputType
    _max?: CircleMaxAggregateInputType
  }

  export type CircleGroupByOutputType = {
    id: number
    name: string
    description: string | null
    avatar: string | null
    coverImage: string | null
    isPrivate: boolean
    createdAt: Date
    updatedAt: Date
    creatorId: number
    _count: CircleCountAggregateOutputType | null
    _avg: CircleAvgAggregateOutputType | null
    _sum: CircleSumAggregateOutputType | null
    _min: CircleMinAggregateOutputType | null
    _max: CircleMaxAggregateOutputType | null
  }

  type GetCircleGroupByPayload<T extends CircleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CircleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CircleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CircleGroupByOutputType[P]>
            : GetScalarType<T[P], CircleGroupByOutputType[P]>
        }
      >
    >


  export type CircleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    avatar?: boolean
    coverImage?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    Album?: boolean | Circle$AlbumArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Circle$membersArgs<ExtArgs>
    posts?: boolean | Circle$postsArgs<ExtArgs>
    _count?: boolean | CircleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["circle"]>

  export type CircleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    avatar?: boolean
    coverImage?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["circle"]>

  export type CircleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    avatar?: boolean
    coverImage?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["circle"]>

  export type CircleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    avatar?: boolean
    coverImage?: boolean
    isPrivate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
  }

  export type CircleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "avatar" | "coverImage" | "isPrivate" | "createdAt" | "updatedAt" | "creatorId", ExtArgs["result"]["circle"]>
  export type CircleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | Circle$AlbumArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Circle$membersArgs<ExtArgs>
    posts?: boolean | Circle$postsArgs<ExtArgs>
    _count?: boolean | CircleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CircleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CircleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CirclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Circle"
    objects: {
      Album: Prisma.$AlbumPayload<ExtArgs>[]
      creator: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$MembershipPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      avatar: string | null
      coverImage: string | null
      isPrivate: boolean
      createdAt: Date
      updatedAt: Date
      creatorId: number
    }, ExtArgs["result"]["circle"]>
    composites: {}
  }

  type CircleGetPayload<S extends boolean | null | undefined | CircleDefaultArgs> = $Result.GetResult<Prisma.$CirclePayload, S>

  type CircleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CircleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CircleCountAggregateInputType | true
    }

  export interface CircleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Circle'], meta: { name: 'Circle' } }
    /**
     * Find zero or one Circle that matches the filter.
     * @param {CircleFindUniqueArgs} args - Arguments to find a Circle
     * @example
     * // Get one Circle
     * const circle = await prisma.circle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CircleFindUniqueArgs>(args: SelectSubset<T, CircleFindUniqueArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Circle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CircleFindUniqueOrThrowArgs} args - Arguments to find a Circle
     * @example
     * // Get one Circle
     * const circle = await prisma.circle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CircleFindUniqueOrThrowArgs>(args: SelectSubset<T, CircleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Circle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CircleFindFirstArgs} args - Arguments to find a Circle
     * @example
     * // Get one Circle
     * const circle = await prisma.circle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CircleFindFirstArgs>(args?: SelectSubset<T, CircleFindFirstArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Circle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CircleFindFirstOrThrowArgs} args - Arguments to find a Circle
     * @example
     * // Get one Circle
     * const circle = await prisma.circle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CircleFindFirstOrThrowArgs>(args?: SelectSubset<T, CircleFindFirstOrThrowArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Circles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CircleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Circles
     * const circles = await prisma.circle.findMany()
     * 
     * // Get first 10 Circles
     * const circles = await prisma.circle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const circleWithIdOnly = await prisma.circle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CircleFindManyArgs>(args?: SelectSubset<T, CircleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Circle.
     * @param {CircleCreateArgs} args - Arguments to create a Circle.
     * @example
     * // Create one Circle
     * const Circle = await prisma.circle.create({
     *   data: {
     *     // ... data to create a Circle
     *   }
     * })
     * 
     */
    create<T extends CircleCreateArgs>(args: SelectSubset<T, CircleCreateArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Circles.
     * @param {CircleCreateManyArgs} args - Arguments to create many Circles.
     * @example
     * // Create many Circles
     * const circle = await prisma.circle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CircleCreateManyArgs>(args?: SelectSubset<T, CircleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Circles and returns the data saved in the database.
     * @param {CircleCreateManyAndReturnArgs} args - Arguments to create many Circles.
     * @example
     * // Create many Circles
     * const circle = await prisma.circle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Circles and only return the `id`
     * const circleWithIdOnly = await prisma.circle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CircleCreateManyAndReturnArgs>(args?: SelectSubset<T, CircleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Circle.
     * @param {CircleDeleteArgs} args - Arguments to delete one Circle.
     * @example
     * // Delete one Circle
     * const Circle = await prisma.circle.delete({
     *   where: {
     *     // ... filter to delete one Circle
     *   }
     * })
     * 
     */
    delete<T extends CircleDeleteArgs>(args: SelectSubset<T, CircleDeleteArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Circle.
     * @param {CircleUpdateArgs} args - Arguments to update one Circle.
     * @example
     * // Update one Circle
     * const circle = await prisma.circle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CircleUpdateArgs>(args: SelectSubset<T, CircleUpdateArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Circles.
     * @param {CircleDeleteManyArgs} args - Arguments to filter Circles to delete.
     * @example
     * // Delete a few Circles
     * const { count } = await prisma.circle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CircleDeleteManyArgs>(args?: SelectSubset<T, CircleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Circles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CircleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Circles
     * const circle = await prisma.circle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CircleUpdateManyArgs>(args: SelectSubset<T, CircleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Circles and returns the data updated in the database.
     * @param {CircleUpdateManyAndReturnArgs} args - Arguments to update many Circles.
     * @example
     * // Update many Circles
     * const circle = await prisma.circle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Circles and only return the `id`
     * const circleWithIdOnly = await prisma.circle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CircleUpdateManyAndReturnArgs>(args: SelectSubset<T, CircleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Circle.
     * @param {CircleUpsertArgs} args - Arguments to update or create a Circle.
     * @example
     * // Update or create a Circle
     * const circle = await prisma.circle.upsert({
     *   create: {
     *     // ... data to create a Circle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Circle we want to update
     *   }
     * })
     */
    upsert<T extends CircleUpsertArgs>(args: SelectSubset<T, CircleUpsertArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Circles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CircleCountArgs} args - Arguments to filter Circles to count.
     * @example
     * // Count the number of Circles
     * const count = await prisma.circle.count({
     *   where: {
     *     // ... the filter for the Circles we want to count
     *   }
     * })
    **/
    count<T extends CircleCountArgs>(
      args?: Subset<T, CircleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CircleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Circle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CircleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CircleAggregateArgs>(args: Subset<T, CircleAggregateArgs>): Prisma.PrismaPromise<GetCircleAggregateType<T>>

    /**
     * Group by Circle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CircleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CircleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CircleGroupByArgs['orderBy'] }
        : { orderBy?: CircleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CircleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCircleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Circle model
   */
  readonly fields: CircleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Circle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CircleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Album<T extends Circle$AlbumArgs<ExtArgs> = {}>(args?: Subset<T, Circle$AlbumArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Circle$membersArgs<ExtArgs> = {}>(args?: Subset<T, Circle$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends Circle$postsArgs<ExtArgs> = {}>(args?: Subset<T, Circle$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Circle model
   */
  interface CircleFieldRefs {
    readonly id: FieldRef<"Circle", 'Int'>
    readonly name: FieldRef<"Circle", 'String'>
    readonly description: FieldRef<"Circle", 'String'>
    readonly avatar: FieldRef<"Circle", 'String'>
    readonly coverImage: FieldRef<"Circle", 'String'>
    readonly isPrivate: FieldRef<"Circle", 'Boolean'>
    readonly createdAt: FieldRef<"Circle", 'DateTime'>
    readonly updatedAt: FieldRef<"Circle", 'DateTime'>
    readonly creatorId: FieldRef<"Circle", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Circle findUnique
   */
  export type CircleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    /**
     * Filter, which Circle to fetch.
     */
    where: CircleWhereUniqueInput
  }

  /**
   * Circle findUniqueOrThrow
   */
  export type CircleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    /**
     * Filter, which Circle to fetch.
     */
    where: CircleWhereUniqueInput
  }

  /**
   * Circle findFirst
   */
  export type CircleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    /**
     * Filter, which Circle to fetch.
     */
    where?: CircleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Circles to fetch.
     */
    orderBy?: CircleOrderByWithRelationInput | CircleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Circles.
     */
    cursor?: CircleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Circles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Circles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Circles.
     */
    distinct?: CircleScalarFieldEnum | CircleScalarFieldEnum[]
  }

  /**
   * Circle findFirstOrThrow
   */
  export type CircleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    /**
     * Filter, which Circle to fetch.
     */
    where?: CircleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Circles to fetch.
     */
    orderBy?: CircleOrderByWithRelationInput | CircleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Circles.
     */
    cursor?: CircleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Circles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Circles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Circles.
     */
    distinct?: CircleScalarFieldEnum | CircleScalarFieldEnum[]
  }

  /**
   * Circle findMany
   */
  export type CircleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    /**
     * Filter, which Circles to fetch.
     */
    where?: CircleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Circles to fetch.
     */
    orderBy?: CircleOrderByWithRelationInput | CircleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Circles.
     */
    cursor?: CircleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Circles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Circles.
     */
    skip?: number
    distinct?: CircleScalarFieldEnum | CircleScalarFieldEnum[]
  }

  /**
   * Circle create
   */
  export type CircleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    /**
     * The data needed to create a Circle.
     */
    data: XOR<CircleCreateInput, CircleUncheckedCreateInput>
  }

  /**
   * Circle createMany
   */
  export type CircleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Circles.
     */
    data: CircleCreateManyInput | CircleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Circle createManyAndReturn
   */
  export type CircleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * The data used to create many Circles.
     */
    data: CircleCreateManyInput | CircleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Circle update
   */
  export type CircleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    /**
     * The data needed to update a Circle.
     */
    data: XOR<CircleUpdateInput, CircleUncheckedUpdateInput>
    /**
     * Choose, which Circle to update.
     */
    where: CircleWhereUniqueInput
  }

  /**
   * Circle updateMany
   */
  export type CircleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Circles.
     */
    data: XOR<CircleUpdateManyMutationInput, CircleUncheckedUpdateManyInput>
    /**
     * Filter which Circles to update
     */
    where?: CircleWhereInput
    /**
     * Limit how many Circles to update.
     */
    limit?: number
  }

  /**
   * Circle updateManyAndReturn
   */
  export type CircleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * The data used to update Circles.
     */
    data: XOR<CircleUpdateManyMutationInput, CircleUncheckedUpdateManyInput>
    /**
     * Filter which Circles to update
     */
    where?: CircleWhereInput
    /**
     * Limit how many Circles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Circle upsert
   */
  export type CircleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    /**
     * The filter to search for the Circle to update in case it exists.
     */
    where: CircleWhereUniqueInput
    /**
     * In case the Circle found by the `where` argument doesn't exist, create a new Circle with this data.
     */
    create: XOR<CircleCreateInput, CircleUncheckedCreateInput>
    /**
     * In case the Circle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CircleUpdateInput, CircleUncheckedUpdateInput>
  }

  /**
   * Circle delete
   */
  export type CircleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    /**
     * Filter which Circle to delete.
     */
    where: CircleWhereUniqueInput
  }

  /**
   * Circle deleteMany
   */
  export type CircleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Circles to delete
     */
    where?: CircleWhereInput
    /**
     * Limit how many Circles to delete.
     */
    limit?: number
  }

  /**
   * Circle.Album
   */
  export type Circle$AlbumArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    where?: AlbumWhereInput
    orderBy?: AlbumOrderByWithRelationInput | AlbumOrderByWithRelationInput[]
    cursor?: AlbumWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * Circle.members
   */
  export type Circle$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    cursor?: MembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Circle.posts
   */
  export type Circle$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Circle without action
   */
  export type CircleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
  }


  /**
   * Model Membership
   */

  export type AggregateMembership = {
    _count: MembershipCountAggregateOutputType | null
    _avg: MembershipAvgAggregateOutputType | null
    _sum: MembershipSumAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  export type MembershipAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    circleId: number | null
  }

  export type MembershipSumAggregateOutputType = {
    id: number | null
    userId: number | null
    circleId: number | null
  }

  export type MembershipMinAggregateOutputType = {
    id: number | null
    userId: number | null
    circleId: number | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MembershipMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    circleId: number | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MembershipCountAggregateOutputType = {
    id: number
    userId: number
    circleId: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MembershipAvgAggregateInputType = {
    id?: true
    userId?: true
    circleId?: true
  }

  export type MembershipSumAggregateInputType = {
    id?: true
    userId?: true
    circleId?: true
  }

  export type MembershipMinAggregateInputType = {
    id?: true
    userId?: true
    circleId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MembershipMaxAggregateInputType = {
    id?: true
    userId?: true
    circleId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MembershipCountAggregateInputType = {
    id?: true
    userId?: true
    circleId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Membership to aggregate.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memberships
    **/
    _count?: true | MembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MembershipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MembershipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MembershipMaxAggregateInputType
  }

  export type GetMembershipAggregateType<T extends MembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMembership[P]>
      : GetScalarType<T[P], AggregateMembership[P]>
  }




  export type MembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithAggregationInput | MembershipOrderByWithAggregationInput[]
    by: MembershipScalarFieldEnum[] | MembershipScalarFieldEnum
    having?: MembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MembershipCountAggregateInputType | true
    _avg?: MembershipAvgAggregateInputType
    _sum?: MembershipSumAggregateInputType
    _min?: MembershipMinAggregateInputType
    _max?: MembershipMaxAggregateInputType
  }

  export type MembershipGroupByOutputType = {
    id: number
    userId: number
    circleId: number
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: MembershipCountAggregateOutputType | null
    _avg: MembershipAvgAggregateOutputType | null
    _sum: MembershipSumAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  type GetMembershipGroupByPayload<T extends MembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MembershipGroupByOutputType[P]>
            : GetScalarType<T[P], MembershipGroupByOutputType[P]>
        }
      >
    >


  export type MembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    circleId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    circleId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    circleId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>

  export type MembershipSelectScalar = {
    id?: boolean
    userId?: boolean
    circleId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "circleId" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["membership"]>
  export type MembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Membership"
    objects: {
      circle: Prisma.$CirclePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      circleId: number
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["membership"]>
    composites: {}
  }

  type MembershipGetPayload<S extends boolean | null | undefined | MembershipDefaultArgs> = $Result.GetResult<Prisma.$MembershipPayload, S>

  type MembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MembershipCountAggregateInputType | true
    }

  export interface MembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Membership'], meta: { name: 'Membership' } }
    /**
     * Find zero or one Membership that matches the filter.
     * @param {MembershipFindUniqueArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MembershipFindUniqueArgs>(args: SelectSubset<T, MembershipFindUniqueArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Membership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MembershipFindUniqueOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, MembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MembershipFindFirstArgs>(args?: SelectSubset<T, MembershipFindFirstArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, MembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Memberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memberships
     * const memberships = await prisma.membership.findMany()
     * 
     * // Get first 10 Memberships
     * const memberships = await prisma.membership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const membershipWithIdOnly = await prisma.membership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MembershipFindManyArgs>(args?: SelectSubset<T, MembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Membership.
     * @param {MembershipCreateArgs} args - Arguments to create a Membership.
     * @example
     * // Create one Membership
     * const Membership = await prisma.membership.create({
     *   data: {
     *     // ... data to create a Membership
     *   }
     * })
     * 
     */
    create<T extends MembershipCreateArgs>(args: SelectSubset<T, MembershipCreateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Memberships.
     * @param {MembershipCreateManyArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MembershipCreateManyArgs>(args?: SelectSubset<T, MembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Memberships and returns the data saved in the database.
     * @param {MembershipCreateManyAndReturnArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Memberships and only return the `id`
     * const membershipWithIdOnly = await prisma.membership.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, MembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Membership.
     * @param {MembershipDeleteArgs} args - Arguments to delete one Membership.
     * @example
     * // Delete one Membership
     * const Membership = await prisma.membership.delete({
     *   where: {
     *     // ... filter to delete one Membership
     *   }
     * })
     * 
     */
    delete<T extends MembershipDeleteArgs>(args: SelectSubset<T, MembershipDeleteArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Membership.
     * @param {MembershipUpdateArgs} args - Arguments to update one Membership.
     * @example
     * // Update one Membership
     * const membership = await prisma.membership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MembershipUpdateArgs>(args: SelectSubset<T, MembershipUpdateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Memberships.
     * @param {MembershipDeleteManyArgs} args - Arguments to filter Memberships to delete.
     * @example
     * // Delete a few Memberships
     * const { count } = await prisma.membership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MembershipDeleteManyArgs>(args?: SelectSubset<T, MembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memberships
     * const membership = await prisma.membership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MembershipUpdateManyArgs>(args: SelectSubset<T, MembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memberships and returns the data updated in the database.
     * @param {MembershipUpdateManyAndReturnArgs} args - Arguments to update many Memberships.
     * @example
     * // Update many Memberships
     * const membership = await prisma.membership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Memberships and only return the `id`
     * const membershipWithIdOnly = await prisma.membership.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, MembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Membership.
     * @param {MembershipUpsertArgs} args - Arguments to update or create a Membership.
     * @example
     * // Update or create a Membership
     * const membership = await prisma.membership.upsert({
     *   create: {
     *     // ... data to create a Membership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Membership we want to update
     *   }
     * })
     */
    upsert<T extends MembershipUpsertArgs>(args: SelectSubset<T, MembershipUpsertArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipCountArgs} args - Arguments to filter Memberships to count.
     * @example
     * // Count the number of Memberships
     * const count = await prisma.membership.count({
     *   where: {
     *     // ... the filter for the Memberships we want to count
     *   }
     * })
    **/
    count<T extends MembershipCountArgs>(
      args?: Subset<T, MembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MembershipAggregateArgs>(args: Subset<T, MembershipAggregateArgs>): Prisma.PrismaPromise<GetMembershipAggregateType<T>>

    /**
     * Group by Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MembershipGroupByArgs['orderBy'] }
        : { orderBy?: MembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Membership model
   */
  readonly fields: MembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Membership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    circle<T extends CircleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CircleDefaultArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Membership model
   */
  interface MembershipFieldRefs {
    readonly id: FieldRef<"Membership", 'Int'>
    readonly userId: FieldRef<"Membership", 'Int'>
    readonly circleId: FieldRef<"Membership", 'Int'>
    readonly role: FieldRef<"Membership", 'Role'>
    readonly createdAt: FieldRef<"Membership", 'DateTime'>
    readonly updatedAt: FieldRef<"Membership", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Membership findUnique
   */
  export type MembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findUniqueOrThrow
   */
  export type MembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findFirst
   */
  export type MembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findFirstOrThrow
   */
  export type MembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findMany
   */
  export type MembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Memberships to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership create
   */
  export type MembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a Membership.
     */
    data: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
  }

  /**
   * Membership createMany
   */
  export type MembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Membership createManyAndReturn
   */
  export type MembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Membership update
   */
  export type MembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a Membership.
     */
    data: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
    /**
     * Choose, which Membership to update.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership updateMany
   */
  export type MembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memberships.
     */
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyInput>
    /**
     * Filter which Memberships to update
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to update.
     */
    limit?: number
  }

  /**
   * Membership updateManyAndReturn
   */
  export type MembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * The data used to update Memberships.
     */
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyInput>
    /**
     * Filter which Memberships to update
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Membership upsert
   */
  export type MembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the Membership to update in case it exists.
     */
    where: MembershipWhereUniqueInput
    /**
     * In case the Membership found by the `where` argument doesn't exist, create a new Membership with this data.
     */
    create: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
    /**
     * In case the Membership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
  }

  /**
   * Membership delete
   */
  export type MembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter which Membership to delete.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership deleteMany
   */
  export type MembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memberships to delete
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to delete.
     */
    limit?: number
  }

  /**
   * Membership without action
   */
  export type MembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    circleId: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
    userId: number | null
    circleId: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    content: string | null
    imageUrl: string | null
    videoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    circleId: number | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    content: string | null
    imageUrl: string | null
    videoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    circleId: number | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    content: number
    imageUrl: number
    videoUrl: number
    createdAt: number
    updatedAt: number
    userId: number
    circleId: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
    userId?: true
    circleId?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
    userId?: true
    circleId?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    content?: true
    imageUrl?: true
    videoUrl?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    circleId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    content?: true
    imageUrl?: true
    videoUrl?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    circleId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    content?: true
    imageUrl?: true
    videoUrl?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    circleId?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: number
    content: string
    imageUrl: string | null
    videoUrl: string | null
    createdAt: Date
    updatedAt: Date
    userId: number
    circleId: number
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    imageUrl?: boolean
    videoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    circleId?: boolean
    comments?: boolean | Post$commentsArgs<ExtArgs>
    likes?: boolean | Post$likesArgs<ExtArgs>
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    imageUrl?: boolean
    videoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    circleId?: boolean
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    imageUrl?: boolean
    videoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    circleId?: boolean
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    content?: boolean
    imageUrl?: boolean
    videoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    circleId?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "imageUrl" | "videoUrl" | "createdAt" | "updatedAt" | "userId" | "circleId", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | Post$commentsArgs<ExtArgs>
    likes?: boolean | Post$likesArgs<ExtArgs>
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    circle?: boolean | CircleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      comments: Prisma.$CommentPayload<ExtArgs>[]
      likes: Prisma.$LikePayload<ExtArgs>[]
      circle: Prisma.$CirclePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      imageUrl: string | null
      videoUrl: string | null
      createdAt: Date
      updatedAt: Date
      userId: number
      circleId: number
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comments<T extends Post$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Post$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Post$likesArgs<ExtArgs> = {}>(args?: Subset<T, Post$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    circle<T extends CircleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CircleDefaultArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'Int'>
    readonly content: FieldRef<"Post", 'String'>
    readonly imageUrl: FieldRef<"Post", 'String'>
    readonly videoUrl: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
    readonly userId: FieldRef<"Post", 'Int'>
    readonly circleId: FieldRef<"Post", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.comments
   */
  export type Post$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Post.likes
   */
  export type Post$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    cursor?: LikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    postId: number | null
  }

  export type CommentSumAggregateOutputType = {
    id: number | null
    userId: number | null
    postId: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    postId: number | null
  }

  export type CommentMaxAggregateOutputType = {
    id: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    postId: number | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    content: number
    createdAt: number
    updatedAt: number
    userId: number
    postId: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
  }

  export type CommentSumAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    postId?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    postId?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    postId?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: number
    content: string
    createdAt: Date
    updatedAt: Date
    userId: number
    postId: number
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    postId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    postId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    postId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    postId?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "createdAt" | "updatedAt" | "userId" | "postId", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      createdAt: Date
      updatedAt: Date
      userId: number
      postId: number
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'Int'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
    readonly updatedAt: FieldRef<"Comment", 'DateTime'>
    readonly userId: FieldRef<"Comment", 'Int'>
    readonly postId: FieldRef<"Comment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Like
   */

  export type AggregateLike = {
    _count: LikeCountAggregateOutputType | null
    _avg: LikeAvgAggregateOutputType | null
    _sum: LikeSumAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  export type LikeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    postId: number | null
  }

  export type LikeSumAggregateOutputType = {
    id: number | null
    userId: number | null
    postId: number | null
  }

  export type LikeMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    userId: number | null
    postId: number | null
  }

  export type LikeMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    userId: number | null
    postId: number | null
  }

  export type LikeCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    postId: number
    _all: number
  }


  export type LikeAvgAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
  }

  export type LikeSumAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
  }

  export type LikeMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    postId?: true
  }

  export type LikeMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    postId?: true
  }

  export type LikeCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    postId?: true
    _all?: true
  }

  export type LikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Like to aggregate.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Likes
    **/
    _count?: true | LikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LikeMaxAggregateInputType
  }

  export type GetLikeAggregateType<T extends LikeAggregateArgs> = {
        [P in keyof T & keyof AggregateLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLike[P]>
      : GetScalarType<T[P], AggregateLike[P]>
  }




  export type LikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LikeWhereInput
    orderBy?: LikeOrderByWithAggregationInput | LikeOrderByWithAggregationInput[]
    by: LikeScalarFieldEnum[] | LikeScalarFieldEnum
    having?: LikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LikeCountAggregateInputType | true
    _avg?: LikeAvgAggregateInputType
    _sum?: LikeSumAggregateInputType
    _min?: LikeMinAggregateInputType
    _max?: LikeMaxAggregateInputType
  }

  export type LikeGroupByOutputType = {
    id: number
    createdAt: Date
    userId: number
    postId: number
    _count: LikeCountAggregateOutputType | null
    _avg: LikeAvgAggregateOutputType | null
    _sum: LikeSumAggregateOutputType | null
    _min: LikeMinAggregateOutputType | null
    _max: LikeMaxAggregateOutputType | null
  }

  type GetLikeGroupByPayload<T extends LikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LikeGroupByOutputType[P]>
            : GetScalarType<T[P], LikeGroupByOutputType[P]>
        }
      >
    >


  export type LikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    postId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    postId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    postId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["like"]>

  export type LikeSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    postId?: boolean
  }

  export type LikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "postId", ExtArgs["result"]["like"]>
  export type LikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Like"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      userId: number
      postId: number
    }, ExtArgs["result"]["like"]>
    composites: {}
  }

  type LikeGetPayload<S extends boolean | null | undefined | LikeDefaultArgs> = $Result.GetResult<Prisma.$LikePayload, S>

  type LikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LikeCountAggregateInputType | true
    }

  export interface LikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Like'], meta: { name: 'Like' } }
    /**
     * Find zero or one Like that matches the filter.
     * @param {LikeFindUniqueArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LikeFindUniqueArgs>(args: SelectSubset<T, LikeFindUniqueArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Like that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LikeFindUniqueOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LikeFindUniqueOrThrowArgs>(args: SelectSubset<T, LikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LikeFindFirstArgs>(args?: SelectSubset<T, LikeFindFirstArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Like that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindFirstOrThrowArgs} args - Arguments to find a Like
     * @example
     * // Get one Like
     * const like = await prisma.like.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LikeFindFirstOrThrowArgs>(args?: SelectSubset<T, LikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Likes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Likes
     * const likes = await prisma.like.findMany()
     * 
     * // Get first 10 Likes
     * const likes = await prisma.like.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const likeWithIdOnly = await prisma.like.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LikeFindManyArgs>(args?: SelectSubset<T, LikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Like.
     * @param {LikeCreateArgs} args - Arguments to create a Like.
     * @example
     * // Create one Like
     * const Like = await prisma.like.create({
     *   data: {
     *     // ... data to create a Like
     *   }
     * })
     * 
     */
    create<T extends LikeCreateArgs>(args: SelectSubset<T, LikeCreateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Likes.
     * @param {LikeCreateManyArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const like = await prisma.like.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LikeCreateManyArgs>(args?: SelectSubset<T, LikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Likes and returns the data saved in the database.
     * @param {LikeCreateManyAndReturnArgs} args - Arguments to create many Likes.
     * @example
     * // Create many Likes
     * const like = await prisma.like.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Likes and only return the `id`
     * const likeWithIdOnly = await prisma.like.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LikeCreateManyAndReturnArgs>(args?: SelectSubset<T, LikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Like.
     * @param {LikeDeleteArgs} args - Arguments to delete one Like.
     * @example
     * // Delete one Like
     * const Like = await prisma.like.delete({
     *   where: {
     *     // ... filter to delete one Like
     *   }
     * })
     * 
     */
    delete<T extends LikeDeleteArgs>(args: SelectSubset<T, LikeDeleteArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Like.
     * @param {LikeUpdateArgs} args - Arguments to update one Like.
     * @example
     * // Update one Like
     * const like = await prisma.like.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LikeUpdateArgs>(args: SelectSubset<T, LikeUpdateArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Likes.
     * @param {LikeDeleteManyArgs} args - Arguments to filter Likes to delete.
     * @example
     * // Delete a few Likes
     * const { count } = await prisma.like.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LikeDeleteManyArgs>(args?: SelectSubset<T, LikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Likes
     * const like = await prisma.like.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LikeUpdateManyArgs>(args: SelectSubset<T, LikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Likes and returns the data updated in the database.
     * @param {LikeUpdateManyAndReturnArgs} args - Arguments to update many Likes.
     * @example
     * // Update many Likes
     * const like = await prisma.like.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Likes and only return the `id`
     * const likeWithIdOnly = await prisma.like.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LikeUpdateManyAndReturnArgs>(args: SelectSubset<T, LikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Like.
     * @param {LikeUpsertArgs} args - Arguments to update or create a Like.
     * @example
     * // Update or create a Like
     * const like = await prisma.like.upsert({
     *   create: {
     *     // ... data to create a Like
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Like we want to update
     *   }
     * })
     */
    upsert<T extends LikeUpsertArgs>(args: SelectSubset<T, LikeUpsertArgs<ExtArgs>>): Prisma__LikeClient<$Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Likes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeCountArgs} args - Arguments to filter Likes to count.
     * @example
     * // Count the number of Likes
     * const count = await prisma.like.count({
     *   where: {
     *     // ... the filter for the Likes we want to count
     *   }
     * })
    **/
    count<T extends LikeCountArgs>(
      args?: Subset<T, LikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LikeAggregateArgs>(args: Subset<T, LikeAggregateArgs>): Prisma.PrismaPromise<GetLikeAggregateType<T>>

    /**
     * Group by Like.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LikeGroupByArgs['orderBy'] }
        : { orderBy?: LikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Like model
   */
  readonly fields: LikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Like.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Like model
   */
  interface LikeFieldRefs {
    readonly id: FieldRef<"Like", 'Int'>
    readonly createdAt: FieldRef<"Like", 'DateTime'>
    readonly userId: FieldRef<"Like", 'Int'>
    readonly postId: FieldRef<"Like", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Like findUnique
   */
  export type LikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findUniqueOrThrow
   */
  export type LikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like findFirst
   */
  export type LikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findFirstOrThrow
   */
  export type LikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Like to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Likes.
     */
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like findMany
   */
  export type LikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter, which Likes to fetch.
     */
    where?: LikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Likes to fetch.
     */
    orderBy?: LikeOrderByWithRelationInput | LikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Likes.
     */
    cursor?: LikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Likes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Likes.
     */
    skip?: number
    distinct?: LikeScalarFieldEnum | LikeScalarFieldEnum[]
  }

  /**
   * Like create
   */
  export type LikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to create a Like.
     */
    data: XOR<LikeCreateInput, LikeUncheckedCreateInput>
  }

  /**
   * Like createMany
   */
  export type LikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Likes.
     */
    data: LikeCreateManyInput | LikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Like createManyAndReturn
   */
  export type LikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * The data used to create many Likes.
     */
    data: LikeCreateManyInput | LikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Like update
   */
  export type LikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The data needed to update a Like.
     */
    data: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
    /**
     * Choose, which Like to update.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like updateMany
   */
  export type LikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Likes.
     */
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyInput>
    /**
     * Filter which Likes to update
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to update.
     */
    limit?: number
  }

  /**
   * Like updateManyAndReturn
   */
  export type LikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * The data used to update Likes.
     */
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyInput>
    /**
     * Filter which Likes to update
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Like upsert
   */
  export type LikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * The filter to search for the Like to update in case it exists.
     */
    where: LikeWhereUniqueInput
    /**
     * In case the Like found by the `where` argument doesn't exist, create a new Like with this data.
     */
    create: XOR<LikeCreateInput, LikeUncheckedCreateInput>
    /**
     * In case the Like was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LikeUpdateInput, LikeUncheckedUpdateInput>
  }

  /**
   * Like delete
   */
  export type LikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
    /**
     * Filter which Like to delete.
     */
    where: LikeWhereUniqueInput
  }

  /**
   * Like deleteMany
   */
  export type LikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Likes to delete
     */
    where?: LikeWhereInput
    /**
     * Limit how many Likes to delete.
     */
    limit?: number
  }

  /**
   * Like without action
   */
  export type LikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: LikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Like
     */
    omit?: LikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LikeInclude<ExtArgs> | null
  }


  /**
   * Model Follow
   */

  export type AggregateFollow = {
    _count: FollowCountAggregateOutputType | null
    _avg: FollowAvgAggregateOutputType | null
    _sum: FollowSumAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  export type FollowAvgAggregateOutputType = {
    id: number | null
    followerId: number | null
    followingId: number | null
  }

  export type FollowSumAggregateOutputType = {
    id: number | null
    followerId: number | null
    followingId: number | null
  }

  export type FollowMinAggregateOutputType = {
    id: number | null
    followerId: number | null
    followingId: number | null
    createdAt: Date | null
  }

  export type FollowMaxAggregateOutputType = {
    id: number | null
    followerId: number | null
    followingId: number | null
    createdAt: Date | null
  }

  export type FollowCountAggregateOutputType = {
    id: number
    followerId: number
    followingId: number
    createdAt: number
    _all: number
  }


  export type FollowAvgAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
  }

  export type FollowSumAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
  }

  export type FollowMinAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
    createdAt?: true
  }

  export type FollowMaxAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
    createdAt?: true
  }

  export type FollowCountAggregateInputType = {
    id?: true
    followerId?: true
    followingId?: true
    createdAt?: true
    _all?: true
  }

  export type FollowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follow to aggregate.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Follows
    **/
    _count?: true | FollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FollowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FollowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowMaxAggregateInputType
  }

  export type GetFollowAggregateType<T extends FollowAggregateArgs> = {
        [P in keyof T & keyof AggregateFollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollow[P]>
      : GetScalarType<T[P], AggregateFollow[P]>
  }




  export type FollowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithAggregationInput | FollowOrderByWithAggregationInput[]
    by: FollowScalarFieldEnum[] | FollowScalarFieldEnum
    having?: FollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowCountAggregateInputType | true
    _avg?: FollowAvgAggregateInputType
    _sum?: FollowSumAggregateInputType
    _min?: FollowMinAggregateInputType
    _max?: FollowMaxAggregateInputType
  }

  export type FollowGroupByOutputType = {
    id: number
    followerId: number
    followingId: number
    createdAt: Date
    _count: FollowCountAggregateOutputType | null
    _avg: FollowAvgAggregateOutputType | null
    _sum: FollowSumAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  type GetFollowGroupByPayload<T extends FollowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FollowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowGroupByOutputType[P]>
            : GetScalarType<T[P], FollowGroupByOutputType[P]>
        }
      >
    >


  export type FollowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectScalar = {
    id?: boolean
    followerId?: boolean
    followingId?: boolean
    createdAt?: boolean
  }

  export type FollowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "followerId" | "followingId" | "createdAt", ExtArgs["result"]["follow"]>
  export type FollowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    following?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FollowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Follow"
    objects: {
      follower: Prisma.$UserPayload<ExtArgs>
      following: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      followerId: number
      followingId: number
      createdAt: Date
    }, ExtArgs["result"]["follow"]>
    composites: {}
  }

  type FollowGetPayload<S extends boolean | null | undefined | FollowDefaultArgs> = $Result.GetResult<Prisma.$FollowPayload, S>

  type FollowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FollowCountAggregateInputType | true
    }

  export interface FollowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Follow'], meta: { name: 'Follow' } }
    /**
     * Find zero or one Follow that matches the filter.
     * @param {FollowFindUniqueArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FollowFindUniqueArgs>(args: SelectSubset<T, FollowFindUniqueArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Follow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FollowFindUniqueOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FollowFindUniqueOrThrowArgs>(args: SelectSubset<T, FollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FollowFindFirstArgs>(args?: SelectSubset<T, FollowFindFirstArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FollowFindFirstOrThrowArgs>(args?: SelectSubset<T, FollowFindFirstOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Follows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Follows
     * const follows = await prisma.follow.findMany()
     * 
     * // Get first 10 Follows
     * const follows = await prisma.follow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const followWithIdOnly = await prisma.follow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FollowFindManyArgs>(args?: SelectSubset<T, FollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Follow.
     * @param {FollowCreateArgs} args - Arguments to create a Follow.
     * @example
     * // Create one Follow
     * const Follow = await prisma.follow.create({
     *   data: {
     *     // ... data to create a Follow
     *   }
     * })
     * 
     */
    create<T extends FollowCreateArgs>(args: SelectSubset<T, FollowCreateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Follows.
     * @param {FollowCreateManyArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FollowCreateManyArgs>(args?: SelectSubset<T, FollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Follows and returns the data saved in the database.
     * @param {FollowCreateManyAndReturnArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Follows and only return the `id`
     * const followWithIdOnly = await prisma.follow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FollowCreateManyAndReturnArgs>(args?: SelectSubset<T, FollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Follow.
     * @param {FollowDeleteArgs} args - Arguments to delete one Follow.
     * @example
     * // Delete one Follow
     * const Follow = await prisma.follow.delete({
     *   where: {
     *     // ... filter to delete one Follow
     *   }
     * })
     * 
     */
    delete<T extends FollowDeleteArgs>(args: SelectSubset<T, FollowDeleteArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Follow.
     * @param {FollowUpdateArgs} args - Arguments to update one Follow.
     * @example
     * // Update one Follow
     * const follow = await prisma.follow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FollowUpdateArgs>(args: SelectSubset<T, FollowUpdateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Follows.
     * @param {FollowDeleteManyArgs} args - Arguments to filter Follows to delete.
     * @example
     * // Delete a few Follows
     * const { count } = await prisma.follow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FollowDeleteManyArgs>(args?: SelectSubset<T, FollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FollowUpdateManyArgs>(args: SelectSubset<T, FollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows and returns the data updated in the database.
     * @param {FollowUpdateManyAndReturnArgs} args - Arguments to update many Follows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Follows and only return the `id`
     * const followWithIdOnly = await prisma.follow.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FollowUpdateManyAndReturnArgs>(args: SelectSubset<T, FollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Follow.
     * @param {FollowUpsertArgs} args - Arguments to update or create a Follow.
     * @example
     * // Update or create a Follow
     * const follow = await prisma.follow.upsert({
     *   create: {
     *     // ... data to create a Follow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Follow we want to update
     *   }
     * })
     */
    upsert<T extends FollowUpsertArgs>(args: SelectSubset<T, FollowUpsertArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowCountArgs} args - Arguments to filter Follows to count.
     * @example
     * // Count the number of Follows
     * const count = await prisma.follow.count({
     *   where: {
     *     // ... the filter for the Follows we want to count
     *   }
     * })
    **/
    count<T extends FollowCountArgs>(
      args?: Subset<T, FollowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FollowAggregateArgs>(args: Subset<T, FollowAggregateArgs>): Prisma.PrismaPromise<GetFollowAggregateType<T>>

    /**
     * Group by Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FollowGroupByArgs['orderBy'] }
        : { orderBy?: FollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Follow model
   */
  readonly fields: FollowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Follow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FollowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    follower<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    following<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Follow model
   */
  interface FollowFieldRefs {
    readonly id: FieldRef<"Follow", 'Int'>
    readonly followerId: FieldRef<"Follow", 'Int'>
    readonly followingId: FieldRef<"Follow", 'Int'>
    readonly createdAt: FieldRef<"Follow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Follow findUnique
   */
  export type FollowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findUniqueOrThrow
   */
  export type FollowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findFirst
   */
  export type FollowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findFirstOrThrow
   */
  export type FollowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findMany
   */
  export type FollowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow create
   */
  export type FollowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to create a Follow.
     */
    data: XOR<FollowCreateInput, FollowUncheckedCreateInput>
  }

  /**
   * Follow createMany
   */
  export type FollowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Follow createManyAndReturn
   */
  export type FollowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow update
   */
  export type FollowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to update a Follow.
     */
    data: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
    /**
     * Choose, which Follow to update.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow updateMany
   */
  export type FollowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
  }

  /**
   * Follow updateManyAndReturn
   */
  export type FollowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow upsert
   */
  export type FollowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The filter to search for the Follow to update in case it exists.
     */
    where: FollowWhereUniqueInput
    /**
     * In case the Follow found by the `where` argument doesn't exist, create a new Follow with this data.
     */
    create: XOR<FollowCreateInput, FollowUncheckedCreateInput>
    /**
     * In case the Follow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
  }

  /**
   * Follow delete
   */
  export type FollowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter which Follow to delete.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow deleteMany
   */
  export type FollowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follows to delete
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to delete.
     */
    limit?: number
  }

  /**
   * Follow without action
   */
  export type FollowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
  }


  /**
   * Model Album
   */

  export type AggregateAlbum = {
    _count: AlbumCountAggregateOutputType | null
    _avg: AlbumAvgAggregateOutputType | null
    _sum: AlbumSumAggregateOutputType | null
    _min: AlbumMinAggregateOutputType | null
    _max: AlbumMaxAggregateOutputType | null
  }

  export type AlbumAvgAggregateOutputType = {
    id: number | null
    creatorId: number | null
    circleId: number | null
  }

  export type AlbumSumAggregateOutputType = {
    id: number | null
    creatorId: number | null
    circleId: number | null
  }

  export type AlbumMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    coverImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: number | null
    circleId: number | null
    isPrivate: boolean | null
  }

  export type AlbumMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    coverImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: number | null
    circleId: number | null
    isPrivate: boolean | null
  }

  export type AlbumCountAggregateOutputType = {
    id: number
    title: number
    description: number
    coverImage: number
    createdAt: number
    updatedAt: number
    creatorId: number
    circleId: number
    isPrivate: number
    _all: number
  }


  export type AlbumAvgAggregateInputType = {
    id?: true
    creatorId?: true
    circleId?: true
  }

  export type AlbumSumAggregateInputType = {
    id?: true
    creatorId?: true
    circleId?: true
  }

  export type AlbumMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    coverImage?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
    circleId?: true
    isPrivate?: true
  }

  export type AlbumMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    coverImage?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
    circleId?: true
    isPrivate?: true
  }

  export type AlbumCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    coverImage?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
    circleId?: true
    isPrivate?: true
    _all?: true
  }

  export type AlbumAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Album to aggregate.
     */
    where?: AlbumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Albums to fetch.
     */
    orderBy?: AlbumOrderByWithRelationInput | AlbumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlbumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Albums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Albums
    **/
    _count?: true | AlbumCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlbumAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlbumSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlbumMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlbumMaxAggregateInputType
  }

  export type GetAlbumAggregateType<T extends AlbumAggregateArgs> = {
        [P in keyof T & keyof AggregateAlbum]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlbum[P]>
      : GetScalarType<T[P], AggregateAlbum[P]>
  }




  export type AlbumGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlbumWhereInput
    orderBy?: AlbumOrderByWithAggregationInput | AlbumOrderByWithAggregationInput[]
    by: AlbumScalarFieldEnum[] | AlbumScalarFieldEnum
    having?: AlbumScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlbumCountAggregateInputType | true
    _avg?: AlbumAvgAggregateInputType
    _sum?: AlbumSumAggregateInputType
    _min?: AlbumMinAggregateInputType
    _max?: AlbumMaxAggregateInputType
  }

  export type AlbumGroupByOutputType = {
    id: number
    title: string
    description: string | null
    coverImage: string | null
    createdAt: Date
    updatedAt: Date
    creatorId: number | null
    circleId: number | null
    isPrivate: boolean
    _count: AlbumCountAggregateOutputType | null
    _avg: AlbumAvgAggregateOutputType | null
    _sum: AlbumSumAggregateOutputType | null
    _min: AlbumMinAggregateOutputType | null
    _max: AlbumMaxAggregateOutputType | null
  }

  type GetAlbumGroupByPayload<T extends AlbumGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlbumGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlbumGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlbumGroupByOutputType[P]>
            : GetScalarType<T[P], AlbumGroupByOutputType[P]>
        }
      >
    >


  export type AlbumSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    coverImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    circleId?: boolean
    isPrivate?: boolean
    Circle?: boolean | Album$CircleArgs<ExtArgs>
    creator?: boolean | Album$creatorArgs<ExtArgs>
    AlbumComment?: boolean | Album$AlbumCommentArgs<ExtArgs>
    AlbumLike?: boolean | Album$AlbumLikeArgs<ExtArgs>
    Photo?: boolean | Album$PhotoArgs<ExtArgs>
    _count?: boolean | AlbumCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["album"]>

  export type AlbumSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    coverImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    circleId?: boolean
    isPrivate?: boolean
    Circle?: boolean | Album$CircleArgs<ExtArgs>
    creator?: boolean | Album$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["album"]>

  export type AlbumSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    coverImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    circleId?: boolean
    isPrivate?: boolean
    Circle?: boolean | Album$CircleArgs<ExtArgs>
    creator?: boolean | Album$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["album"]>

  export type AlbumSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    coverImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    circleId?: boolean
    isPrivate?: boolean
  }

  export type AlbumOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "coverImage" | "createdAt" | "updatedAt" | "creatorId" | "circleId" | "isPrivate", ExtArgs["result"]["album"]>
  export type AlbumInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Circle?: boolean | Album$CircleArgs<ExtArgs>
    creator?: boolean | Album$creatorArgs<ExtArgs>
    AlbumComment?: boolean | Album$AlbumCommentArgs<ExtArgs>
    AlbumLike?: boolean | Album$AlbumLikeArgs<ExtArgs>
    Photo?: boolean | Album$PhotoArgs<ExtArgs>
    _count?: boolean | AlbumCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AlbumIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Circle?: boolean | Album$CircleArgs<ExtArgs>
    creator?: boolean | Album$creatorArgs<ExtArgs>
  }
  export type AlbumIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Circle?: boolean | Album$CircleArgs<ExtArgs>
    creator?: boolean | Album$creatorArgs<ExtArgs>
  }

  export type $AlbumPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Album"
    objects: {
      Circle: Prisma.$CirclePayload<ExtArgs> | null
      creator: Prisma.$UserPayload<ExtArgs> | null
      AlbumComment: Prisma.$AlbumCommentPayload<ExtArgs>[]
      AlbumLike: Prisma.$AlbumLikePayload<ExtArgs>[]
      Photo: Prisma.$PhotoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      coverImage: string | null
      createdAt: Date
      updatedAt: Date
      creatorId: number | null
      circleId: number | null
      isPrivate: boolean
    }, ExtArgs["result"]["album"]>
    composites: {}
  }

  type AlbumGetPayload<S extends boolean | null | undefined | AlbumDefaultArgs> = $Result.GetResult<Prisma.$AlbumPayload, S>

  type AlbumCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlbumFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlbumCountAggregateInputType | true
    }

  export interface AlbumDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Album'], meta: { name: 'Album' } }
    /**
     * Find zero or one Album that matches the filter.
     * @param {AlbumFindUniqueArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlbumFindUniqueArgs>(args: SelectSubset<T, AlbumFindUniqueArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Album that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlbumFindUniqueOrThrowArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlbumFindUniqueOrThrowArgs>(args: SelectSubset<T, AlbumFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Album that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumFindFirstArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlbumFindFirstArgs>(args?: SelectSubset<T, AlbumFindFirstArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Album that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumFindFirstOrThrowArgs} args - Arguments to find a Album
     * @example
     * // Get one Album
     * const album = await prisma.album.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlbumFindFirstOrThrowArgs>(args?: SelectSubset<T, AlbumFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Albums that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Albums
     * const albums = await prisma.album.findMany()
     * 
     * // Get first 10 Albums
     * const albums = await prisma.album.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const albumWithIdOnly = await prisma.album.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlbumFindManyArgs>(args?: SelectSubset<T, AlbumFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Album.
     * @param {AlbumCreateArgs} args - Arguments to create a Album.
     * @example
     * // Create one Album
     * const Album = await prisma.album.create({
     *   data: {
     *     // ... data to create a Album
     *   }
     * })
     * 
     */
    create<T extends AlbumCreateArgs>(args: SelectSubset<T, AlbumCreateArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Albums.
     * @param {AlbumCreateManyArgs} args - Arguments to create many Albums.
     * @example
     * // Create many Albums
     * const album = await prisma.album.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlbumCreateManyArgs>(args?: SelectSubset<T, AlbumCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Albums and returns the data saved in the database.
     * @param {AlbumCreateManyAndReturnArgs} args - Arguments to create many Albums.
     * @example
     * // Create many Albums
     * const album = await prisma.album.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Albums and only return the `id`
     * const albumWithIdOnly = await prisma.album.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlbumCreateManyAndReturnArgs>(args?: SelectSubset<T, AlbumCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Album.
     * @param {AlbumDeleteArgs} args - Arguments to delete one Album.
     * @example
     * // Delete one Album
     * const Album = await prisma.album.delete({
     *   where: {
     *     // ... filter to delete one Album
     *   }
     * })
     * 
     */
    delete<T extends AlbumDeleteArgs>(args: SelectSubset<T, AlbumDeleteArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Album.
     * @param {AlbumUpdateArgs} args - Arguments to update one Album.
     * @example
     * // Update one Album
     * const album = await prisma.album.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlbumUpdateArgs>(args: SelectSubset<T, AlbumUpdateArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Albums.
     * @param {AlbumDeleteManyArgs} args - Arguments to filter Albums to delete.
     * @example
     * // Delete a few Albums
     * const { count } = await prisma.album.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlbumDeleteManyArgs>(args?: SelectSubset<T, AlbumDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Albums.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Albums
     * const album = await prisma.album.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlbumUpdateManyArgs>(args: SelectSubset<T, AlbumUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Albums and returns the data updated in the database.
     * @param {AlbumUpdateManyAndReturnArgs} args - Arguments to update many Albums.
     * @example
     * // Update many Albums
     * const album = await prisma.album.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Albums and only return the `id`
     * const albumWithIdOnly = await prisma.album.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlbumUpdateManyAndReturnArgs>(args: SelectSubset<T, AlbumUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Album.
     * @param {AlbumUpsertArgs} args - Arguments to update or create a Album.
     * @example
     * // Update or create a Album
     * const album = await prisma.album.upsert({
     *   create: {
     *     // ... data to create a Album
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Album we want to update
     *   }
     * })
     */
    upsert<T extends AlbumUpsertArgs>(args: SelectSubset<T, AlbumUpsertArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Albums.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumCountArgs} args - Arguments to filter Albums to count.
     * @example
     * // Count the number of Albums
     * const count = await prisma.album.count({
     *   where: {
     *     // ... the filter for the Albums we want to count
     *   }
     * })
    **/
    count<T extends AlbumCountArgs>(
      args?: Subset<T, AlbumCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlbumCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Album.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlbumAggregateArgs>(args: Subset<T, AlbumAggregateArgs>): Prisma.PrismaPromise<GetAlbumAggregateType<T>>

    /**
     * Group by Album.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlbumGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlbumGroupByArgs['orderBy'] }
        : { orderBy?: AlbumGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlbumGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlbumGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Album model
   */
  readonly fields: AlbumFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Album.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlbumClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Circle<T extends Album$CircleArgs<ExtArgs> = {}>(args?: Subset<T, Album$CircleArgs<ExtArgs>>): Prisma__CircleClient<$Result.GetResult<Prisma.$CirclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    creator<T extends Album$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Album$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    AlbumComment<T extends Album$AlbumCommentArgs<ExtArgs> = {}>(args?: Subset<T, Album$AlbumCommentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    AlbumLike<T extends Album$AlbumLikeArgs<ExtArgs> = {}>(args?: Subset<T, Album$AlbumLikeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Photo<T extends Album$PhotoArgs<ExtArgs> = {}>(args?: Subset<T, Album$PhotoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Album model
   */
  interface AlbumFieldRefs {
    readonly id: FieldRef<"Album", 'Int'>
    readonly title: FieldRef<"Album", 'String'>
    readonly description: FieldRef<"Album", 'String'>
    readonly coverImage: FieldRef<"Album", 'String'>
    readonly createdAt: FieldRef<"Album", 'DateTime'>
    readonly updatedAt: FieldRef<"Album", 'DateTime'>
    readonly creatorId: FieldRef<"Album", 'Int'>
    readonly circleId: FieldRef<"Album", 'Int'>
    readonly isPrivate: FieldRef<"Album", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Album findUnique
   */
  export type AlbumFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    /**
     * Filter, which Album to fetch.
     */
    where: AlbumWhereUniqueInput
  }

  /**
   * Album findUniqueOrThrow
   */
  export type AlbumFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    /**
     * Filter, which Album to fetch.
     */
    where: AlbumWhereUniqueInput
  }

  /**
   * Album findFirst
   */
  export type AlbumFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    /**
     * Filter, which Album to fetch.
     */
    where?: AlbumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Albums to fetch.
     */
    orderBy?: AlbumOrderByWithRelationInput | AlbumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Albums.
     */
    cursor?: AlbumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Albums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Albums.
     */
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * Album findFirstOrThrow
   */
  export type AlbumFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    /**
     * Filter, which Album to fetch.
     */
    where?: AlbumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Albums to fetch.
     */
    orderBy?: AlbumOrderByWithRelationInput | AlbumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Albums.
     */
    cursor?: AlbumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Albums.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Albums.
     */
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * Album findMany
   */
  export type AlbumFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    /**
     * Filter, which Albums to fetch.
     */
    where?: AlbumWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Albums to fetch.
     */
    orderBy?: AlbumOrderByWithRelationInput | AlbumOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Albums.
     */
    cursor?: AlbumWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Albums from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Albums.
     */
    skip?: number
    distinct?: AlbumScalarFieldEnum | AlbumScalarFieldEnum[]
  }

  /**
   * Album create
   */
  export type AlbumCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    /**
     * The data needed to create a Album.
     */
    data: XOR<AlbumCreateInput, AlbumUncheckedCreateInput>
  }

  /**
   * Album createMany
   */
  export type AlbumCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Albums.
     */
    data: AlbumCreateManyInput | AlbumCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Album createManyAndReturn
   */
  export type AlbumCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * The data used to create many Albums.
     */
    data: AlbumCreateManyInput | AlbumCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Album update
   */
  export type AlbumUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    /**
     * The data needed to update a Album.
     */
    data: XOR<AlbumUpdateInput, AlbumUncheckedUpdateInput>
    /**
     * Choose, which Album to update.
     */
    where: AlbumWhereUniqueInput
  }

  /**
   * Album updateMany
   */
  export type AlbumUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Albums.
     */
    data: XOR<AlbumUpdateManyMutationInput, AlbumUncheckedUpdateManyInput>
    /**
     * Filter which Albums to update
     */
    where?: AlbumWhereInput
    /**
     * Limit how many Albums to update.
     */
    limit?: number
  }

  /**
   * Album updateManyAndReturn
   */
  export type AlbumUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * The data used to update Albums.
     */
    data: XOR<AlbumUpdateManyMutationInput, AlbumUncheckedUpdateManyInput>
    /**
     * Filter which Albums to update
     */
    where?: AlbumWhereInput
    /**
     * Limit how many Albums to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Album upsert
   */
  export type AlbumUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    /**
     * The filter to search for the Album to update in case it exists.
     */
    where: AlbumWhereUniqueInput
    /**
     * In case the Album found by the `where` argument doesn't exist, create a new Album with this data.
     */
    create: XOR<AlbumCreateInput, AlbumUncheckedCreateInput>
    /**
     * In case the Album was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlbumUpdateInput, AlbumUncheckedUpdateInput>
  }

  /**
   * Album delete
   */
  export type AlbumDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
    /**
     * Filter which Album to delete.
     */
    where: AlbumWhereUniqueInput
  }

  /**
   * Album deleteMany
   */
  export type AlbumDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Albums to delete
     */
    where?: AlbumWhereInput
    /**
     * Limit how many Albums to delete.
     */
    limit?: number
  }

  /**
   * Album.Circle
   */
  export type Album$CircleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Circle
     */
    select?: CircleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Circle
     */
    omit?: CircleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CircleInclude<ExtArgs> | null
    where?: CircleWhereInput
  }

  /**
   * Album.creator
   */
  export type Album$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Album.AlbumComment
   */
  export type Album$AlbumCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    where?: AlbumCommentWhereInput
    orderBy?: AlbumCommentOrderByWithRelationInput | AlbumCommentOrderByWithRelationInput[]
    cursor?: AlbumCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlbumCommentScalarFieldEnum | AlbumCommentScalarFieldEnum[]
  }

  /**
   * Album.AlbumLike
   */
  export type Album$AlbumLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    where?: AlbumLikeWhereInput
    orderBy?: AlbumLikeOrderByWithRelationInput | AlbumLikeOrderByWithRelationInput[]
    cursor?: AlbumLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlbumLikeScalarFieldEnum | AlbumLikeScalarFieldEnum[]
  }

  /**
   * Album.Photo
   */
  export type Album$PhotoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    where?: PhotoWhereInput
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    cursor?: PhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Album without action
   */
  export type AlbumDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Album
     */
    select?: AlbumSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Album
     */
    omit?: AlbumOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumInclude<ExtArgs> | null
  }


  /**
   * Model UserSettings
   */

  export type AggregateUserSettings = {
    _count: UserSettingsCountAggregateOutputType | null
    _avg: UserSettingsAvgAggregateOutputType | null
    _sum: UserSettingsSumAggregateOutputType | null
    _min: UserSettingsMinAggregateOutputType | null
    _max: UserSettingsMaxAggregateOutputType | null
  }

  export type UserSettingsAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserSettingsSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserSettingsMinAggregateOutputType = {
    id: number | null
    userId: number | null
    darkMode: boolean | null
    highContrast: boolean | null
    fontSize: string | null
    defaultAlbumPrivacy: boolean | null
    muteAlbumContent: boolean | null
    muteAlbumComments: boolean | null
    enableNotifications: boolean | null
    notifyNewMessages: boolean | null
    notifyFriendRequests: boolean | null
    notifyCircleInvites: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSettingsMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    darkMode: boolean | null
    highContrast: boolean | null
    fontSize: string | null
    defaultAlbumPrivacy: boolean | null
    muteAlbumContent: boolean | null
    muteAlbumComments: boolean | null
    enableNotifications: boolean | null
    notifyNewMessages: boolean | null
    notifyFriendRequests: boolean | null
    notifyCircleInvites: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSettingsCountAggregateOutputType = {
    id: number
    userId: number
    darkMode: number
    highContrast: number
    fontSize: number
    defaultAlbumPrivacy: number
    muteAlbumContent: number
    muteAlbumComments: number
    enableNotifications: number
    notifyNewMessages: number
    notifyFriendRequests: number
    notifyCircleInvites: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserSettingsAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserSettingsSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserSettingsMinAggregateInputType = {
    id?: true
    userId?: true
    darkMode?: true
    highContrast?: true
    fontSize?: true
    defaultAlbumPrivacy?: true
    muteAlbumContent?: true
    muteAlbumComments?: true
    enableNotifications?: true
    notifyNewMessages?: true
    notifyFriendRequests?: true
    notifyCircleInvites?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSettingsMaxAggregateInputType = {
    id?: true
    userId?: true
    darkMode?: true
    highContrast?: true
    fontSize?: true
    defaultAlbumPrivacy?: true
    muteAlbumContent?: true
    muteAlbumComments?: true
    enableNotifications?: true
    notifyNewMessages?: true
    notifyFriendRequests?: true
    notifyCircleInvites?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSettingsCountAggregateInputType = {
    id?: true
    userId?: true
    darkMode?: true
    highContrast?: true
    fontSize?: true
    defaultAlbumPrivacy?: true
    muteAlbumContent?: true
    muteAlbumComments?: true
    enableNotifications?: true
    notifyNewMessages?: true
    notifyFriendRequests?: true
    notifyCircleInvites?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSettings to aggregate.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSettings
    **/
    _count?: true | UserSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSettingsMaxAggregateInputType
  }

  export type GetUserSettingsAggregateType<T extends UserSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSettings[P]>
      : GetScalarType<T[P], AggregateUserSettings[P]>
  }




  export type UserSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSettingsWhereInput
    orderBy?: UserSettingsOrderByWithAggregationInput | UserSettingsOrderByWithAggregationInput[]
    by: UserSettingsScalarFieldEnum[] | UserSettingsScalarFieldEnum
    having?: UserSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSettingsCountAggregateInputType | true
    _avg?: UserSettingsAvgAggregateInputType
    _sum?: UserSettingsSumAggregateInputType
    _min?: UserSettingsMinAggregateInputType
    _max?: UserSettingsMaxAggregateInputType
  }

  export type UserSettingsGroupByOutputType = {
    id: number
    userId: number
    darkMode: boolean
    highContrast: boolean
    fontSize: string
    defaultAlbumPrivacy: boolean
    muteAlbumContent: boolean
    muteAlbumComments: boolean
    enableNotifications: boolean
    notifyNewMessages: boolean
    notifyFriendRequests: boolean
    notifyCircleInvites: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserSettingsCountAggregateOutputType | null
    _avg: UserSettingsAvgAggregateOutputType | null
    _sum: UserSettingsSumAggregateOutputType | null
    _min: UserSettingsMinAggregateOutputType | null
    _max: UserSettingsMaxAggregateOutputType | null
  }

  type GetUserSettingsGroupByPayload<T extends UserSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], UserSettingsGroupByOutputType[P]>
        }
      >
    >


  export type UserSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    darkMode?: boolean
    highContrast?: boolean
    fontSize?: boolean
    defaultAlbumPrivacy?: boolean
    muteAlbumContent?: boolean
    muteAlbumComments?: boolean
    enableNotifications?: boolean
    notifyNewMessages?: boolean
    notifyFriendRequests?: boolean
    notifyCircleInvites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSettings"]>

  export type UserSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    darkMode?: boolean
    highContrast?: boolean
    fontSize?: boolean
    defaultAlbumPrivacy?: boolean
    muteAlbumContent?: boolean
    muteAlbumComments?: boolean
    enableNotifications?: boolean
    notifyNewMessages?: boolean
    notifyFriendRequests?: boolean
    notifyCircleInvites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSettings"]>

  export type UserSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    darkMode?: boolean
    highContrast?: boolean
    fontSize?: boolean
    defaultAlbumPrivacy?: boolean
    muteAlbumContent?: boolean
    muteAlbumComments?: boolean
    enableNotifications?: boolean
    notifyNewMessages?: boolean
    notifyFriendRequests?: boolean
    notifyCircleInvites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSettings"]>

  export type UserSettingsSelectScalar = {
    id?: boolean
    userId?: boolean
    darkMode?: boolean
    highContrast?: boolean
    fontSize?: boolean
    defaultAlbumPrivacy?: boolean
    muteAlbumContent?: boolean
    muteAlbumComments?: boolean
    enableNotifications?: boolean
    notifyNewMessages?: boolean
    notifyFriendRequests?: boolean
    notifyCircleInvites?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "darkMode" | "highContrast" | "fontSize" | "defaultAlbumPrivacy" | "muteAlbumContent" | "muteAlbumComments" | "enableNotifications" | "notifyNewMessages" | "notifyFriendRequests" | "notifyCircleInvites" | "createdAt" | "updatedAt", ExtArgs["result"]["userSettings"]>
  export type UserSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSettings"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      darkMode: boolean
      highContrast: boolean
      fontSize: string
      defaultAlbumPrivacy: boolean
      muteAlbumContent: boolean
      muteAlbumComments: boolean
      enableNotifications: boolean
      notifyNewMessages: boolean
      notifyFriendRequests: boolean
      notifyCircleInvites: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userSettings"]>
    composites: {}
  }

  type UserSettingsGetPayload<S extends boolean | null | undefined | UserSettingsDefaultArgs> = $Result.GetResult<Prisma.$UserSettingsPayload, S>

  type UserSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSettingsCountAggregateInputType | true
    }

  export interface UserSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSettings'], meta: { name: 'UserSettings' } }
    /**
     * Find zero or one UserSettings that matches the filter.
     * @param {UserSettingsFindUniqueArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSettingsFindUniqueArgs>(args: SelectSubset<T, UserSettingsFindUniqueArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSettingsFindUniqueOrThrowArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsFindFirstArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSettingsFindFirstArgs>(args?: SelectSubset<T, UserSettingsFindFirstArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsFindFirstOrThrowArgs} args - Arguments to find a UserSettings
     * @example
     * // Get one UserSettings
     * const userSettings = await prisma.userSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSettings
     * const userSettings = await prisma.userSettings.findMany()
     * 
     * // Get first 10 UserSettings
     * const userSettings = await prisma.userSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSettingsWithIdOnly = await prisma.userSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSettingsFindManyArgs>(args?: SelectSubset<T, UserSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSettings.
     * @param {UserSettingsCreateArgs} args - Arguments to create a UserSettings.
     * @example
     * // Create one UserSettings
     * const UserSettings = await prisma.userSettings.create({
     *   data: {
     *     // ... data to create a UserSettings
     *   }
     * })
     * 
     */
    create<T extends UserSettingsCreateArgs>(args: SelectSubset<T, UserSettingsCreateArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSettings.
     * @param {UserSettingsCreateManyArgs} args - Arguments to create many UserSettings.
     * @example
     * // Create many UserSettings
     * const userSettings = await prisma.userSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSettingsCreateManyArgs>(args?: SelectSubset<T, UserSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSettings and returns the data saved in the database.
     * @param {UserSettingsCreateManyAndReturnArgs} args - Arguments to create many UserSettings.
     * @example
     * // Create many UserSettings
     * const userSettings = await prisma.userSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSettings and only return the `id`
     * const userSettingsWithIdOnly = await prisma.userSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSettings.
     * @param {UserSettingsDeleteArgs} args - Arguments to delete one UserSettings.
     * @example
     * // Delete one UserSettings
     * const UserSettings = await prisma.userSettings.delete({
     *   where: {
     *     // ... filter to delete one UserSettings
     *   }
     * })
     * 
     */
    delete<T extends UserSettingsDeleteArgs>(args: SelectSubset<T, UserSettingsDeleteArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSettings.
     * @param {UserSettingsUpdateArgs} args - Arguments to update one UserSettings.
     * @example
     * // Update one UserSettings
     * const userSettings = await prisma.userSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSettingsUpdateArgs>(args: SelectSubset<T, UserSettingsUpdateArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSettings.
     * @param {UserSettingsDeleteManyArgs} args - Arguments to filter UserSettings to delete.
     * @example
     * // Delete a few UserSettings
     * const { count } = await prisma.userSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSettingsDeleteManyArgs>(args?: SelectSubset<T, UserSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSettings
     * const userSettings = await prisma.userSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSettingsUpdateManyArgs>(args: SelectSubset<T, UserSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSettings and returns the data updated in the database.
     * @param {UserSettingsUpdateManyAndReturnArgs} args - Arguments to update many UserSettings.
     * @example
     * // Update many UserSettings
     * const userSettings = await prisma.userSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSettings and only return the `id`
     * const userSettingsWithIdOnly = await prisma.userSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSettings.
     * @param {UserSettingsUpsertArgs} args - Arguments to update or create a UserSettings.
     * @example
     * // Update or create a UserSettings
     * const userSettings = await prisma.userSettings.upsert({
     *   create: {
     *     // ... data to create a UserSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSettings we want to update
     *   }
     * })
     */
    upsert<T extends UserSettingsUpsertArgs>(args: SelectSubset<T, UserSettingsUpsertArgs<ExtArgs>>): Prisma__UserSettingsClient<$Result.GetResult<Prisma.$UserSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsCountArgs} args - Arguments to filter UserSettings to count.
     * @example
     * // Count the number of UserSettings
     * const count = await prisma.userSettings.count({
     *   where: {
     *     // ... the filter for the UserSettings we want to count
     *   }
     * })
    **/
    count<T extends UserSettingsCountArgs>(
      args?: Subset<T, UserSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSettingsAggregateArgs>(args: Subset<T, UserSettingsAggregateArgs>): Prisma.PrismaPromise<GetUserSettingsAggregateType<T>>

    /**
     * Group by UserSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSettingsGroupByArgs['orderBy'] }
        : { orderBy?: UserSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSettings model
   */
  readonly fields: UserSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSettings model
   */
  interface UserSettingsFieldRefs {
    readonly id: FieldRef<"UserSettings", 'Int'>
    readonly userId: FieldRef<"UserSettings", 'Int'>
    readonly darkMode: FieldRef<"UserSettings", 'Boolean'>
    readonly highContrast: FieldRef<"UserSettings", 'Boolean'>
    readonly fontSize: FieldRef<"UserSettings", 'String'>
    readonly defaultAlbumPrivacy: FieldRef<"UserSettings", 'Boolean'>
    readonly muteAlbumContent: FieldRef<"UserSettings", 'Boolean'>
    readonly muteAlbumComments: FieldRef<"UserSettings", 'Boolean'>
    readonly enableNotifications: FieldRef<"UserSettings", 'Boolean'>
    readonly notifyNewMessages: FieldRef<"UserSettings", 'Boolean'>
    readonly notifyFriendRequests: FieldRef<"UserSettings", 'Boolean'>
    readonly notifyCircleInvites: FieldRef<"UserSettings", 'Boolean'>
    readonly createdAt: FieldRef<"UserSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"UserSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSettings findUnique
   */
  export type UserSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings findUniqueOrThrow
   */
  export type UserSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings findFirst
   */
  export type UserSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSettings.
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSettings.
     */
    distinct?: UserSettingsScalarFieldEnum | UserSettingsScalarFieldEnum[]
  }

  /**
   * UserSettings findFirstOrThrow
   */
  export type UserSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSettings.
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSettings.
     */
    distinct?: UserSettingsScalarFieldEnum | UserSettingsScalarFieldEnum[]
  }

  /**
   * UserSettings findMany
   */
  export type UserSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter, which UserSettings to fetch.
     */
    where?: UserSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSettings to fetch.
     */
    orderBy?: UserSettingsOrderByWithRelationInput | UserSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSettings.
     */
    cursor?: UserSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSettings.
     */
    skip?: number
    distinct?: UserSettingsScalarFieldEnum | UserSettingsScalarFieldEnum[]
  }

  /**
   * UserSettings create
   */
  export type UserSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSettings.
     */
    data: XOR<UserSettingsCreateInput, UserSettingsUncheckedCreateInput>
  }

  /**
   * UserSettings createMany
   */
  export type UserSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSettings.
     */
    data: UserSettingsCreateManyInput | UserSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSettings createManyAndReturn
   */
  export type UserSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many UserSettings.
     */
    data: UserSettingsCreateManyInput | UserSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSettings update
   */
  export type UserSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSettings.
     */
    data: XOR<UserSettingsUpdateInput, UserSettingsUncheckedUpdateInput>
    /**
     * Choose, which UserSettings to update.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings updateMany
   */
  export type UserSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSettings.
     */
    data: XOR<UserSettingsUpdateManyMutationInput, UserSettingsUncheckedUpdateManyInput>
    /**
     * Filter which UserSettings to update
     */
    where?: UserSettingsWhereInput
    /**
     * Limit how many UserSettings to update.
     */
    limit?: number
  }

  /**
   * UserSettings updateManyAndReturn
   */
  export type UserSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * The data used to update UserSettings.
     */
    data: XOR<UserSettingsUpdateManyMutationInput, UserSettingsUncheckedUpdateManyInput>
    /**
     * Filter which UserSettings to update
     */
    where?: UserSettingsWhereInput
    /**
     * Limit how many UserSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSettings upsert
   */
  export type UserSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSettings to update in case it exists.
     */
    where: UserSettingsWhereUniqueInput
    /**
     * In case the UserSettings found by the `where` argument doesn't exist, create a new UserSettings with this data.
     */
    create: XOR<UserSettingsCreateInput, UserSettingsUncheckedCreateInput>
    /**
     * In case the UserSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSettingsUpdateInput, UserSettingsUncheckedUpdateInput>
  }

  /**
   * UserSettings delete
   */
  export type UserSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
    /**
     * Filter which UserSettings to delete.
     */
    where: UserSettingsWhereUniqueInput
  }

  /**
   * UserSettings deleteMany
   */
  export type UserSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSettings to delete
     */
    where?: UserSettingsWhereInput
    /**
     * Limit how many UserSettings to delete.
     */
    limit?: number
  }

  /**
   * UserSettings without action
   */
  export type UserSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSettings
     */
    select?: UserSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSettings
     */
    omit?: UserSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSettingsInclude<ExtArgs> | null
  }


  /**
   * Model AlbumComment
   */

  export type AggregateAlbumComment = {
    _count: AlbumCommentCountAggregateOutputType | null
    _avg: AlbumCommentAvgAggregateOutputType | null
    _sum: AlbumCommentSumAggregateOutputType | null
    _min: AlbumCommentMinAggregateOutputType | null
    _max: AlbumCommentMaxAggregateOutputType | null
  }

  export type AlbumCommentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    albumId: number | null
  }

  export type AlbumCommentSumAggregateOutputType = {
    id: number | null
    userId: number | null
    albumId: number | null
  }

  export type AlbumCommentMinAggregateOutputType = {
    id: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    albumId: number | null
  }

  export type AlbumCommentMaxAggregateOutputType = {
    id: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    albumId: number | null
  }

  export type AlbumCommentCountAggregateOutputType = {
    id: number
    content: number
    createdAt: number
    updatedAt: number
    userId: number
    albumId: number
    _all: number
  }


  export type AlbumCommentAvgAggregateInputType = {
    id?: true
    userId?: true
    albumId?: true
  }

  export type AlbumCommentSumAggregateInputType = {
    id?: true
    userId?: true
    albumId?: true
  }

  export type AlbumCommentMinAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    albumId?: true
  }

  export type AlbumCommentMaxAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    albumId?: true
  }

  export type AlbumCommentCountAggregateInputType = {
    id?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    albumId?: true
    _all?: true
  }

  export type AlbumCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlbumComment to aggregate.
     */
    where?: AlbumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlbumComments to fetch.
     */
    orderBy?: AlbumCommentOrderByWithRelationInput | AlbumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlbumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlbumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlbumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlbumComments
    **/
    _count?: true | AlbumCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlbumCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlbumCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlbumCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlbumCommentMaxAggregateInputType
  }

  export type GetAlbumCommentAggregateType<T extends AlbumCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateAlbumComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlbumComment[P]>
      : GetScalarType<T[P], AggregateAlbumComment[P]>
  }




  export type AlbumCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlbumCommentWhereInput
    orderBy?: AlbumCommentOrderByWithAggregationInput | AlbumCommentOrderByWithAggregationInput[]
    by: AlbumCommentScalarFieldEnum[] | AlbumCommentScalarFieldEnum
    having?: AlbumCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlbumCommentCountAggregateInputType | true
    _avg?: AlbumCommentAvgAggregateInputType
    _sum?: AlbumCommentSumAggregateInputType
    _min?: AlbumCommentMinAggregateInputType
    _max?: AlbumCommentMaxAggregateInputType
  }

  export type AlbumCommentGroupByOutputType = {
    id: number
    content: string
    createdAt: Date
    updatedAt: Date
    userId: number
    albumId: number
    _count: AlbumCommentCountAggregateOutputType | null
    _avg: AlbumCommentAvgAggregateOutputType | null
    _sum: AlbumCommentSumAggregateOutputType | null
    _min: AlbumCommentMinAggregateOutputType | null
    _max: AlbumCommentMaxAggregateOutputType | null
  }

  type GetAlbumCommentGroupByPayload<T extends AlbumCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlbumCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlbumCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlbumCommentGroupByOutputType[P]>
            : GetScalarType<T[P], AlbumCommentGroupByOutputType[P]>
        }
      >
    >


  export type AlbumCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    albumId?: boolean
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["albumComment"]>

  export type AlbumCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    albumId?: boolean
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["albumComment"]>

  export type AlbumCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    albumId?: boolean
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["albumComment"]>

  export type AlbumCommentSelectScalar = {
    id?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    albumId?: boolean
  }

  export type AlbumCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "createdAt" | "updatedAt" | "userId" | "albumId", ExtArgs["result"]["albumComment"]>
  export type AlbumCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AlbumCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AlbumCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AlbumCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AlbumComment"
    objects: {
      Album: Prisma.$AlbumPayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      createdAt: Date
      updatedAt: Date
      userId: number
      albumId: number
    }, ExtArgs["result"]["albumComment"]>
    composites: {}
  }

  type AlbumCommentGetPayload<S extends boolean | null | undefined | AlbumCommentDefaultArgs> = $Result.GetResult<Prisma.$AlbumCommentPayload, S>

  type AlbumCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlbumCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlbumCommentCountAggregateInputType | true
    }

  export interface AlbumCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AlbumComment'], meta: { name: 'AlbumComment' } }
    /**
     * Find zero or one AlbumComment that matches the filter.
     * @param {AlbumCommentFindUniqueArgs} args - Arguments to find a AlbumComment
     * @example
     * // Get one AlbumComment
     * const albumComment = await prisma.albumComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlbumCommentFindUniqueArgs>(args: SelectSubset<T, AlbumCommentFindUniqueArgs<ExtArgs>>): Prisma__AlbumCommentClient<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AlbumComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlbumCommentFindUniqueOrThrowArgs} args - Arguments to find a AlbumComment
     * @example
     * // Get one AlbumComment
     * const albumComment = await prisma.albumComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlbumCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, AlbumCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlbumCommentClient<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlbumComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumCommentFindFirstArgs} args - Arguments to find a AlbumComment
     * @example
     * // Get one AlbumComment
     * const albumComment = await prisma.albumComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlbumCommentFindFirstArgs>(args?: SelectSubset<T, AlbumCommentFindFirstArgs<ExtArgs>>): Prisma__AlbumCommentClient<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlbumComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumCommentFindFirstOrThrowArgs} args - Arguments to find a AlbumComment
     * @example
     * // Get one AlbumComment
     * const albumComment = await prisma.albumComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlbumCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, AlbumCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlbumCommentClient<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AlbumComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlbumComments
     * const albumComments = await prisma.albumComment.findMany()
     * 
     * // Get first 10 AlbumComments
     * const albumComments = await prisma.albumComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const albumCommentWithIdOnly = await prisma.albumComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlbumCommentFindManyArgs>(args?: SelectSubset<T, AlbumCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AlbumComment.
     * @param {AlbumCommentCreateArgs} args - Arguments to create a AlbumComment.
     * @example
     * // Create one AlbumComment
     * const AlbumComment = await prisma.albumComment.create({
     *   data: {
     *     // ... data to create a AlbumComment
     *   }
     * })
     * 
     */
    create<T extends AlbumCommentCreateArgs>(args: SelectSubset<T, AlbumCommentCreateArgs<ExtArgs>>): Prisma__AlbumCommentClient<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AlbumComments.
     * @param {AlbumCommentCreateManyArgs} args - Arguments to create many AlbumComments.
     * @example
     * // Create many AlbumComments
     * const albumComment = await prisma.albumComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlbumCommentCreateManyArgs>(args?: SelectSubset<T, AlbumCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AlbumComments and returns the data saved in the database.
     * @param {AlbumCommentCreateManyAndReturnArgs} args - Arguments to create many AlbumComments.
     * @example
     * // Create many AlbumComments
     * const albumComment = await prisma.albumComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AlbumComments and only return the `id`
     * const albumCommentWithIdOnly = await prisma.albumComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlbumCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, AlbumCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AlbumComment.
     * @param {AlbumCommentDeleteArgs} args - Arguments to delete one AlbumComment.
     * @example
     * // Delete one AlbumComment
     * const AlbumComment = await prisma.albumComment.delete({
     *   where: {
     *     // ... filter to delete one AlbumComment
     *   }
     * })
     * 
     */
    delete<T extends AlbumCommentDeleteArgs>(args: SelectSubset<T, AlbumCommentDeleteArgs<ExtArgs>>): Prisma__AlbumCommentClient<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AlbumComment.
     * @param {AlbumCommentUpdateArgs} args - Arguments to update one AlbumComment.
     * @example
     * // Update one AlbumComment
     * const albumComment = await prisma.albumComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlbumCommentUpdateArgs>(args: SelectSubset<T, AlbumCommentUpdateArgs<ExtArgs>>): Prisma__AlbumCommentClient<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AlbumComments.
     * @param {AlbumCommentDeleteManyArgs} args - Arguments to filter AlbumComments to delete.
     * @example
     * // Delete a few AlbumComments
     * const { count } = await prisma.albumComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlbumCommentDeleteManyArgs>(args?: SelectSubset<T, AlbumCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlbumComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlbumComments
     * const albumComment = await prisma.albumComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlbumCommentUpdateManyArgs>(args: SelectSubset<T, AlbumCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlbumComments and returns the data updated in the database.
     * @param {AlbumCommentUpdateManyAndReturnArgs} args - Arguments to update many AlbumComments.
     * @example
     * // Update many AlbumComments
     * const albumComment = await prisma.albumComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AlbumComments and only return the `id`
     * const albumCommentWithIdOnly = await prisma.albumComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlbumCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, AlbumCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AlbumComment.
     * @param {AlbumCommentUpsertArgs} args - Arguments to update or create a AlbumComment.
     * @example
     * // Update or create a AlbumComment
     * const albumComment = await prisma.albumComment.upsert({
     *   create: {
     *     // ... data to create a AlbumComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlbumComment we want to update
     *   }
     * })
     */
    upsert<T extends AlbumCommentUpsertArgs>(args: SelectSubset<T, AlbumCommentUpsertArgs<ExtArgs>>): Prisma__AlbumCommentClient<$Result.GetResult<Prisma.$AlbumCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AlbumComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumCommentCountArgs} args - Arguments to filter AlbumComments to count.
     * @example
     * // Count the number of AlbumComments
     * const count = await prisma.albumComment.count({
     *   where: {
     *     // ... the filter for the AlbumComments we want to count
     *   }
     * })
    **/
    count<T extends AlbumCommentCountArgs>(
      args?: Subset<T, AlbumCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlbumCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlbumComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlbumCommentAggregateArgs>(args: Subset<T, AlbumCommentAggregateArgs>): Prisma.PrismaPromise<GetAlbumCommentAggregateType<T>>

    /**
     * Group by AlbumComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlbumCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlbumCommentGroupByArgs['orderBy'] }
        : { orderBy?: AlbumCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlbumCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlbumCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AlbumComment model
   */
  readonly fields: AlbumCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlbumComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlbumCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Album<T extends AlbumDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlbumDefaultArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AlbumComment model
   */
  interface AlbumCommentFieldRefs {
    readonly id: FieldRef<"AlbumComment", 'Int'>
    readonly content: FieldRef<"AlbumComment", 'String'>
    readonly createdAt: FieldRef<"AlbumComment", 'DateTime'>
    readonly updatedAt: FieldRef<"AlbumComment", 'DateTime'>
    readonly userId: FieldRef<"AlbumComment", 'Int'>
    readonly albumId: FieldRef<"AlbumComment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AlbumComment findUnique
   */
  export type AlbumCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    /**
     * Filter, which AlbumComment to fetch.
     */
    where: AlbumCommentWhereUniqueInput
  }

  /**
   * AlbumComment findUniqueOrThrow
   */
  export type AlbumCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    /**
     * Filter, which AlbumComment to fetch.
     */
    where: AlbumCommentWhereUniqueInput
  }

  /**
   * AlbumComment findFirst
   */
  export type AlbumCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    /**
     * Filter, which AlbumComment to fetch.
     */
    where?: AlbumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlbumComments to fetch.
     */
    orderBy?: AlbumCommentOrderByWithRelationInput | AlbumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlbumComments.
     */
    cursor?: AlbumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlbumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlbumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlbumComments.
     */
    distinct?: AlbumCommentScalarFieldEnum | AlbumCommentScalarFieldEnum[]
  }

  /**
   * AlbumComment findFirstOrThrow
   */
  export type AlbumCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    /**
     * Filter, which AlbumComment to fetch.
     */
    where?: AlbumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlbumComments to fetch.
     */
    orderBy?: AlbumCommentOrderByWithRelationInput | AlbumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlbumComments.
     */
    cursor?: AlbumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlbumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlbumComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlbumComments.
     */
    distinct?: AlbumCommentScalarFieldEnum | AlbumCommentScalarFieldEnum[]
  }

  /**
   * AlbumComment findMany
   */
  export type AlbumCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    /**
     * Filter, which AlbumComments to fetch.
     */
    where?: AlbumCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlbumComments to fetch.
     */
    orderBy?: AlbumCommentOrderByWithRelationInput | AlbumCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlbumComments.
     */
    cursor?: AlbumCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlbumComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlbumComments.
     */
    skip?: number
    distinct?: AlbumCommentScalarFieldEnum | AlbumCommentScalarFieldEnum[]
  }

  /**
   * AlbumComment create
   */
  export type AlbumCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a AlbumComment.
     */
    data: XOR<AlbumCommentCreateInput, AlbumCommentUncheckedCreateInput>
  }

  /**
   * AlbumComment createMany
   */
  export type AlbumCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlbumComments.
     */
    data: AlbumCommentCreateManyInput | AlbumCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlbumComment createManyAndReturn
   */
  export type AlbumCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * The data used to create many AlbumComments.
     */
    data: AlbumCommentCreateManyInput | AlbumCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AlbumComment update
   */
  export type AlbumCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a AlbumComment.
     */
    data: XOR<AlbumCommentUpdateInput, AlbumCommentUncheckedUpdateInput>
    /**
     * Choose, which AlbumComment to update.
     */
    where: AlbumCommentWhereUniqueInput
  }

  /**
   * AlbumComment updateMany
   */
  export type AlbumCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AlbumComments.
     */
    data: XOR<AlbumCommentUpdateManyMutationInput, AlbumCommentUncheckedUpdateManyInput>
    /**
     * Filter which AlbumComments to update
     */
    where?: AlbumCommentWhereInput
    /**
     * Limit how many AlbumComments to update.
     */
    limit?: number
  }

  /**
   * AlbumComment updateManyAndReturn
   */
  export type AlbumCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * The data used to update AlbumComments.
     */
    data: XOR<AlbumCommentUpdateManyMutationInput, AlbumCommentUncheckedUpdateManyInput>
    /**
     * Filter which AlbumComments to update
     */
    where?: AlbumCommentWhereInput
    /**
     * Limit how many AlbumComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AlbumComment upsert
   */
  export type AlbumCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the AlbumComment to update in case it exists.
     */
    where: AlbumCommentWhereUniqueInput
    /**
     * In case the AlbumComment found by the `where` argument doesn't exist, create a new AlbumComment with this data.
     */
    create: XOR<AlbumCommentCreateInput, AlbumCommentUncheckedCreateInput>
    /**
     * In case the AlbumComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlbumCommentUpdateInput, AlbumCommentUncheckedUpdateInput>
  }

  /**
   * AlbumComment delete
   */
  export type AlbumCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
    /**
     * Filter which AlbumComment to delete.
     */
    where: AlbumCommentWhereUniqueInput
  }

  /**
   * AlbumComment deleteMany
   */
  export type AlbumCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlbumComments to delete
     */
    where?: AlbumCommentWhereInput
    /**
     * Limit how many AlbumComments to delete.
     */
    limit?: number
  }

  /**
   * AlbumComment without action
   */
  export type AlbumCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumComment
     */
    select?: AlbumCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumComment
     */
    omit?: AlbumCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumCommentInclude<ExtArgs> | null
  }


  /**
   * Model AlbumLike
   */

  export type AggregateAlbumLike = {
    _count: AlbumLikeCountAggregateOutputType | null
    _avg: AlbumLikeAvgAggregateOutputType | null
    _sum: AlbumLikeSumAggregateOutputType | null
    _min: AlbumLikeMinAggregateOutputType | null
    _max: AlbumLikeMaxAggregateOutputType | null
  }

  export type AlbumLikeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    albumId: number | null
  }

  export type AlbumLikeSumAggregateOutputType = {
    id: number | null
    userId: number | null
    albumId: number | null
  }

  export type AlbumLikeMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    userId: number | null
    albumId: number | null
  }

  export type AlbumLikeMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    userId: number | null
    albumId: number | null
  }

  export type AlbumLikeCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    albumId: number
    _all: number
  }


  export type AlbumLikeAvgAggregateInputType = {
    id?: true
    userId?: true
    albumId?: true
  }

  export type AlbumLikeSumAggregateInputType = {
    id?: true
    userId?: true
    albumId?: true
  }

  export type AlbumLikeMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    albumId?: true
  }

  export type AlbumLikeMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    albumId?: true
  }

  export type AlbumLikeCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    albumId?: true
    _all?: true
  }

  export type AlbumLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlbumLike to aggregate.
     */
    where?: AlbumLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlbumLikes to fetch.
     */
    orderBy?: AlbumLikeOrderByWithRelationInput | AlbumLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlbumLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlbumLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlbumLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlbumLikes
    **/
    _count?: true | AlbumLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlbumLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlbumLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlbumLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlbumLikeMaxAggregateInputType
  }

  export type GetAlbumLikeAggregateType<T extends AlbumLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateAlbumLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlbumLike[P]>
      : GetScalarType<T[P], AggregateAlbumLike[P]>
  }




  export type AlbumLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlbumLikeWhereInput
    orderBy?: AlbumLikeOrderByWithAggregationInput | AlbumLikeOrderByWithAggregationInput[]
    by: AlbumLikeScalarFieldEnum[] | AlbumLikeScalarFieldEnum
    having?: AlbumLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlbumLikeCountAggregateInputType | true
    _avg?: AlbumLikeAvgAggregateInputType
    _sum?: AlbumLikeSumAggregateInputType
    _min?: AlbumLikeMinAggregateInputType
    _max?: AlbumLikeMaxAggregateInputType
  }

  export type AlbumLikeGroupByOutputType = {
    id: number
    createdAt: Date
    userId: number
    albumId: number
    _count: AlbumLikeCountAggregateOutputType | null
    _avg: AlbumLikeAvgAggregateOutputType | null
    _sum: AlbumLikeSumAggregateOutputType | null
    _min: AlbumLikeMinAggregateOutputType | null
    _max: AlbumLikeMaxAggregateOutputType | null
  }

  type GetAlbumLikeGroupByPayload<T extends AlbumLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlbumLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlbumLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlbumLikeGroupByOutputType[P]>
            : GetScalarType<T[P], AlbumLikeGroupByOutputType[P]>
        }
      >
    >


  export type AlbumLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    albumId?: boolean
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["albumLike"]>

  export type AlbumLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    albumId?: boolean
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["albumLike"]>

  export type AlbumLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    albumId?: boolean
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["albumLike"]>

  export type AlbumLikeSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    albumId?: boolean
  }

  export type AlbumLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "albumId", ExtArgs["result"]["albumLike"]>
  export type AlbumLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AlbumLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AlbumLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AlbumLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AlbumLike"
    objects: {
      Album: Prisma.$AlbumPayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      userId: number
      albumId: number
    }, ExtArgs["result"]["albumLike"]>
    composites: {}
  }

  type AlbumLikeGetPayload<S extends boolean | null | undefined | AlbumLikeDefaultArgs> = $Result.GetResult<Prisma.$AlbumLikePayload, S>

  type AlbumLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlbumLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlbumLikeCountAggregateInputType | true
    }

  export interface AlbumLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AlbumLike'], meta: { name: 'AlbumLike' } }
    /**
     * Find zero or one AlbumLike that matches the filter.
     * @param {AlbumLikeFindUniqueArgs} args - Arguments to find a AlbumLike
     * @example
     * // Get one AlbumLike
     * const albumLike = await prisma.albumLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlbumLikeFindUniqueArgs>(args: SelectSubset<T, AlbumLikeFindUniqueArgs<ExtArgs>>): Prisma__AlbumLikeClient<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AlbumLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlbumLikeFindUniqueOrThrowArgs} args - Arguments to find a AlbumLike
     * @example
     * // Get one AlbumLike
     * const albumLike = await prisma.albumLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlbumLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, AlbumLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlbumLikeClient<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlbumLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumLikeFindFirstArgs} args - Arguments to find a AlbumLike
     * @example
     * // Get one AlbumLike
     * const albumLike = await prisma.albumLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlbumLikeFindFirstArgs>(args?: SelectSubset<T, AlbumLikeFindFirstArgs<ExtArgs>>): Prisma__AlbumLikeClient<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlbumLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumLikeFindFirstOrThrowArgs} args - Arguments to find a AlbumLike
     * @example
     * // Get one AlbumLike
     * const albumLike = await prisma.albumLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlbumLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, AlbumLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlbumLikeClient<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AlbumLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlbumLikes
     * const albumLikes = await prisma.albumLike.findMany()
     * 
     * // Get first 10 AlbumLikes
     * const albumLikes = await prisma.albumLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const albumLikeWithIdOnly = await prisma.albumLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlbumLikeFindManyArgs>(args?: SelectSubset<T, AlbumLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AlbumLike.
     * @param {AlbumLikeCreateArgs} args - Arguments to create a AlbumLike.
     * @example
     * // Create one AlbumLike
     * const AlbumLike = await prisma.albumLike.create({
     *   data: {
     *     // ... data to create a AlbumLike
     *   }
     * })
     * 
     */
    create<T extends AlbumLikeCreateArgs>(args: SelectSubset<T, AlbumLikeCreateArgs<ExtArgs>>): Prisma__AlbumLikeClient<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AlbumLikes.
     * @param {AlbumLikeCreateManyArgs} args - Arguments to create many AlbumLikes.
     * @example
     * // Create many AlbumLikes
     * const albumLike = await prisma.albumLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlbumLikeCreateManyArgs>(args?: SelectSubset<T, AlbumLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AlbumLikes and returns the data saved in the database.
     * @param {AlbumLikeCreateManyAndReturnArgs} args - Arguments to create many AlbumLikes.
     * @example
     * // Create many AlbumLikes
     * const albumLike = await prisma.albumLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AlbumLikes and only return the `id`
     * const albumLikeWithIdOnly = await prisma.albumLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlbumLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, AlbumLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AlbumLike.
     * @param {AlbumLikeDeleteArgs} args - Arguments to delete one AlbumLike.
     * @example
     * // Delete one AlbumLike
     * const AlbumLike = await prisma.albumLike.delete({
     *   where: {
     *     // ... filter to delete one AlbumLike
     *   }
     * })
     * 
     */
    delete<T extends AlbumLikeDeleteArgs>(args: SelectSubset<T, AlbumLikeDeleteArgs<ExtArgs>>): Prisma__AlbumLikeClient<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AlbumLike.
     * @param {AlbumLikeUpdateArgs} args - Arguments to update one AlbumLike.
     * @example
     * // Update one AlbumLike
     * const albumLike = await prisma.albumLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlbumLikeUpdateArgs>(args: SelectSubset<T, AlbumLikeUpdateArgs<ExtArgs>>): Prisma__AlbumLikeClient<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AlbumLikes.
     * @param {AlbumLikeDeleteManyArgs} args - Arguments to filter AlbumLikes to delete.
     * @example
     * // Delete a few AlbumLikes
     * const { count } = await prisma.albumLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlbumLikeDeleteManyArgs>(args?: SelectSubset<T, AlbumLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlbumLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlbumLikes
     * const albumLike = await prisma.albumLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlbumLikeUpdateManyArgs>(args: SelectSubset<T, AlbumLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlbumLikes and returns the data updated in the database.
     * @param {AlbumLikeUpdateManyAndReturnArgs} args - Arguments to update many AlbumLikes.
     * @example
     * // Update many AlbumLikes
     * const albumLike = await prisma.albumLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AlbumLikes and only return the `id`
     * const albumLikeWithIdOnly = await prisma.albumLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlbumLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, AlbumLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AlbumLike.
     * @param {AlbumLikeUpsertArgs} args - Arguments to update or create a AlbumLike.
     * @example
     * // Update or create a AlbumLike
     * const albumLike = await prisma.albumLike.upsert({
     *   create: {
     *     // ... data to create a AlbumLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlbumLike we want to update
     *   }
     * })
     */
    upsert<T extends AlbumLikeUpsertArgs>(args: SelectSubset<T, AlbumLikeUpsertArgs<ExtArgs>>): Prisma__AlbumLikeClient<$Result.GetResult<Prisma.$AlbumLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AlbumLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumLikeCountArgs} args - Arguments to filter AlbumLikes to count.
     * @example
     * // Count the number of AlbumLikes
     * const count = await prisma.albumLike.count({
     *   where: {
     *     // ... the filter for the AlbumLikes we want to count
     *   }
     * })
    **/
    count<T extends AlbumLikeCountArgs>(
      args?: Subset<T, AlbumLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlbumLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlbumLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlbumLikeAggregateArgs>(args: Subset<T, AlbumLikeAggregateArgs>): Prisma.PrismaPromise<GetAlbumLikeAggregateType<T>>

    /**
     * Group by AlbumLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlbumLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlbumLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlbumLikeGroupByArgs['orderBy'] }
        : { orderBy?: AlbumLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlbumLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlbumLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AlbumLike model
   */
  readonly fields: AlbumLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlbumLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlbumLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Album<T extends AlbumDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlbumDefaultArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AlbumLike model
   */
  interface AlbumLikeFieldRefs {
    readonly id: FieldRef<"AlbumLike", 'Int'>
    readonly createdAt: FieldRef<"AlbumLike", 'DateTime'>
    readonly userId: FieldRef<"AlbumLike", 'Int'>
    readonly albumId: FieldRef<"AlbumLike", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AlbumLike findUnique
   */
  export type AlbumLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    /**
     * Filter, which AlbumLike to fetch.
     */
    where: AlbumLikeWhereUniqueInput
  }

  /**
   * AlbumLike findUniqueOrThrow
   */
  export type AlbumLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    /**
     * Filter, which AlbumLike to fetch.
     */
    where: AlbumLikeWhereUniqueInput
  }

  /**
   * AlbumLike findFirst
   */
  export type AlbumLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    /**
     * Filter, which AlbumLike to fetch.
     */
    where?: AlbumLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlbumLikes to fetch.
     */
    orderBy?: AlbumLikeOrderByWithRelationInput | AlbumLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlbumLikes.
     */
    cursor?: AlbumLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlbumLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlbumLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlbumLikes.
     */
    distinct?: AlbumLikeScalarFieldEnum | AlbumLikeScalarFieldEnum[]
  }

  /**
   * AlbumLike findFirstOrThrow
   */
  export type AlbumLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    /**
     * Filter, which AlbumLike to fetch.
     */
    where?: AlbumLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlbumLikes to fetch.
     */
    orderBy?: AlbumLikeOrderByWithRelationInput | AlbumLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlbumLikes.
     */
    cursor?: AlbumLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlbumLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlbumLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlbumLikes.
     */
    distinct?: AlbumLikeScalarFieldEnum | AlbumLikeScalarFieldEnum[]
  }

  /**
   * AlbumLike findMany
   */
  export type AlbumLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    /**
     * Filter, which AlbumLikes to fetch.
     */
    where?: AlbumLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlbumLikes to fetch.
     */
    orderBy?: AlbumLikeOrderByWithRelationInput | AlbumLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlbumLikes.
     */
    cursor?: AlbumLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlbumLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlbumLikes.
     */
    skip?: number
    distinct?: AlbumLikeScalarFieldEnum | AlbumLikeScalarFieldEnum[]
  }

  /**
   * AlbumLike create
   */
  export type AlbumLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a AlbumLike.
     */
    data: XOR<AlbumLikeCreateInput, AlbumLikeUncheckedCreateInput>
  }

  /**
   * AlbumLike createMany
   */
  export type AlbumLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlbumLikes.
     */
    data: AlbumLikeCreateManyInput | AlbumLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlbumLike createManyAndReturn
   */
  export type AlbumLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * The data used to create many AlbumLikes.
     */
    data: AlbumLikeCreateManyInput | AlbumLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AlbumLike update
   */
  export type AlbumLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a AlbumLike.
     */
    data: XOR<AlbumLikeUpdateInput, AlbumLikeUncheckedUpdateInput>
    /**
     * Choose, which AlbumLike to update.
     */
    where: AlbumLikeWhereUniqueInput
  }

  /**
   * AlbumLike updateMany
   */
  export type AlbumLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AlbumLikes.
     */
    data: XOR<AlbumLikeUpdateManyMutationInput, AlbumLikeUncheckedUpdateManyInput>
    /**
     * Filter which AlbumLikes to update
     */
    where?: AlbumLikeWhereInput
    /**
     * Limit how many AlbumLikes to update.
     */
    limit?: number
  }

  /**
   * AlbumLike updateManyAndReturn
   */
  export type AlbumLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * The data used to update AlbumLikes.
     */
    data: XOR<AlbumLikeUpdateManyMutationInput, AlbumLikeUncheckedUpdateManyInput>
    /**
     * Filter which AlbumLikes to update
     */
    where?: AlbumLikeWhereInput
    /**
     * Limit how many AlbumLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AlbumLike upsert
   */
  export type AlbumLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the AlbumLike to update in case it exists.
     */
    where: AlbumLikeWhereUniqueInput
    /**
     * In case the AlbumLike found by the `where` argument doesn't exist, create a new AlbumLike with this data.
     */
    create: XOR<AlbumLikeCreateInput, AlbumLikeUncheckedCreateInput>
    /**
     * In case the AlbumLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlbumLikeUpdateInput, AlbumLikeUncheckedUpdateInput>
  }

  /**
   * AlbumLike delete
   */
  export type AlbumLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
    /**
     * Filter which AlbumLike to delete.
     */
    where: AlbumLikeWhereUniqueInput
  }

  /**
   * AlbumLike deleteMany
   */
  export type AlbumLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlbumLikes to delete
     */
    where?: AlbumLikeWhereInput
    /**
     * Limit how many AlbumLikes to delete.
     */
    limit?: number
  }

  /**
   * AlbumLike without action
   */
  export type AlbumLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlbumLike
     */
    select?: AlbumLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlbumLike
     */
    omit?: AlbumLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlbumLikeInclude<ExtArgs> | null
  }


  /**
   * Model Photo
   */

  export type AggregatePhoto = {
    _count: PhotoCountAggregateOutputType | null
    _avg: PhotoAvgAggregateOutputType | null
    _sum: PhotoSumAggregateOutputType | null
    _min: PhotoMinAggregateOutputType | null
    _max: PhotoMaxAggregateOutputType | null
  }

  export type PhotoAvgAggregateOutputType = {
    id: number | null
    albumId: number | null
  }

  export type PhotoSumAggregateOutputType = {
    id: number | null
    albumId: number | null
  }

  export type PhotoMinAggregateOutputType = {
    id: number | null
    url: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    albumId: number | null
  }

  export type PhotoMaxAggregateOutputType = {
    id: number | null
    url: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    albumId: number | null
  }

  export type PhotoCountAggregateOutputType = {
    id: number
    url: number
    description: number
    createdAt: number
    updatedAt: number
    albumId: number
    _all: number
  }


  export type PhotoAvgAggregateInputType = {
    id?: true
    albumId?: true
  }

  export type PhotoSumAggregateInputType = {
    id?: true
    albumId?: true
  }

  export type PhotoMinAggregateInputType = {
    id?: true
    url?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    albumId?: true
  }

  export type PhotoMaxAggregateInputType = {
    id?: true
    url?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    albumId?: true
  }

  export type PhotoCountAggregateInputType = {
    id?: true
    url?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    albumId?: true
    _all?: true
  }

  export type PhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Photo to aggregate.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Photos
    **/
    _count?: true | PhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhotoMaxAggregateInputType
  }

  export type GetPhotoAggregateType<T extends PhotoAggregateArgs> = {
        [P in keyof T & keyof AggregatePhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhoto[P]>
      : GetScalarType<T[P], AggregatePhoto[P]>
  }




  export type PhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhotoWhereInput
    orderBy?: PhotoOrderByWithAggregationInput | PhotoOrderByWithAggregationInput[]
    by: PhotoScalarFieldEnum[] | PhotoScalarFieldEnum
    having?: PhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhotoCountAggregateInputType | true
    _avg?: PhotoAvgAggregateInputType
    _sum?: PhotoSumAggregateInputType
    _min?: PhotoMinAggregateInputType
    _max?: PhotoMaxAggregateInputType
  }

  export type PhotoGroupByOutputType = {
    id: number
    url: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    albumId: number
    _count: PhotoCountAggregateOutputType | null
    _avg: PhotoAvgAggregateOutputType | null
    _sum: PhotoSumAggregateOutputType | null
    _min: PhotoMinAggregateOutputType | null
    _max: PhotoMaxAggregateOutputType | null
  }

  type GetPhotoGroupByPayload<T extends PhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhotoGroupByOutputType[P]>
            : GetScalarType<T[P], PhotoGroupByOutputType[P]>
        }
      >
    >


  export type PhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    albumId?: boolean
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photo"]>

  export type PhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    albumId?: boolean
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photo"]>

  export type PhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    albumId?: boolean
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["photo"]>

  export type PhotoSelectScalar = {
    id?: boolean
    url?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    albumId?: boolean
  }

  export type PhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "description" | "createdAt" | "updatedAt" | "albumId", ExtArgs["result"]["photo"]>
  export type PhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
  }
  export type PhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
  }
  export type PhotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Album?: boolean | AlbumDefaultArgs<ExtArgs>
  }

  export type $PhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Photo"
    objects: {
      Album: Prisma.$AlbumPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      description: string | null
      createdAt: Date
      updatedAt: Date
      albumId: number
    }, ExtArgs["result"]["photo"]>
    composites: {}
  }

  type PhotoGetPayload<S extends boolean | null | undefined | PhotoDefaultArgs> = $Result.GetResult<Prisma.$PhotoPayload, S>

  type PhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhotoCountAggregateInputType | true
    }

  export interface PhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Photo'], meta: { name: 'Photo' } }
    /**
     * Find zero or one Photo that matches the filter.
     * @param {PhotoFindUniqueArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhotoFindUniqueArgs>(args: SelectSubset<T, PhotoFindUniqueArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Photo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhotoFindUniqueOrThrowArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, PhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Photo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoFindFirstArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhotoFindFirstArgs>(args?: SelectSubset<T, PhotoFindFirstArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Photo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoFindFirstOrThrowArgs} args - Arguments to find a Photo
     * @example
     * // Get one Photo
     * const photo = await prisma.photo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, PhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Photos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Photos
     * const photos = await prisma.photo.findMany()
     * 
     * // Get first 10 Photos
     * const photos = await prisma.photo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const photoWithIdOnly = await prisma.photo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhotoFindManyArgs>(args?: SelectSubset<T, PhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Photo.
     * @param {PhotoCreateArgs} args - Arguments to create a Photo.
     * @example
     * // Create one Photo
     * const Photo = await prisma.photo.create({
     *   data: {
     *     // ... data to create a Photo
     *   }
     * })
     * 
     */
    create<T extends PhotoCreateArgs>(args: SelectSubset<T, PhotoCreateArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Photos.
     * @param {PhotoCreateManyArgs} args - Arguments to create many Photos.
     * @example
     * // Create many Photos
     * const photo = await prisma.photo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhotoCreateManyArgs>(args?: SelectSubset<T, PhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Photos and returns the data saved in the database.
     * @param {PhotoCreateManyAndReturnArgs} args - Arguments to create many Photos.
     * @example
     * // Create many Photos
     * const photo = await prisma.photo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Photos and only return the `id`
     * const photoWithIdOnly = await prisma.photo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, PhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Photo.
     * @param {PhotoDeleteArgs} args - Arguments to delete one Photo.
     * @example
     * // Delete one Photo
     * const Photo = await prisma.photo.delete({
     *   where: {
     *     // ... filter to delete one Photo
     *   }
     * })
     * 
     */
    delete<T extends PhotoDeleteArgs>(args: SelectSubset<T, PhotoDeleteArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Photo.
     * @param {PhotoUpdateArgs} args - Arguments to update one Photo.
     * @example
     * // Update one Photo
     * const photo = await prisma.photo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhotoUpdateArgs>(args: SelectSubset<T, PhotoUpdateArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Photos.
     * @param {PhotoDeleteManyArgs} args - Arguments to filter Photos to delete.
     * @example
     * // Delete a few Photos
     * const { count } = await prisma.photo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhotoDeleteManyArgs>(args?: SelectSubset<T, PhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Photos
     * const photo = await prisma.photo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhotoUpdateManyArgs>(args: SelectSubset<T, PhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Photos and returns the data updated in the database.
     * @param {PhotoUpdateManyAndReturnArgs} args - Arguments to update many Photos.
     * @example
     * // Update many Photos
     * const photo = await prisma.photo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Photos and only return the `id`
     * const photoWithIdOnly = await prisma.photo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, PhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Photo.
     * @param {PhotoUpsertArgs} args - Arguments to update or create a Photo.
     * @example
     * // Update or create a Photo
     * const photo = await prisma.photo.upsert({
     *   create: {
     *     // ... data to create a Photo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Photo we want to update
     *   }
     * })
     */
    upsert<T extends PhotoUpsertArgs>(args: SelectSubset<T, PhotoUpsertArgs<ExtArgs>>): Prisma__PhotoClient<$Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Photos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoCountArgs} args - Arguments to filter Photos to count.
     * @example
     * // Count the number of Photos
     * const count = await prisma.photo.count({
     *   where: {
     *     // ... the filter for the Photos we want to count
     *   }
     * })
    **/
    count<T extends PhotoCountArgs>(
      args?: Subset<T, PhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PhotoAggregateArgs>(args: Subset<T, PhotoAggregateArgs>): Prisma.PrismaPromise<GetPhotoAggregateType<T>>

    /**
     * Group by Photo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhotoGroupByArgs['orderBy'] }
        : { orderBy?: PhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Photo model
   */
  readonly fields: PhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Photo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Album<T extends AlbumDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlbumDefaultArgs<ExtArgs>>): Prisma__AlbumClient<$Result.GetResult<Prisma.$AlbumPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Photo model
   */
  interface PhotoFieldRefs {
    readonly id: FieldRef<"Photo", 'Int'>
    readonly url: FieldRef<"Photo", 'String'>
    readonly description: FieldRef<"Photo", 'String'>
    readonly createdAt: FieldRef<"Photo", 'DateTime'>
    readonly updatedAt: FieldRef<"Photo", 'DateTime'>
    readonly albumId: FieldRef<"Photo", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Photo findUnique
   */
  export type PhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo findUniqueOrThrow
   */
  export type PhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo findFirst
   */
  export type PhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Photos.
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Photos.
     */
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Photo findFirstOrThrow
   */
  export type PhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photo to fetch.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Photos.
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Photos.
     */
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Photo findMany
   */
  export type PhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter, which Photos to fetch.
     */
    where?: PhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Photos to fetch.
     */
    orderBy?: PhotoOrderByWithRelationInput | PhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Photos.
     */
    cursor?: PhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Photos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Photos.
     */
    skip?: number
    distinct?: PhotoScalarFieldEnum | PhotoScalarFieldEnum[]
  }

  /**
   * Photo create
   */
  export type PhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a Photo.
     */
    data: XOR<PhotoCreateInput, PhotoUncheckedCreateInput>
  }

  /**
   * Photo createMany
   */
  export type PhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Photos.
     */
    data: PhotoCreateManyInput | PhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Photo createManyAndReturn
   */
  export type PhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * The data used to create many Photos.
     */
    data: PhotoCreateManyInput | PhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Photo update
   */
  export type PhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a Photo.
     */
    data: XOR<PhotoUpdateInput, PhotoUncheckedUpdateInput>
    /**
     * Choose, which Photo to update.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo updateMany
   */
  export type PhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Photos.
     */
    data: XOR<PhotoUpdateManyMutationInput, PhotoUncheckedUpdateManyInput>
    /**
     * Filter which Photos to update
     */
    where?: PhotoWhereInput
    /**
     * Limit how many Photos to update.
     */
    limit?: number
  }

  /**
   * Photo updateManyAndReturn
   */
  export type PhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * The data used to update Photos.
     */
    data: XOR<PhotoUpdateManyMutationInput, PhotoUncheckedUpdateManyInput>
    /**
     * Filter which Photos to update
     */
    where?: PhotoWhereInput
    /**
     * Limit how many Photos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Photo upsert
   */
  export type PhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the Photo to update in case it exists.
     */
    where: PhotoWhereUniqueInput
    /**
     * In case the Photo found by the `where` argument doesn't exist, create a new Photo with this data.
     */
    create: XOR<PhotoCreateInput, PhotoUncheckedCreateInput>
    /**
     * In case the Photo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhotoUpdateInput, PhotoUncheckedUpdateInput>
  }

  /**
   * Photo delete
   */
  export type PhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
    /**
     * Filter which Photo to delete.
     */
    where: PhotoWhereUniqueInput
  }

  /**
   * Photo deleteMany
   */
  export type PhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Photos to delete
     */
    where?: PhotoWhereInput
    /**
     * Limit how many Photos to delete.
     */
    limit?: number
  }

  /**
   * Photo without action
   */
  export type PhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Photo
     */
    select?: PhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Photo
     */
    omit?: PhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhotoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    username: 'username',
    password: 'password',
    bio: 'bio',
    profileImage: 'profileImage',
    coverImage: 'coverImage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isProfilePrivate: 'isProfilePrivate'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CircleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    avatar: 'avatar',
    coverImage: 'coverImage',
    isPrivate: 'isPrivate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    creatorId: 'creatorId'
  };

  export type CircleScalarFieldEnum = (typeof CircleScalarFieldEnum)[keyof typeof CircleScalarFieldEnum]


  export const MembershipScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    circleId: 'circleId',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    content: 'content',
    imageUrl: 'imageUrl',
    videoUrl: 'videoUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    circleId: 'circleId'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    postId: 'postId'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const LikeScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    postId: 'postId'
  };

  export type LikeScalarFieldEnum = (typeof LikeScalarFieldEnum)[keyof typeof LikeScalarFieldEnum]


  export const FollowScalarFieldEnum: {
    id: 'id',
    followerId: 'followerId',
    followingId: 'followingId',
    createdAt: 'createdAt'
  };

  export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum]


  export const AlbumScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    coverImage: 'coverImage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    creatorId: 'creatorId',
    circleId: 'circleId',
    isPrivate: 'isPrivate'
  };

  export type AlbumScalarFieldEnum = (typeof AlbumScalarFieldEnum)[keyof typeof AlbumScalarFieldEnum]


  export const UserSettingsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    darkMode: 'darkMode',
    highContrast: 'highContrast',
    fontSize: 'fontSize',
    defaultAlbumPrivacy: 'defaultAlbumPrivacy',
    muteAlbumContent: 'muteAlbumContent',
    muteAlbumComments: 'muteAlbumComments',
    enableNotifications: 'enableNotifications',
    notifyNewMessages: 'notifyNewMessages',
    notifyFriendRequests: 'notifyFriendRequests',
    notifyCircleInvites: 'notifyCircleInvites',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserSettingsScalarFieldEnum = (typeof UserSettingsScalarFieldEnum)[keyof typeof UserSettingsScalarFieldEnum]


  export const AlbumCommentScalarFieldEnum: {
    id: 'id',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    albumId: 'albumId'
  };

  export type AlbumCommentScalarFieldEnum = (typeof AlbumCommentScalarFieldEnum)[keyof typeof AlbumCommentScalarFieldEnum]


  export const AlbumLikeScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    albumId: 'albumId'
  };

  export type AlbumLikeScalarFieldEnum = (typeof AlbumLikeScalarFieldEnum)[keyof typeof AlbumLikeScalarFieldEnum]


  export const PhotoScalarFieldEnum: {
    id: 'id',
    url: 'url',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    albumId: 'albumId'
  };

  export type PhotoScalarFieldEnum = (typeof PhotoScalarFieldEnum)[keyof typeof PhotoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    bio?: StringNullableFilter<"User"> | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    coverImage?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isProfilePrivate?: BoolNullableFilter<"User"> | boolean | null
    Album?: AlbumListRelationFilter
    AlbumComment?: AlbumCommentListRelationFilter
    AlbumLike?: AlbumLikeListRelationFilter
    createdCircles?: CircleListRelationFilter
    comments?: CommentListRelationFilter
    following?: FollowListRelationFilter
    followers?: FollowListRelationFilter
    likes?: LikeListRelationFilter
    memberships?: MembershipListRelationFilter
    posts?: PostListRelationFilter
    settings?: XOR<UserSettingsNullableScalarRelationFilter, UserSettingsWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    username?: SortOrder
    password?: SortOrder
    bio?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isProfilePrivate?: SortOrderInput | SortOrder
    Album?: AlbumOrderByRelationAggregateInput
    AlbumComment?: AlbumCommentOrderByRelationAggregateInput
    AlbumLike?: AlbumLikeOrderByRelationAggregateInput
    createdCircles?: CircleOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    following?: FollowOrderByRelationAggregateInput
    followers?: FollowOrderByRelationAggregateInput
    likes?: LikeOrderByRelationAggregateInput
    memberships?: MembershipOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
    settings?: UserSettingsOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    bio?: StringNullableFilter<"User"> | string | null
    profileImage?: StringNullableFilter<"User"> | string | null
    coverImage?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isProfilePrivate?: BoolNullableFilter<"User"> | boolean | null
    Album?: AlbumListRelationFilter
    AlbumComment?: AlbumCommentListRelationFilter
    AlbumLike?: AlbumLikeListRelationFilter
    createdCircles?: CircleListRelationFilter
    comments?: CommentListRelationFilter
    following?: FollowListRelationFilter
    followers?: FollowListRelationFilter
    likes?: LikeListRelationFilter
    memberships?: MembershipListRelationFilter
    posts?: PostListRelationFilter
    settings?: XOR<UserSettingsNullableScalarRelationFilter, UserSettingsWhereInput> | null
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    username?: SortOrder
    password?: SortOrder
    bio?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isProfilePrivate?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    coverImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isProfilePrivate?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
  }

  export type CircleWhereInput = {
    AND?: CircleWhereInput | CircleWhereInput[]
    OR?: CircleWhereInput[]
    NOT?: CircleWhereInput | CircleWhereInput[]
    id?: IntFilter<"Circle"> | number
    name?: StringFilter<"Circle"> | string
    description?: StringNullableFilter<"Circle"> | string | null
    avatar?: StringNullableFilter<"Circle"> | string | null
    coverImage?: StringNullableFilter<"Circle"> | string | null
    isPrivate?: BoolFilter<"Circle"> | boolean
    createdAt?: DateTimeFilter<"Circle"> | Date | string
    updatedAt?: DateTimeFilter<"Circle"> | Date | string
    creatorId?: IntFilter<"Circle"> | number
    Album?: AlbumListRelationFilter
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: MembershipListRelationFilter
    posts?: PostListRelationFilter
  }

  export type CircleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    Album?: AlbumOrderByRelationAggregateInput
    creator?: UserOrderByWithRelationInput
    members?: MembershipOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
  }

  export type CircleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CircleWhereInput | CircleWhereInput[]
    OR?: CircleWhereInput[]
    NOT?: CircleWhereInput | CircleWhereInput[]
    name?: StringFilter<"Circle"> | string
    description?: StringNullableFilter<"Circle"> | string | null
    avatar?: StringNullableFilter<"Circle"> | string | null
    coverImage?: StringNullableFilter<"Circle"> | string | null
    isPrivate?: BoolFilter<"Circle"> | boolean
    createdAt?: DateTimeFilter<"Circle"> | Date | string
    updatedAt?: DateTimeFilter<"Circle"> | Date | string
    creatorId?: IntFilter<"Circle"> | number
    Album?: AlbumListRelationFilter
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: MembershipListRelationFilter
    posts?: PostListRelationFilter
  }, "id">

  export type CircleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    _count?: CircleCountOrderByAggregateInput
    _avg?: CircleAvgOrderByAggregateInput
    _max?: CircleMaxOrderByAggregateInput
    _min?: CircleMinOrderByAggregateInput
    _sum?: CircleSumOrderByAggregateInput
  }

  export type CircleScalarWhereWithAggregatesInput = {
    AND?: CircleScalarWhereWithAggregatesInput | CircleScalarWhereWithAggregatesInput[]
    OR?: CircleScalarWhereWithAggregatesInput[]
    NOT?: CircleScalarWhereWithAggregatesInput | CircleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Circle"> | number
    name?: StringWithAggregatesFilter<"Circle"> | string
    description?: StringNullableWithAggregatesFilter<"Circle"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Circle"> | string | null
    coverImage?: StringNullableWithAggregatesFilter<"Circle"> | string | null
    isPrivate?: BoolWithAggregatesFilter<"Circle"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Circle"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Circle"> | Date | string
    creatorId?: IntWithAggregatesFilter<"Circle"> | number
  }

  export type MembershipWhereInput = {
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    id?: IntFilter<"Membership"> | number
    userId?: IntFilter<"Membership"> | number
    circleId?: IntFilter<"Membership"> | number
    role?: EnumRoleFilter<"Membership"> | $Enums.Role
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    circle?: XOR<CircleScalarRelationFilter, CircleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MembershipOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    circle?: CircleOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type MembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_circleId?: MembershipUserIdCircleIdCompoundUniqueInput
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    userId?: IntFilter<"Membership"> | number
    circleId?: IntFilter<"Membership"> | number
    role?: EnumRoleFilter<"Membership"> | $Enums.Role
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    circle?: XOR<CircleScalarRelationFilter, CircleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_circleId">

  export type MembershipOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MembershipCountOrderByAggregateInput
    _avg?: MembershipAvgOrderByAggregateInput
    _max?: MembershipMaxOrderByAggregateInput
    _min?: MembershipMinOrderByAggregateInput
    _sum?: MembershipSumOrderByAggregateInput
  }

  export type MembershipScalarWhereWithAggregatesInput = {
    AND?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    OR?: MembershipScalarWhereWithAggregatesInput[]
    NOT?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Membership"> | number
    userId?: IntWithAggregatesFilter<"Membership"> | number
    circleId?: IntWithAggregatesFilter<"Membership"> | number
    role?: EnumRoleWithAggregatesFilter<"Membership"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: IntFilter<"Post"> | number
    content?: StringFilter<"Post"> | string
    imageUrl?: StringNullableFilter<"Post"> | string | null
    videoUrl?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    userId?: IntFilter<"Post"> | number
    circleId?: IntFilter<"Post"> | number
    comments?: CommentListRelationFilter
    likes?: LikeListRelationFilter
    circle?: XOR<CircleScalarRelationFilter, CircleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
    comments?: CommentOrderByRelationAggregateInput
    likes?: LikeOrderByRelationAggregateInput
    circle?: CircleOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    content?: StringFilter<"Post"> | string
    imageUrl?: StringNullableFilter<"Post"> | string | null
    videoUrl?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    userId?: IntFilter<"Post"> | number
    circleId?: IntFilter<"Post"> | number
    comments?: CommentListRelationFilter
    likes?: LikeListRelationFilter
    circle?: XOR<CircleScalarRelationFilter, CircleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Post"> | number
    content?: StringWithAggregatesFilter<"Post"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Post"> | string | null
    videoUrl?: StringNullableWithAggregatesFilter<"Post"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    userId?: IntWithAggregatesFilter<"Post"> | number
    circleId?: IntWithAggregatesFilter<"Post"> | number
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    userId?: IntFilter<"Comment"> | number
    postId?: IntFilter<"Comment"> | number
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    post?: PostOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    userId?: IntFilter<"Comment"> | number
    postId?: IntFilter<"Comment"> | number
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comment"> | number
    content?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    userId?: IntWithAggregatesFilter<"Comment"> | number
    postId?: IntWithAggregatesFilter<"Comment"> | number
  }

  export type LikeWhereInput = {
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    id?: IntFilter<"Like"> | number
    createdAt?: DateTimeFilter<"Like"> | Date | string
    userId?: IntFilter<"Like"> | number
    postId?: IntFilter<"Like"> | number
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LikeOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    post?: PostOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type LikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_postId?: LikeUserIdPostIdCompoundUniqueInput
    AND?: LikeWhereInput | LikeWhereInput[]
    OR?: LikeWhereInput[]
    NOT?: LikeWhereInput | LikeWhereInput[]
    createdAt?: DateTimeFilter<"Like"> | Date | string
    userId?: IntFilter<"Like"> | number
    postId?: IntFilter<"Like"> | number
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_postId">

  export type LikeOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    _count?: LikeCountOrderByAggregateInput
    _avg?: LikeAvgOrderByAggregateInput
    _max?: LikeMaxOrderByAggregateInput
    _min?: LikeMinOrderByAggregateInput
    _sum?: LikeSumOrderByAggregateInput
  }

  export type LikeScalarWhereWithAggregatesInput = {
    AND?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    OR?: LikeScalarWhereWithAggregatesInput[]
    NOT?: LikeScalarWhereWithAggregatesInput | LikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Like"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Like"> | Date | string
    userId?: IntWithAggregatesFilter<"Like"> | number
    postId?: IntWithAggregatesFilter<"Like"> | number
  }

  export type FollowWhereInput = {
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    id?: IntFilter<"Follow"> | number
    followerId?: IntFilter<"Follow"> | number
    followingId?: IntFilter<"Follow"> | number
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FollowOrderByWithRelationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
    follower?: UserOrderByWithRelationInput
    following?: UserOrderByWithRelationInput
  }

  export type FollowWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    followerId_followingId?: FollowFollowerIdFollowingIdCompoundUniqueInput
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    followerId?: IntFilter<"Follow"> | number
    followingId?: IntFilter<"Follow"> | number
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    following?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "followerId_followingId">

  export type FollowOrderByWithAggregationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
    _count?: FollowCountOrderByAggregateInput
    _avg?: FollowAvgOrderByAggregateInput
    _max?: FollowMaxOrderByAggregateInput
    _min?: FollowMinOrderByAggregateInput
    _sum?: FollowSumOrderByAggregateInput
  }

  export type FollowScalarWhereWithAggregatesInput = {
    AND?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    OR?: FollowScalarWhereWithAggregatesInput[]
    NOT?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Follow"> | number
    followerId?: IntWithAggregatesFilter<"Follow"> | number
    followingId?: IntWithAggregatesFilter<"Follow"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Follow"> | Date | string
  }

  export type AlbumWhereInput = {
    AND?: AlbumWhereInput | AlbumWhereInput[]
    OR?: AlbumWhereInput[]
    NOT?: AlbumWhereInput | AlbumWhereInput[]
    id?: IntFilter<"Album"> | number
    title?: StringFilter<"Album"> | string
    description?: StringNullableFilter<"Album"> | string | null
    coverImage?: StringNullableFilter<"Album"> | string | null
    createdAt?: DateTimeFilter<"Album"> | Date | string
    updatedAt?: DateTimeFilter<"Album"> | Date | string
    creatorId?: IntNullableFilter<"Album"> | number | null
    circleId?: IntNullableFilter<"Album"> | number | null
    isPrivate?: BoolFilter<"Album"> | boolean
    Circle?: XOR<CircleNullableScalarRelationFilter, CircleWhereInput> | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    AlbumComment?: AlbumCommentListRelationFilter
    AlbumLike?: AlbumLikeListRelationFilter
    Photo?: PhotoListRelationFilter
  }

  export type AlbumOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrderInput | SortOrder
    circleId?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    Circle?: CircleOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
    AlbumComment?: AlbumCommentOrderByRelationAggregateInput
    AlbumLike?: AlbumLikeOrderByRelationAggregateInput
    Photo?: PhotoOrderByRelationAggregateInput
  }

  export type AlbumWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AlbumWhereInput | AlbumWhereInput[]
    OR?: AlbumWhereInput[]
    NOT?: AlbumWhereInput | AlbumWhereInput[]
    title?: StringFilter<"Album"> | string
    description?: StringNullableFilter<"Album"> | string | null
    coverImage?: StringNullableFilter<"Album"> | string | null
    createdAt?: DateTimeFilter<"Album"> | Date | string
    updatedAt?: DateTimeFilter<"Album"> | Date | string
    creatorId?: IntNullableFilter<"Album"> | number | null
    circleId?: IntNullableFilter<"Album"> | number | null
    isPrivate?: BoolFilter<"Album"> | boolean
    Circle?: XOR<CircleNullableScalarRelationFilter, CircleWhereInput> | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    AlbumComment?: AlbumCommentListRelationFilter
    AlbumLike?: AlbumLikeListRelationFilter
    Photo?: PhotoListRelationFilter
  }, "id">

  export type AlbumOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrderInput | SortOrder
    circleId?: SortOrderInput | SortOrder
    isPrivate?: SortOrder
    _count?: AlbumCountOrderByAggregateInput
    _avg?: AlbumAvgOrderByAggregateInput
    _max?: AlbumMaxOrderByAggregateInput
    _min?: AlbumMinOrderByAggregateInput
    _sum?: AlbumSumOrderByAggregateInput
  }

  export type AlbumScalarWhereWithAggregatesInput = {
    AND?: AlbumScalarWhereWithAggregatesInput | AlbumScalarWhereWithAggregatesInput[]
    OR?: AlbumScalarWhereWithAggregatesInput[]
    NOT?: AlbumScalarWhereWithAggregatesInput | AlbumScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Album"> | number
    title?: StringWithAggregatesFilter<"Album"> | string
    description?: StringNullableWithAggregatesFilter<"Album"> | string | null
    coverImage?: StringNullableWithAggregatesFilter<"Album"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Album"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Album"> | Date | string
    creatorId?: IntNullableWithAggregatesFilter<"Album"> | number | null
    circleId?: IntNullableWithAggregatesFilter<"Album"> | number | null
    isPrivate?: BoolWithAggregatesFilter<"Album"> | boolean
  }

  export type UserSettingsWhereInput = {
    AND?: UserSettingsWhereInput | UserSettingsWhereInput[]
    OR?: UserSettingsWhereInput[]
    NOT?: UserSettingsWhereInput | UserSettingsWhereInput[]
    id?: IntFilter<"UserSettings"> | number
    userId?: IntFilter<"UserSettings"> | number
    darkMode?: BoolFilter<"UserSettings"> | boolean
    highContrast?: BoolFilter<"UserSettings"> | boolean
    fontSize?: StringFilter<"UserSettings"> | string
    defaultAlbumPrivacy?: BoolFilter<"UserSettings"> | boolean
    muteAlbumContent?: BoolFilter<"UserSettings"> | boolean
    muteAlbumComments?: BoolFilter<"UserSettings"> | boolean
    enableNotifications?: BoolFilter<"UserSettings"> | boolean
    notifyNewMessages?: BoolFilter<"UserSettings"> | boolean
    notifyFriendRequests?: BoolFilter<"UserSettings"> | boolean
    notifyCircleInvites?: BoolFilter<"UserSettings"> | boolean
    createdAt?: DateTimeFilter<"UserSettings"> | Date | string
    updatedAt?: DateTimeFilter<"UserSettings"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserSettingsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    highContrast?: SortOrder
    fontSize?: SortOrder
    defaultAlbumPrivacy?: SortOrder
    muteAlbumContent?: SortOrder
    muteAlbumComments?: SortOrder
    enableNotifications?: SortOrder
    notifyNewMessages?: SortOrder
    notifyFriendRequests?: SortOrder
    notifyCircleInvites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: UserSettingsWhereInput | UserSettingsWhereInput[]
    OR?: UserSettingsWhereInput[]
    NOT?: UserSettingsWhereInput | UserSettingsWhereInput[]
    darkMode?: BoolFilter<"UserSettings"> | boolean
    highContrast?: BoolFilter<"UserSettings"> | boolean
    fontSize?: StringFilter<"UserSettings"> | string
    defaultAlbumPrivacy?: BoolFilter<"UserSettings"> | boolean
    muteAlbumContent?: BoolFilter<"UserSettings"> | boolean
    muteAlbumComments?: BoolFilter<"UserSettings"> | boolean
    enableNotifications?: BoolFilter<"UserSettings"> | boolean
    notifyNewMessages?: BoolFilter<"UserSettings"> | boolean
    notifyFriendRequests?: BoolFilter<"UserSettings"> | boolean
    notifyCircleInvites?: BoolFilter<"UserSettings"> | boolean
    createdAt?: DateTimeFilter<"UserSettings"> | Date | string
    updatedAt?: DateTimeFilter<"UserSettings"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    highContrast?: SortOrder
    fontSize?: SortOrder
    defaultAlbumPrivacy?: SortOrder
    muteAlbumContent?: SortOrder
    muteAlbumComments?: SortOrder
    enableNotifications?: SortOrder
    notifyNewMessages?: SortOrder
    notifyFriendRequests?: SortOrder
    notifyCircleInvites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserSettingsCountOrderByAggregateInput
    _avg?: UserSettingsAvgOrderByAggregateInput
    _max?: UserSettingsMaxOrderByAggregateInput
    _min?: UserSettingsMinOrderByAggregateInput
    _sum?: UserSettingsSumOrderByAggregateInput
  }

  export type UserSettingsScalarWhereWithAggregatesInput = {
    AND?: UserSettingsScalarWhereWithAggregatesInput | UserSettingsScalarWhereWithAggregatesInput[]
    OR?: UserSettingsScalarWhereWithAggregatesInput[]
    NOT?: UserSettingsScalarWhereWithAggregatesInput | UserSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserSettings"> | number
    userId?: IntWithAggregatesFilter<"UserSettings"> | number
    darkMode?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    highContrast?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    fontSize?: StringWithAggregatesFilter<"UserSettings"> | string
    defaultAlbumPrivacy?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    muteAlbumContent?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    muteAlbumComments?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    enableNotifications?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    notifyNewMessages?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    notifyFriendRequests?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    notifyCircleInvites?: BoolWithAggregatesFilter<"UserSettings"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserSettings"> | Date | string
  }

  export type AlbumCommentWhereInput = {
    AND?: AlbumCommentWhereInput | AlbumCommentWhereInput[]
    OR?: AlbumCommentWhereInput[]
    NOT?: AlbumCommentWhereInput | AlbumCommentWhereInput[]
    id?: IntFilter<"AlbumComment"> | number
    content?: StringFilter<"AlbumComment"> | string
    createdAt?: DateTimeFilter<"AlbumComment"> | Date | string
    updatedAt?: DateTimeFilter<"AlbumComment"> | Date | string
    userId?: IntFilter<"AlbumComment"> | number
    albumId?: IntFilter<"AlbumComment"> | number
    Album?: XOR<AlbumScalarRelationFilter, AlbumWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AlbumCommentOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
    Album?: AlbumOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type AlbumCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AlbumCommentWhereInput | AlbumCommentWhereInput[]
    OR?: AlbumCommentWhereInput[]
    NOT?: AlbumCommentWhereInput | AlbumCommentWhereInput[]
    content?: StringFilter<"AlbumComment"> | string
    createdAt?: DateTimeFilter<"AlbumComment"> | Date | string
    updatedAt?: DateTimeFilter<"AlbumComment"> | Date | string
    userId?: IntFilter<"AlbumComment"> | number
    albumId?: IntFilter<"AlbumComment"> | number
    Album?: XOR<AlbumScalarRelationFilter, AlbumWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AlbumCommentOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
    _count?: AlbumCommentCountOrderByAggregateInput
    _avg?: AlbumCommentAvgOrderByAggregateInput
    _max?: AlbumCommentMaxOrderByAggregateInput
    _min?: AlbumCommentMinOrderByAggregateInput
    _sum?: AlbumCommentSumOrderByAggregateInput
  }

  export type AlbumCommentScalarWhereWithAggregatesInput = {
    AND?: AlbumCommentScalarWhereWithAggregatesInput | AlbumCommentScalarWhereWithAggregatesInput[]
    OR?: AlbumCommentScalarWhereWithAggregatesInput[]
    NOT?: AlbumCommentScalarWhereWithAggregatesInput | AlbumCommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AlbumComment"> | number
    content?: StringWithAggregatesFilter<"AlbumComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AlbumComment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AlbumComment"> | Date | string
    userId?: IntWithAggregatesFilter<"AlbumComment"> | number
    albumId?: IntWithAggregatesFilter<"AlbumComment"> | number
  }

  export type AlbumLikeWhereInput = {
    AND?: AlbumLikeWhereInput | AlbumLikeWhereInput[]
    OR?: AlbumLikeWhereInput[]
    NOT?: AlbumLikeWhereInput | AlbumLikeWhereInput[]
    id?: IntFilter<"AlbumLike"> | number
    createdAt?: DateTimeFilter<"AlbumLike"> | Date | string
    userId?: IntFilter<"AlbumLike"> | number
    albumId?: IntFilter<"AlbumLike"> | number
    Album?: XOR<AlbumScalarRelationFilter, AlbumWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AlbumLikeOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
    Album?: AlbumOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type AlbumLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_albumId?: AlbumLikeUserIdAlbumIdCompoundUniqueInput
    AND?: AlbumLikeWhereInput | AlbumLikeWhereInput[]
    OR?: AlbumLikeWhereInput[]
    NOT?: AlbumLikeWhereInput | AlbumLikeWhereInput[]
    createdAt?: DateTimeFilter<"AlbumLike"> | Date | string
    userId?: IntFilter<"AlbumLike"> | number
    albumId?: IntFilter<"AlbumLike"> | number
    Album?: XOR<AlbumScalarRelationFilter, AlbumWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_albumId">

  export type AlbumLikeOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
    _count?: AlbumLikeCountOrderByAggregateInput
    _avg?: AlbumLikeAvgOrderByAggregateInput
    _max?: AlbumLikeMaxOrderByAggregateInput
    _min?: AlbumLikeMinOrderByAggregateInput
    _sum?: AlbumLikeSumOrderByAggregateInput
  }

  export type AlbumLikeScalarWhereWithAggregatesInput = {
    AND?: AlbumLikeScalarWhereWithAggregatesInput | AlbumLikeScalarWhereWithAggregatesInput[]
    OR?: AlbumLikeScalarWhereWithAggregatesInput[]
    NOT?: AlbumLikeScalarWhereWithAggregatesInput | AlbumLikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AlbumLike"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AlbumLike"> | Date | string
    userId?: IntWithAggregatesFilter<"AlbumLike"> | number
    albumId?: IntWithAggregatesFilter<"AlbumLike"> | number
  }

  export type PhotoWhereInput = {
    AND?: PhotoWhereInput | PhotoWhereInput[]
    OR?: PhotoWhereInput[]
    NOT?: PhotoWhereInput | PhotoWhereInput[]
    id?: IntFilter<"Photo"> | number
    url?: StringFilter<"Photo"> | string
    description?: StringNullableFilter<"Photo"> | string | null
    createdAt?: DateTimeFilter<"Photo"> | Date | string
    updatedAt?: DateTimeFilter<"Photo"> | Date | string
    albumId?: IntFilter<"Photo"> | number
    Album?: XOR<AlbumScalarRelationFilter, AlbumWhereInput>
  }

  export type PhotoOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    albumId?: SortOrder
    Album?: AlbumOrderByWithRelationInput
  }

  export type PhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PhotoWhereInput | PhotoWhereInput[]
    OR?: PhotoWhereInput[]
    NOT?: PhotoWhereInput | PhotoWhereInput[]
    url?: StringFilter<"Photo"> | string
    description?: StringNullableFilter<"Photo"> | string | null
    createdAt?: DateTimeFilter<"Photo"> | Date | string
    updatedAt?: DateTimeFilter<"Photo"> | Date | string
    albumId?: IntFilter<"Photo"> | number
    Album?: XOR<AlbumScalarRelationFilter, AlbumWhereInput>
  }, "id">

  export type PhotoOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    albumId?: SortOrder
    _count?: PhotoCountOrderByAggregateInput
    _avg?: PhotoAvgOrderByAggregateInput
    _max?: PhotoMaxOrderByAggregateInput
    _min?: PhotoMinOrderByAggregateInput
    _sum?: PhotoSumOrderByAggregateInput
  }

  export type PhotoScalarWhereWithAggregatesInput = {
    AND?: PhotoScalarWhereWithAggregatesInput | PhotoScalarWhereWithAggregatesInput[]
    OR?: PhotoScalarWhereWithAggregatesInput[]
    NOT?: PhotoScalarWhereWithAggregatesInput | PhotoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Photo"> | number
    url?: StringWithAggregatesFilter<"Photo"> | string
    description?: StringNullableWithAggregatesFilter<"Photo"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Photo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Photo"> | Date | string
    albumId?: IntWithAggregatesFilter<"Photo"> | number
  }

  export type UserCreateInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type CircleCreateInput = {
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Album?: AlbumCreateNestedManyWithoutCircleInput
    creator: UserCreateNestedOneWithoutCreatedCirclesInput
    members?: MembershipCreateNestedManyWithoutCircleInput
    posts?: PostCreateNestedManyWithoutCircleInput
  }

  export type CircleUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: number
    Album?: AlbumUncheckedCreateNestedManyWithoutCircleInput
    members?: MembershipUncheckedCreateNestedManyWithoutCircleInput
    posts?: PostUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CircleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUpdateManyWithoutCircleNestedInput
    creator?: UserUpdateOneRequiredWithoutCreatedCirclesNestedInput
    members?: MembershipUpdateManyWithoutCircleNestedInput
    posts?: PostUpdateManyWithoutCircleNestedInput
  }

  export type CircleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: IntFieldUpdateOperationsInput | number
    Album?: AlbumUncheckedUpdateManyWithoutCircleNestedInput
    members?: MembershipUncheckedUpdateManyWithoutCircleNestedInput
    posts?: PostUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type CircleCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: number
  }

  export type CircleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CircleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: IntFieldUpdateOperationsInput | number
  }

  export type MembershipCreateInput = {
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    circle: CircleCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type MembershipUncheckedCreateInput = {
    id?: number
    userId: number
    circleId: number
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembershipUpdateInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circle?: CircleUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type MembershipUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    circleId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipCreateManyInput = {
    id?: number
    userId: number
    circleId: number
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembershipUpdateManyMutationInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    circleId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    likes?: LikeCreateNestedManyWithoutPostInput
    circle: CircleCreateNestedOneWithoutPostsInput
    user: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateInput = {
    id?: number
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    circleId: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    likes?: LikeUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    likes?: LikeUpdateManyWithoutPostNestedInput
    circle?: CircleUpdateOneRequiredWithoutPostsNestedInput
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    circleId?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: number
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    circleId: number
  }

  export type PostUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    circleId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentCreateInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    postId: number
  }

  export type CommentUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentCreateManyInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    postId: number
  }

  export type CommentUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type LikeCreateInput = {
    createdAt?: Date | string
    post: PostCreateNestedOneWithoutLikesInput
    user: UserCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    userId: number
    postId: number
  }

  export type LikeUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutLikesNestedInput
    user?: UserUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type LikeCreateManyInput = {
    id?: number
    createdAt?: Date | string
    userId: number
    postId: number
  }

  export type LikeUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type FollowCreateInput = {
    createdAt?: Date | string
    follower: UserCreateNestedOneWithoutFollowingInput
    following: UserCreateNestedOneWithoutFollowersInput
  }

  export type FollowUncheckedCreateInput = {
    id?: number
    followerId: number
    followingId: number
    createdAt?: Date | string
  }

  export type FollowUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follower?: UserUpdateOneRequiredWithoutFollowingNestedInput
    following?: UserUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type FollowUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: IntFieldUpdateOperationsInput | number
    followingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateManyInput = {
    id?: number
    followerId: number
    followingId: number
    createdAt?: Date | string
  }

  export type FollowUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: IntFieldUpdateOperationsInput | number
    followingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlbumCreateInput = {
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPrivate?: boolean
    Circle?: CircleCreateNestedOneWithoutAlbumInput
    creator?: UserCreateNestedOneWithoutAlbumInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutAlbumInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutAlbumInput
    Photo?: PhotoCreateNestedManyWithoutAlbumInput
  }

  export type AlbumUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId?: number | null
    circleId?: number | null
    isPrivate?: boolean
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutAlbumInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutAlbumInput
    Photo?: PhotoUncheckedCreateNestedManyWithoutAlbumInput
  }

  export type AlbumUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    Circle?: CircleUpdateOneWithoutAlbumNestedInput
    creator?: UserUpdateOneWithoutAlbumNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutAlbumNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: NullableIntFieldUpdateOperationsInput | number | null
    circleId?: NullableIntFieldUpdateOperationsInput | number | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutAlbumNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUncheckedUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId?: number | null
    circleId?: number | null
    isPrivate?: boolean
  }

  export type AlbumUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AlbumUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: NullableIntFieldUpdateOperationsInput | number | null
    circleId?: NullableIntFieldUpdateOperationsInput | number | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserSettingsCreateInput = {
    darkMode?: boolean
    highContrast?: boolean
    fontSize?: string
    defaultAlbumPrivacy?: boolean
    muteAlbumContent?: boolean
    muteAlbumComments?: boolean
    enableNotifications?: boolean
    notifyNewMessages?: boolean
    notifyFriendRequests?: boolean
    notifyCircleInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSettingsInput
  }

  export type UserSettingsUncheckedCreateInput = {
    id?: number
    userId: number
    darkMode?: boolean
    highContrast?: boolean
    fontSize?: string
    defaultAlbumPrivacy?: boolean
    muteAlbumContent?: boolean
    muteAlbumComments?: boolean
    enableNotifications?: boolean
    notifyNewMessages?: boolean
    notifyFriendRequests?: boolean
    notifyCircleInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSettingsUpdateInput = {
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    highContrast?: BoolFieldUpdateOperationsInput | boolean
    fontSize?: StringFieldUpdateOperationsInput | string
    defaultAlbumPrivacy?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumContent?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumComments?: BoolFieldUpdateOperationsInput | boolean
    enableNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifyNewMessages?: BoolFieldUpdateOperationsInput | boolean
    notifyFriendRequests?: BoolFieldUpdateOperationsInput | boolean
    notifyCircleInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type UserSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    highContrast?: BoolFieldUpdateOperationsInput | boolean
    fontSize?: StringFieldUpdateOperationsInput | string
    defaultAlbumPrivacy?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumContent?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumComments?: BoolFieldUpdateOperationsInput | boolean
    enableNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifyNewMessages?: BoolFieldUpdateOperationsInput | boolean
    notifyFriendRequests?: BoolFieldUpdateOperationsInput | boolean
    notifyCircleInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSettingsCreateManyInput = {
    id?: number
    userId: number
    darkMode?: boolean
    highContrast?: boolean
    fontSize?: string
    defaultAlbumPrivacy?: boolean
    muteAlbumContent?: boolean
    muteAlbumComments?: boolean
    enableNotifications?: boolean
    notifyNewMessages?: boolean
    notifyFriendRequests?: boolean
    notifyCircleInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSettingsUpdateManyMutationInput = {
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    highContrast?: BoolFieldUpdateOperationsInput | boolean
    fontSize?: StringFieldUpdateOperationsInput | string
    defaultAlbumPrivacy?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumContent?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumComments?: BoolFieldUpdateOperationsInput | boolean
    enableNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifyNewMessages?: BoolFieldUpdateOperationsInput | boolean
    notifyFriendRequests?: BoolFieldUpdateOperationsInput | boolean
    notifyCircleInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    highContrast?: BoolFieldUpdateOperationsInput | boolean
    fontSize?: StringFieldUpdateOperationsInput | string
    defaultAlbumPrivacy?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumContent?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumComments?: BoolFieldUpdateOperationsInput | boolean
    enableNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifyNewMessages?: BoolFieldUpdateOperationsInput | boolean
    notifyFriendRequests?: BoolFieldUpdateOperationsInput | boolean
    notifyCircleInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlbumCommentCreateInput = {
    content: string
    createdAt?: Date | string
    updatedAt: Date | string
    Album: AlbumCreateNestedOneWithoutAlbumCommentInput
    User: UserCreateNestedOneWithoutAlbumCommentInput
  }

  export type AlbumCommentUncheckedCreateInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt: Date | string
    userId: number
    albumId: number
  }

  export type AlbumCommentUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUpdateOneRequiredWithoutAlbumCommentNestedInput
    User?: UserUpdateOneRequiredWithoutAlbumCommentNestedInput
  }

  export type AlbumCommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumCommentCreateManyInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt: Date | string
    userId: number
    albumId: number
  }

  export type AlbumCommentUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlbumCommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumLikeCreateInput = {
    createdAt?: Date | string
    Album: AlbumCreateNestedOneWithoutAlbumLikeInput
    User: UserCreateNestedOneWithoutAlbumLikeInput
  }

  export type AlbumLikeUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    userId: number
    albumId: number
  }

  export type AlbumLikeUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUpdateOneRequiredWithoutAlbumLikeNestedInput
    User?: UserUpdateOneRequiredWithoutAlbumLikeNestedInput
  }

  export type AlbumLikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumLikeCreateManyInput = {
    id?: number
    createdAt?: Date | string
    userId: number
    albumId: number
  }

  export type AlbumLikeUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlbumLikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type PhotoCreateInput = {
    url: string
    description?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    Album: AlbumCreateNestedOneWithoutPhotoInput
  }

  export type PhotoUncheckedCreateInput = {
    id?: number
    url: string
    description?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    albumId: number
  }

  export type PhotoUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUpdateOneRequiredWithoutPhotoNestedInput
  }

  export type PhotoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type PhotoCreateManyInput = {
    id?: number
    url: string
    description?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    albumId: number
  }

  export type PhotoUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type AlbumListRelationFilter = {
    every?: AlbumWhereInput
    some?: AlbumWhereInput
    none?: AlbumWhereInput
  }

  export type AlbumCommentListRelationFilter = {
    every?: AlbumCommentWhereInput
    some?: AlbumCommentWhereInput
    none?: AlbumCommentWhereInput
  }

  export type AlbumLikeListRelationFilter = {
    every?: AlbumLikeWhereInput
    some?: AlbumLikeWhereInput
    none?: AlbumLikeWhereInput
  }

  export type CircleListRelationFilter = {
    every?: CircleWhereInput
    some?: CircleWhereInput
    none?: CircleWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type FollowListRelationFilter = {
    every?: FollowWhereInput
    some?: FollowWhereInput
    none?: FollowWhereInput
  }

  export type LikeListRelationFilter = {
    every?: LikeWhereInput
    some?: LikeWhereInput
    none?: LikeWhereInput
  }

  export type MembershipListRelationFilter = {
    every?: MembershipWhereInput
    some?: MembershipWhereInput
    none?: MembershipWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type UserSettingsNullableScalarRelationFilter = {
    is?: UserSettingsWhereInput | null
    isNot?: UserSettingsWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AlbumOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlbumCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlbumLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CircleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FollowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    bio?: SortOrder
    profileImage?: SortOrder
    coverImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isProfilePrivate?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    bio?: SortOrder
    profileImage?: SortOrder
    coverImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isProfilePrivate?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    password?: SortOrder
    bio?: SortOrder
    profileImage?: SortOrder
    coverImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isProfilePrivate?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CircleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatar?: SortOrder
    coverImage?: SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type CircleAvgOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
  }

  export type CircleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatar?: SortOrder
    coverImage?: SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type CircleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatar?: SortOrder
    coverImage?: SortOrder
    isPrivate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type CircleSumOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type CircleScalarRelationFilter = {
    is?: CircleWhereInput
    isNot?: CircleWhereInput
  }

  export type MembershipUserIdCircleIdCompoundUniqueInput = {
    userId: number
    circleId: number
  }

  export type MembershipCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MembershipAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
  }

  export type MembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MembershipMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MembershipSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    videoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    videoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    videoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    circleId?: SortOrder
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type LikeUserIdPostIdCompoundUniqueInput = {
    userId: number
    postId: number
  }

  export type LikeCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type LikeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type LikeMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type LikeMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type LikeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
  }

  export type FollowFollowerIdFollowingIdCompoundUniqueInput = {
    followerId: number
    followingId: number
  }

  export type FollowCountOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowAvgOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
  }

  export type FollowMaxOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowMinOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowSumOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followingId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CircleNullableScalarRelationFilter = {
    is?: CircleWhereInput | null
    isNot?: CircleWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PhotoListRelationFilter = {
    every?: PhotoWhereInput
    some?: PhotoWhereInput
    none?: PhotoWhereInput
  }

  export type PhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlbumCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    coverImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    circleId?: SortOrder
    isPrivate?: SortOrder
  }

  export type AlbumAvgOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    circleId?: SortOrder
  }

  export type AlbumMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    coverImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    circleId?: SortOrder
    isPrivate?: SortOrder
  }

  export type AlbumMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    coverImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    circleId?: SortOrder
    isPrivate?: SortOrder
  }

  export type AlbumSumOrderByAggregateInput = {
    id?: SortOrder
    creatorId?: SortOrder
    circleId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    highContrast?: SortOrder
    fontSize?: SortOrder
    defaultAlbumPrivacy?: SortOrder
    muteAlbumContent?: SortOrder
    muteAlbumComments?: SortOrder
    enableNotifications?: SortOrder
    notifyNewMessages?: SortOrder
    notifyFriendRequests?: SortOrder
    notifyCircleInvites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    highContrast?: SortOrder
    fontSize?: SortOrder
    defaultAlbumPrivacy?: SortOrder
    muteAlbumContent?: SortOrder
    muteAlbumComments?: SortOrder
    enableNotifications?: SortOrder
    notifyNewMessages?: SortOrder
    notifyFriendRequests?: SortOrder
    notifyCircleInvites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    darkMode?: SortOrder
    highContrast?: SortOrder
    fontSize?: SortOrder
    defaultAlbumPrivacy?: SortOrder
    muteAlbumContent?: SortOrder
    muteAlbumComments?: SortOrder
    enableNotifications?: SortOrder
    notifyNewMessages?: SortOrder
    notifyFriendRequests?: SortOrder
    notifyCircleInvites?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSettingsSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AlbumScalarRelationFilter = {
    is?: AlbumWhereInput
    isNot?: AlbumWhereInput
  }

  export type AlbumCommentCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumCommentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumCommentMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumCommentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumLikeUserIdAlbumIdCompoundUniqueInput = {
    userId: number
    albumId: number
  }

  export type AlbumLikeCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumLikeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumLikeMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumLikeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    albumId?: SortOrder
  }

  export type PhotoCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    albumId?: SortOrder
  }

  export type PhotoAvgOrderByAggregateInput = {
    id?: SortOrder
    albumId?: SortOrder
  }

  export type PhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    albumId?: SortOrder
  }

  export type PhotoMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    albumId?: SortOrder
  }

  export type PhotoSumOrderByAggregateInput = {
    id?: SortOrder
    albumId?: SortOrder
  }

  export type AlbumCreateNestedManyWithoutCreatorInput = {
    create?: XOR<AlbumCreateWithoutCreatorInput, AlbumUncheckedCreateWithoutCreatorInput> | AlbumCreateWithoutCreatorInput[] | AlbumUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: AlbumCreateOrConnectWithoutCreatorInput | AlbumCreateOrConnectWithoutCreatorInput[]
    createMany?: AlbumCreateManyCreatorInputEnvelope
    connect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
  }

  export type AlbumCommentCreateNestedManyWithoutUserInput = {
    create?: XOR<AlbumCommentCreateWithoutUserInput, AlbumCommentUncheckedCreateWithoutUserInput> | AlbumCommentCreateWithoutUserInput[] | AlbumCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlbumCommentCreateOrConnectWithoutUserInput | AlbumCommentCreateOrConnectWithoutUserInput[]
    createMany?: AlbumCommentCreateManyUserInputEnvelope
    connect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
  }

  export type AlbumLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<AlbumLikeCreateWithoutUserInput, AlbumLikeUncheckedCreateWithoutUserInput> | AlbumLikeCreateWithoutUserInput[] | AlbumLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlbumLikeCreateOrConnectWithoutUserInput | AlbumLikeCreateOrConnectWithoutUserInput[]
    createMany?: AlbumLikeCreateManyUserInputEnvelope
    connect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
  }

  export type CircleCreateNestedManyWithoutCreatorInput = {
    create?: XOR<CircleCreateWithoutCreatorInput, CircleUncheckedCreateWithoutCreatorInput> | CircleCreateWithoutCreatorInput[] | CircleUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CircleCreateOrConnectWithoutCreatorInput | CircleCreateOrConnectWithoutCreatorInput[]
    createMany?: CircleCreateManyCreatorInputEnvelope
    connect?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowerInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type LikeCreateNestedManyWithoutUserInput = {
    create?: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput> | LikeCreateWithoutUserInput[] | LikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUserInput | LikeCreateOrConnectWithoutUserInput[]
    createMany?: LikeCreateManyUserInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type MembershipCreateNestedManyWithoutUserInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type UserSettingsCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    connect?: UserSettingsWhereUniqueInput
  }

  export type AlbumUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<AlbumCreateWithoutCreatorInput, AlbumUncheckedCreateWithoutCreatorInput> | AlbumCreateWithoutCreatorInput[] | AlbumUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: AlbumCreateOrConnectWithoutCreatorInput | AlbumCreateOrConnectWithoutCreatorInput[]
    createMany?: AlbumCreateManyCreatorInputEnvelope
    connect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
  }

  export type AlbumCommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AlbumCommentCreateWithoutUserInput, AlbumCommentUncheckedCreateWithoutUserInput> | AlbumCommentCreateWithoutUserInput[] | AlbumCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlbumCommentCreateOrConnectWithoutUserInput | AlbumCommentCreateOrConnectWithoutUserInput[]
    createMany?: AlbumCommentCreateManyUserInputEnvelope
    connect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
  }

  export type AlbumLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AlbumLikeCreateWithoutUserInput, AlbumLikeUncheckedCreateWithoutUserInput> | AlbumLikeCreateWithoutUserInput[] | AlbumLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlbumLikeCreateOrConnectWithoutUserInput | AlbumLikeCreateOrConnectWithoutUserInput[]
    createMany?: AlbumLikeCreateManyUserInputEnvelope
    connect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
  }

  export type CircleUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<CircleCreateWithoutCreatorInput, CircleUncheckedCreateWithoutCreatorInput> | CircleCreateWithoutCreatorInput[] | CircleUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CircleCreateOrConnectWithoutCreatorInput | CircleCreateOrConnectWithoutCreatorInput[]
    createMany?: CircleCreateManyCreatorInputEnvelope
    connect?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowerInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowingInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type LikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput> | LikeCreateWithoutUserInput[] | LikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUserInput | LikeCreateOrConnectWithoutUserInput[]
    createMany?: LikeCreateManyUserInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type MembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type UserSettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    connect?: UserSettingsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type AlbumUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<AlbumCreateWithoutCreatorInput, AlbumUncheckedCreateWithoutCreatorInput> | AlbumCreateWithoutCreatorInput[] | AlbumUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: AlbumCreateOrConnectWithoutCreatorInput | AlbumCreateOrConnectWithoutCreatorInput[]
    upsert?: AlbumUpsertWithWhereUniqueWithoutCreatorInput | AlbumUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: AlbumCreateManyCreatorInputEnvelope
    set?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    disconnect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    delete?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    connect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    update?: AlbumUpdateWithWhereUniqueWithoutCreatorInput | AlbumUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: AlbumUpdateManyWithWhereWithoutCreatorInput | AlbumUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: AlbumScalarWhereInput | AlbumScalarWhereInput[]
  }

  export type AlbumCommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<AlbumCommentCreateWithoutUserInput, AlbumCommentUncheckedCreateWithoutUserInput> | AlbumCommentCreateWithoutUserInput[] | AlbumCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlbumCommentCreateOrConnectWithoutUserInput | AlbumCommentCreateOrConnectWithoutUserInput[]
    upsert?: AlbumCommentUpsertWithWhereUniqueWithoutUserInput | AlbumCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AlbumCommentCreateManyUserInputEnvelope
    set?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    disconnect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    delete?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    connect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    update?: AlbumCommentUpdateWithWhereUniqueWithoutUserInput | AlbumCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AlbumCommentUpdateManyWithWhereWithoutUserInput | AlbumCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AlbumCommentScalarWhereInput | AlbumCommentScalarWhereInput[]
  }

  export type AlbumLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<AlbumLikeCreateWithoutUserInput, AlbumLikeUncheckedCreateWithoutUserInput> | AlbumLikeCreateWithoutUserInput[] | AlbumLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlbumLikeCreateOrConnectWithoutUserInput | AlbumLikeCreateOrConnectWithoutUserInput[]
    upsert?: AlbumLikeUpsertWithWhereUniqueWithoutUserInput | AlbumLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AlbumLikeCreateManyUserInputEnvelope
    set?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    disconnect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    delete?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    connect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    update?: AlbumLikeUpdateWithWhereUniqueWithoutUserInput | AlbumLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AlbumLikeUpdateManyWithWhereWithoutUserInput | AlbumLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AlbumLikeScalarWhereInput | AlbumLikeScalarWhereInput[]
  }

  export type CircleUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<CircleCreateWithoutCreatorInput, CircleUncheckedCreateWithoutCreatorInput> | CircleCreateWithoutCreatorInput[] | CircleUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CircleCreateOrConnectWithoutCreatorInput | CircleCreateOrConnectWithoutCreatorInput[]
    upsert?: CircleUpsertWithWhereUniqueWithoutCreatorInput | CircleUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: CircleCreateManyCreatorInputEnvelope
    set?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
    disconnect?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
    delete?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
    connect?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
    update?: CircleUpdateWithWhereUniqueWithoutCreatorInput | CircleUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: CircleUpdateManyWithWhereWithoutCreatorInput | CircleUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: CircleScalarWhereInput | CircleScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowerInput | FollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowerInput | FollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowerInput | FollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowingInput | FollowUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowingInput | FollowUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowingInput | FollowUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type LikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput> | LikeCreateWithoutUserInput[] | LikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUserInput | LikeCreateOrConnectWithoutUserInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutUserInput | LikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LikeCreateManyUserInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutUserInput | LikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutUserInput | LikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type MembershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutUserInput | MembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutUserInput | MembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutUserInput | MembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type PostUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type UserSettingsUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    upsert?: UserSettingsUpsertWithoutUserInput
    disconnect?: UserSettingsWhereInput | boolean
    delete?: UserSettingsWhereInput | boolean
    connect?: UserSettingsWhereUniqueInput
    update?: XOR<XOR<UserSettingsUpdateToOneWithWhereWithoutUserInput, UserSettingsUpdateWithoutUserInput>, UserSettingsUncheckedUpdateWithoutUserInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AlbumUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<AlbumCreateWithoutCreatorInput, AlbumUncheckedCreateWithoutCreatorInput> | AlbumCreateWithoutCreatorInput[] | AlbumUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: AlbumCreateOrConnectWithoutCreatorInput | AlbumCreateOrConnectWithoutCreatorInput[]
    upsert?: AlbumUpsertWithWhereUniqueWithoutCreatorInput | AlbumUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: AlbumCreateManyCreatorInputEnvelope
    set?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    disconnect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    delete?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    connect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    update?: AlbumUpdateWithWhereUniqueWithoutCreatorInput | AlbumUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: AlbumUpdateManyWithWhereWithoutCreatorInput | AlbumUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: AlbumScalarWhereInput | AlbumScalarWhereInput[]
  }

  export type AlbumCommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AlbumCommentCreateWithoutUserInput, AlbumCommentUncheckedCreateWithoutUserInput> | AlbumCommentCreateWithoutUserInput[] | AlbumCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlbumCommentCreateOrConnectWithoutUserInput | AlbumCommentCreateOrConnectWithoutUserInput[]
    upsert?: AlbumCommentUpsertWithWhereUniqueWithoutUserInput | AlbumCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AlbumCommentCreateManyUserInputEnvelope
    set?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    disconnect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    delete?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    connect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    update?: AlbumCommentUpdateWithWhereUniqueWithoutUserInput | AlbumCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AlbumCommentUpdateManyWithWhereWithoutUserInput | AlbumCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AlbumCommentScalarWhereInput | AlbumCommentScalarWhereInput[]
  }

  export type AlbumLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AlbumLikeCreateWithoutUserInput, AlbumLikeUncheckedCreateWithoutUserInput> | AlbumLikeCreateWithoutUserInput[] | AlbumLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlbumLikeCreateOrConnectWithoutUserInput | AlbumLikeCreateOrConnectWithoutUserInput[]
    upsert?: AlbumLikeUpsertWithWhereUniqueWithoutUserInput | AlbumLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AlbumLikeCreateManyUserInputEnvelope
    set?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    disconnect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    delete?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    connect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    update?: AlbumLikeUpdateWithWhereUniqueWithoutUserInput | AlbumLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AlbumLikeUpdateManyWithWhereWithoutUserInput | AlbumLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AlbumLikeScalarWhereInput | AlbumLikeScalarWhereInput[]
  }

  export type CircleUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<CircleCreateWithoutCreatorInput, CircleUncheckedCreateWithoutCreatorInput> | CircleCreateWithoutCreatorInput[] | CircleUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: CircleCreateOrConnectWithoutCreatorInput | CircleCreateOrConnectWithoutCreatorInput[]
    upsert?: CircleUpsertWithWhereUniqueWithoutCreatorInput | CircleUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: CircleCreateManyCreatorInputEnvelope
    set?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
    disconnect?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
    delete?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
    connect?: CircleWhereUniqueInput | CircleWhereUniqueInput[]
    update?: CircleUpdateWithWhereUniqueWithoutCreatorInput | CircleUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: CircleUpdateManyWithWhereWithoutCreatorInput | CircleUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: CircleScalarWhereInput | CircleScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowerInput | FollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowerInput | FollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowerInput | FollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowingNestedInput = {
    create?: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput> | FollowCreateWithoutFollowingInput[] | FollowUncheckedCreateWithoutFollowingInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowingInput | FollowCreateOrConnectWithoutFollowingInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowingInput | FollowUpsertWithWhereUniqueWithoutFollowingInput[]
    createMany?: FollowCreateManyFollowingInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowingInput | FollowUpdateWithWhereUniqueWithoutFollowingInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowingInput | FollowUpdateManyWithWhereWithoutFollowingInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type LikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput> | LikeCreateWithoutUserInput[] | LikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutUserInput | LikeCreateOrConnectWithoutUserInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutUserInput | LikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LikeCreateManyUserInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutUserInput | LikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutUserInput | LikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type MembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutUserInput | MembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutUserInput | MembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutUserInput | MembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type UserSettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserSettingsCreateOrConnectWithoutUserInput
    upsert?: UserSettingsUpsertWithoutUserInput
    disconnect?: UserSettingsWhereInput | boolean
    delete?: UserSettingsWhereInput | boolean
    connect?: UserSettingsWhereUniqueInput
    update?: XOR<XOR<UserSettingsUpdateToOneWithWhereWithoutUserInput, UserSettingsUpdateWithoutUserInput>, UserSettingsUncheckedUpdateWithoutUserInput>
  }

  export type AlbumCreateNestedManyWithoutCircleInput = {
    create?: XOR<AlbumCreateWithoutCircleInput, AlbumUncheckedCreateWithoutCircleInput> | AlbumCreateWithoutCircleInput[] | AlbumUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: AlbumCreateOrConnectWithoutCircleInput | AlbumCreateOrConnectWithoutCircleInput[]
    createMany?: AlbumCreateManyCircleInputEnvelope
    connect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCreatedCirclesInput = {
    create?: XOR<UserCreateWithoutCreatedCirclesInput, UserUncheckedCreateWithoutCreatedCirclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCirclesInput
    connect?: UserWhereUniqueInput
  }

  export type MembershipCreateNestedManyWithoutCircleInput = {
    create?: XOR<MembershipCreateWithoutCircleInput, MembershipUncheckedCreateWithoutCircleInput> | MembershipCreateWithoutCircleInput[] | MembershipUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutCircleInput | MembershipCreateOrConnectWithoutCircleInput[]
    createMany?: MembershipCreateManyCircleInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutCircleInput = {
    create?: XOR<PostCreateWithoutCircleInput, PostUncheckedCreateWithoutCircleInput> | PostCreateWithoutCircleInput[] | PostUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCircleInput | PostCreateOrConnectWithoutCircleInput[]
    createMany?: PostCreateManyCircleInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type AlbumUncheckedCreateNestedManyWithoutCircleInput = {
    create?: XOR<AlbumCreateWithoutCircleInput, AlbumUncheckedCreateWithoutCircleInput> | AlbumCreateWithoutCircleInput[] | AlbumUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: AlbumCreateOrConnectWithoutCircleInput | AlbumCreateOrConnectWithoutCircleInput[]
    createMany?: AlbumCreateManyCircleInputEnvelope
    connect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
  }

  export type MembershipUncheckedCreateNestedManyWithoutCircleInput = {
    create?: XOR<MembershipCreateWithoutCircleInput, MembershipUncheckedCreateWithoutCircleInput> | MembershipCreateWithoutCircleInput[] | MembershipUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutCircleInput | MembershipCreateOrConnectWithoutCircleInput[]
    createMany?: MembershipCreateManyCircleInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutCircleInput = {
    create?: XOR<PostCreateWithoutCircleInput, PostUncheckedCreateWithoutCircleInput> | PostCreateWithoutCircleInput[] | PostUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCircleInput | PostCreateOrConnectWithoutCircleInput[]
    createMany?: PostCreateManyCircleInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AlbumUpdateManyWithoutCircleNestedInput = {
    create?: XOR<AlbumCreateWithoutCircleInput, AlbumUncheckedCreateWithoutCircleInput> | AlbumCreateWithoutCircleInput[] | AlbumUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: AlbumCreateOrConnectWithoutCircleInput | AlbumCreateOrConnectWithoutCircleInput[]
    upsert?: AlbumUpsertWithWhereUniqueWithoutCircleInput | AlbumUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: AlbumCreateManyCircleInputEnvelope
    set?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    disconnect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    delete?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    connect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    update?: AlbumUpdateWithWhereUniqueWithoutCircleInput | AlbumUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: AlbumUpdateManyWithWhereWithoutCircleInput | AlbumUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: AlbumScalarWhereInput | AlbumScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCreatedCirclesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedCirclesInput, UserUncheckedCreateWithoutCreatedCirclesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCirclesInput
    upsert?: UserUpsertWithoutCreatedCirclesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedCirclesInput, UserUpdateWithoutCreatedCirclesInput>, UserUncheckedUpdateWithoutCreatedCirclesInput>
  }

  export type MembershipUpdateManyWithoutCircleNestedInput = {
    create?: XOR<MembershipCreateWithoutCircleInput, MembershipUncheckedCreateWithoutCircleInput> | MembershipCreateWithoutCircleInput[] | MembershipUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutCircleInput | MembershipCreateOrConnectWithoutCircleInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutCircleInput | MembershipUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: MembershipCreateManyCircleInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutCircleInput | MembershipUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutCircleInput | MembershipUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type PostUpdateManyWithoutCircleNestedInput = {
    create?: XOR<PostCreateWithoutCircleInput, PostUncheckedCreateWithoutCircleInput> | PostCreateWithoutCircleInput[] | PostUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCircleInput | PostCreateOrConnectWithoutCircleInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCircleInput | PostUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: PostCreateManyCircleInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCircleInput | PostUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCircleInput | PostUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type AlbumUncheckedUpdateManyWithoutCircleNestedInput = {
    create?: XOR<AlbumCreateWithoutCircleInput, AlbumUncheckedCreateWithoutCircleInput> | AlbumCreateWithoutCircleInput[] | AlbumUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: AlbumCreateOrConnectWithoutCircleInput | AlbumCreateOrConnectWithoutCircleInput[]
    upsert?: AlbumUpsertWithWhereUniqueWithoutCircleInput | AlbumUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: AlbumCreateManyCircleInputEnvelope
    set?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    disconnect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    delete?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    connect?: AlbumWhereUniqueInput | AlbumWhereUniqueInput[]
    update?: AlbumUpdateWithWhereUniqueWithoutCircleInput | AlbumUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: AlbumUpdateManyWithWhereWithoutCircleInput | AlbumUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: AlbumScalarWhereInput | AlbumScalarWhereInput[]
  }

  export type MembershipUncheckedUpdateManyWithoutCircleNestedInput = {
    create?: XOR<MembershipCreateWithoutCircleInput, MembershipUncheckedCreateWithoutCircleInput> | MembershipCreateWithoutCircleInput[] | MembershipUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutCircleInput | MembershipCreateOrConnectWithoutCircleInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutCircleInput | MembershipUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: MembershipCreateManyCircleInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutCircleInput | MembershipUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutCircleInput | MembershipUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutCircleNestedInput = {
    create?: XOR<PostCreateWithoutCircleInput, PostUncheckedCreateWithoutCircleInput> | PostCreateWithoutCircleInput[] | PostUncheckedCreateWithoutCircleInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCircleInput | PostCreateOrConnectWithoutCircleInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCircleInput | PostUpsertWithWhereUniqueWithoutCircleInput[]
    createMany?: PostCreateManyCircleInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCircleInput | PostUpdateWithWhereUniqueWithoutCircleInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCircleInput | PostUpdateManyWithWhereWithoutCircleInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type CircleCreateNestedOneWithoutMembersInput = {
    create?: XOR<CircleCreateWithoutMembersInput, CircleUncheckedCreateWithoutMembersInput>
    connectOrCreate?: CircleCreateOrConnectWithoutMembersInput
    connect?: CircleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type CircleUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<CircleCreateWithoutMembersInput, CircleUncheckedCreateWithoutMembersInput>
    connectOrCreate?: CircleCreateOrConnectWithoutMembersInput
    upsert?: CircleUpsertWithoutMembersInput
    connect?: CircleWhereUniqueInput
    update?: XOR<XOR<CircleUpdateToOneWithWhereWithoutMembersInput, CircleUpdateWithoutMembersInput>, CircleUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type CommentCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type LikeCreateNestedManyWithoutPostInput = {
    create?: XOR<LikeCreateWithoutPostInput, LikeUncheckedCreateWithoutPostInput> | LikeCreateWithoutPostInput[] | LikeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPostInput | LikeCreateOrConnectWithoutPostInput[]
    createMany?: LikeCreateManyPostInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type CircleCreateNestedOneWithoutPostsInput = {
    create?: XOR<CircleCreateWithoutPostsInput, CircleUncheckedCreateWithoutPostsInput>
    connectOrCreate?: CircleCreateOrConnectWithoutPostsInput
    connect?: CircleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type CommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type LikeUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<LikeCreateWithoutPostInput, LikeUncheckedCreateWithoutPostInput> | LikeCreateWithoutPostInput[] | LikeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPostInput | LikeCreateOrConnectWithoutPostInput[]
    createMany?: LikeCreateManyPostInputEnvelope
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
  }

  export type CommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type LikeUpdateManyWithoutPostNestedInput = {
    create?: XOR<LikeCreateWithoutPostInput, LikeUncheckedCreateWithoutPostInput> | LikeCreateWithoutPostInput[] | LikeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPostInput | LikeCreateOrConnectWithoutPostInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutPostInput | LikeUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: LikeCreateManyPostInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutPostInput | LikeUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutPostInput | LikeUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type CircleUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<CircleCreateWithoutPostsInput, CircleUncheckedCreateWithoutPostsInput>
    connectOrCreate?: CircleCreateOrConnectWithoutPostsInput
    upsert?: CircleUpsertWithoutPostsInput
    connect?: CircleWhereUniqueInput
    update?: XOR<XOR<CircleUpdateToOneWithWhereWithoutPostsInput, CircleUpdateWithoutPostsInput>, CircleUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type CommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type LikeUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<LikeCreateWithoutPostInput, LikeUncheckedCreateWithoutPostInput> | LikeCreateWithoutPostInput[] | LikeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: LikeCreateOrConnectWithoutPostInput | LikeCreateOrConnectWithoutPostInput[]
    upsert?: LikeUpsertWithWhereUniqueWithoutPostInput | LikeUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: LikeCreateManyPostInputEnvelope
    set?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    disconnect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    delete?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    connect?: LikeWhereUniqueInput | LikeWhereUniqueInput[]
    update?: LikeUpdateWithWhereUniqueWithoutPostInput | LikeUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: LikeUpdateManyWithWhereWithoutPostInput | LikeUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: LikeScalarWhereInput | LikeScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    connect?: PostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    upsert?: PostUpsertWithoutCommentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutCommentsInput, PostUpdateWithoutCommentsInput>, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type PostCreateNestedOneWithoutLikesInput = {
    create?: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
    connectOrCreate?: PostCreateOrConnectWithoutLikesInput
    connect?: PostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLikesInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    connect?: UserWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
    connectOrCreate?: PostCreateOrConnectWithoutLikesInput
    upsert?: PostUpsertWithoutLikesInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutLikesInput, PostUpdateWithoutLikesInput>, PostUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    upsert?: UserUpsertWithoutLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikesInput, UserUpdateWithoutLikesInput>, UserUncheckedUpdateWithoutLikesInput>
  }

  export type UserCreateNestedOneWithoutFollowingInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFollowersInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    upsert?: UserUpsertWithoutFollowingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowingInput, UserUpdateWithoutFollowingInput>, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    upsert?: UserUpsertWithoutFollowersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowersInput, UserUpdateWithoutFollowersInput>, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type CircleCreateNestedOneWithoutAlbumInput = {
    create?: XOR<CircleCreateWithoutAlbumInput, CircleUncheckedCreateWithoutAlbumInput>
    connectOrCreate?: CircleCreateOrConnectWithoutAlbumInput
    connect?: CircleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAlbumInput = {
    create?: XOR<UserCreateWithoutAlbumInput, UserUncheckedCreateWithoutAlbumInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlbumInput
    connect?: UserWhereUniqueInput
  }

  export type AlbumCommentCreateNestedManyWithoutAlbumInput = {
    create?: XOR<AlbumCommentCreateWithoutAlbumInput, AlbumCommentUncheckedCreateWithoutAlbumInput> | AlbumCommentCreateWithoutAlbumInput[] | AlbumCommentUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: AlbumCommentCreateOrConnectWithoutAlbumInput | AlbumCommentCreateOrConnectWithoutAlbumInput[]
    createMany?: AlbumCommentCreateManyAlbumInputEnvelope
    connect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
  }

  export type AlbumLikeCreateNestedManyWithoutAlbumInput = {
    create?: XOR<AlbumLikeCreateWithoutAlbumInput, AlbumLikeUncheckedCreateWithoutAlbumInput> | AlbumLikeCreateWithoutAlbumInput[] | AlbumLikeUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: AlbumLikeCreateOrConnectWithoutAlbumInput | AlbumLikeCreateOrConnectWithoutAlbumInput[]
    createMany?: AlbumLikeCreateManyAlbumInputEnvelope
    connect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
  }

  export type PhotoCreateNestedManyWithoutAlbumInput = {
    create?: XOR<PhotoCreateWithoutAlbumInput, PhotoUncheckedCreateWithoutAlbumInput> | PhotoCreateWithoutAlbumInput[] | PhotoUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: PhotoCreateOrConnectWithoutAlbumInput | PhotoCreateOrConnectWithoutAlbumInput[]
    createMany?: PhotoCreateManyAlbumInputEnvelope
    connect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
  }

  export type AlbumCommentUncheckedCreateNestedManyWithoutAlbumInput = {
    create?: XOR<AlbumCommentCreateWithoutAlbumInput, AlbumCommentUncheckedCreateWithoutAlbumInput> | AlbumCommentCreateWithoutAlbumInput[] | AlbumCommentUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: AlbumCommentCreateOrConnectWithoutAlbumInput | AlbumCommentCreateOrConnectWithoutAlbumInput[]
    createMany?: AlbumCommentCreateManyAlbumInputEnvelope
    connect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
  }

  export type AlbumLikeUncheckedCreateNestedManyWithoutAlbumInput = {
    create?: XOR<AlbumLikeCreateWithoutAlbumInput, AlbumLikeUncheckedCreateWithoutAlbumInput> | AlbumLikeCreateWithoutAlbumInput[] | AlbumLikeUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: AlbumLikeCreateOrConnectWithoutAlbumInput | AlbumLikeCreateOrConnectWithoutAlbumInput[]
    createMany?: AlbumLikeCreateManyAlbumInputEnvelope
    connect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
  }

  export type PhotoUncheckedCreateNestedManyWithoutAlbumInput = {
    create?: XOR<PhotoCreateWithoutAlbumInput, PhotoUncheckedCreateWithoutAlbumInput> | PhotoCreateWithoutAlbumInput[] | PhotoUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: PhotoCreateOrConnectWithoutAlbumInput | PhotoCreateOrConnectWithoutAlbumInput[]
    createMany?: PhotoCreateManyAlbumInputEnvelope
    connect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
  }

  export type CircleUpdateOneWithoutAlbumNestedInput = {
    create?: XOR<CircleCreateWithoutAlbumInput, CircleUncheckedCreateWithoutAlbumInput>
    connectOrCreate?: CircleCreateOrConnectWithoutAlbumInput
    upsert?: CircleUpsertWithoutAlbumInput
    disconnect?: CircleWhereInput | boolean
    delete?: CircleWhereInput | boolean
    connect?: CircleWhereUniqueInput
    update?: XOR<XOR<CircleUpdateToOneWithWhereWithoutAlbumInput, CircleUpdateWithoutAlbumInput>, CircleUncheckedUpdateWithoutAlbumInput>
  }

  export type UserUpdateOneWithoutAlbumNestedInput = {
    create?: XOR<UserCreateWithoutAlbumInput, UserUncheckedCreateWithoutAlbumInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlbumInput
    upsert?: UserUpsertWithoutAlbumInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAlbumInput, UserUpdateWithoutAlbumInput>, UserUncheckedUpdateWithoutAlbumInput>
  }

  export type AlbumCommentUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<AlbumCommentCreateWithoutAlbumInput, AlbumCommentUncheckedCreateWithoutAlbumInput> | AlbumCommentCreateWithoutAlbumInput[] | AlbumCommentUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: AlbumCommentCreateOrConnectWithoutAlbumInput | AlbumCommentCreateOrConnectWithoutAlbumInput[]
    upsert?: AlbumCommentUpsertWithWhereUniqueWithoutAlbumInput | AlbumCommentUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: AlbumCommentCreateManyAlbumInputEnvelope
    set?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    disconnect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    delete?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    connect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    update?: AlbumCommentUpdateWithWhereUniqueWithoutAlbumInput | AlbumCommentUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: AlbumCommentUpdateManyWithWhereWithoutAlbumInput | AlbumCommentUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: AlbumCommentScalarWhereInput | AlbumCommentScalarWhereInput[]
  }

  export type AlbumLikeUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<AlbumLikeCreateWithoutAlbumInput, AlbumLikeUncheckedCreateWithoutAlbumInput> | AlbumLikeCreateWithoutAlbumInput[] | AlbumLikeUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: AlbumLikeCreateOrConnectWithoutAlbumInput | AlbumLikeCreateOrConnectWithoutAlbumInput[]
    upsert?: AlbumLikeUpsertWithWhereUniqueWithoutAlbumInput | AlbumLikeUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: AlbumLikeCreateManyAlbumInputEnvelope
    set?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    disconnect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    delete?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    connect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    update?: AlbumLikeUpdateWithWhereUniqueWithoutAlbumInput | AlbumLikeUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: AlbumLikeUpdateManyWithWhereWithoutAlbumInput | AlbumLikeUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: AlbumLikeScalarWhereInput | AlbumLikeScalarWhereInput[]
  }

  export type PhotoUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<PhotoCreateWithoutAlbumInput, PhotoUncheckedCreateWithoutAlbumInput> | PhotoCreateWithoutAlbumInput[] | PhotoUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: PhotoCreateOrConnectWithoutAlbumInput | PhotoCreateOrConnectWithoutAlbumInput[]
    upsert?: PhotoUpsertWithWhereUniqueWithoutAlbumInput | PhotoUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: PhotoCreateManyAlbumInputEnvelope
    set?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    disconnect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    delete?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    connect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    update?: PhotoUpdateWithWhereUniqueWithoutAlbumInput | PhotoUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: PhotoUpdateManyWithWhereWithoutAlbumInput | PhotoUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: PhotoScalarWhereInput | PhotoScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AlbumCommentUncheckedUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<AlbumCommentCreateWithoutAlbumInput, AlbumCommentUncheckedCreateWithoutAlbumInput> | AlbumCommentCreateWithoutAlbumInput[] | AlbumCommentUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: AlbumCommentCreateOrConnectWithoutAlbumInput | AlbumCommentCreateOrConnectWithoutAlbumInput[]
    upsert?: AlbumCommentUpsertWithWhereUniqueWithoutAlbumInput | AlbumCommentUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: AlbumCommentCreateManyAlbumInputEnvelope
    set?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    disconnect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    delete?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    connect?: AlbumCommentWhereUniqueInput | AlbumCommentWhereUniqueInput[]
    update?: AlbumCommentUpdateWithWhereUniqueWithoutAlbumInput | AlbumCommentUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: AlbumCommentUpdateManyWithWhereWithoutAlbumInput | AlbumCommentUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: AlbumCommentScalarWhereInput | AlbumCommentScalarWhereInput[]
  }

  export type AlbumLikeUncheckedUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<AlbumLikeCreateWithoutAlbumInput, AlbumLikeUncheckedCreateWithoutAlbumInput> | AlbumLikeCreateWithoutAlbumInput[] | AlbumLikeUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: AlbumLikeCreateOrConnectWithoutAlbumInput | AlbumLikeCreateOrConnectWithoutAlbumInput[]
    upsert?: AlbumLikeUpsertWithWhereUniqueWithoutAlbumInput | AlbumLikeUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: AlbumLikeCreateManyAlbumInputEnvelope
    set?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    disconnect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    delete?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    connect?: AlbumLikeWhereUniqueInput | AlbumLikeWhereUniqueInput[]
    update?: AlbumLikeUpdateWithWhereUniqueWithoutAlbumInput | AlbumLikeUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: AlbumLikeUpdateManyWithWhereWithoutAlbumInput | AlbumLikeUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: AlbumLikeScalarWhereInput | AlbumLikeScalarWhereInput[]
  }

  export type PhotoUncheckedUpdateManyWithoutAlbumNestedInput = {
    create?: XOR<PhotoCreateWithoutAlbumInput, PhotoUncheckedCreateWithoutAlbumInput> | PhotoCreateWithoutAlbumInput[] | PhotoUncheckedCreateWithoutAlbumInput[]
    connectOrCreate?: PhotoCreateOrConnectWithoutAlbumInput | PhotoCreateOrConnectWithoutAlbumInput[]
    upsert?: PhotoUpsertWithWhereUniqueWithoutAlbumInput | PhotoUpsertWithWhereUniqueWithoutAlbumInput[]
    createMany?: PhotoCreateManyAlbumInputEnvelope
    set?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    disconnect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    delete?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    connect?: PhotoWhereUniqueInput | PhotoWhereUniqueInput[]
    update?: PhotoUpdateWithWhereUniqueWithoutAlbumInput | PhotoUpdateWithWhereUniqueWithoutAlbumInput[]
    updateMany?: PhotoUpdateManyWithWhereWithoutAlbumInput | PhotoUpdateManyWithWhereWithoutAlbumInput[]
    deleteMany?: PhotoScalarWhereInput | PhotoScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSettingsInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    upsert?: UserUpsertWithoutSettingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSettingsInput, UserUpdateWithoutSettingsInput>, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type AlbumCreateNestedOneWithoutAlbumCommentInput = {
    create?: XOR<AlbumCreateWithoutAlbumCommentInput, AlbumUncheckedCreateWithoutAlbumCommentInput>
    connectOrCreate?: AlbumCreateOrConnectWithoutAlbumCommentInput
    connect?: AlbumWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAlbumCommentInput = {
    create?: XOR<UserCreateWithoutAlbumCommentInput, UserUncheckedCreateWithoutAlbumCommentInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlbumCommentInput
    connect?: UserWhereUniqueInput
  }

  export type AlbumUpdateOneRequiredWithoutAlbumCommentNestedInput = {
    create?: XOR<AlbumCreateWithoutAlbumCommentInput, AlbumUncheckedCreateWithoutAlbumCommentInput>
    connectOrCreate?: AlbumCreateOrConnectWithoutAlbumCommentInput
    upsert?: AlbumUpsertWithoutAlbumCommentInput
    connect?: AlbumWhereUniqueInput
    update?: XOR<XOR<AlbumUpdateToOneWithWhereWithoutAlbumCommentInput, AlbumUpdateWithoutAlbumCommentInput>, AlbumUncheckedUpdateWithoutAlbumCommentInput>
  }

  export type UserUpdateOneRequiredWithoutAlbumCommentNestedInput = {
    create?: XOR<UserCreateWithoutAlbumCommentInput, UserUncheckedCreateWithoutAlbumCommentInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlbumCommentInput
    upsert?: UserUpsertWithoutAlbumCommentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAlbumCommentInput, UserUpdateWithoutAlbumCommentInput>, UserUncheckedUpdateWithoutAlbumCommentInput>
  }

  export type AlbumCreateNestedOneWithoutAlbumLikeInput = {
    create?: XOR<AlbumCreateWithoutAlbumLikeInput, AlbumUncheckedCreateWithoutAlbumLikeInput>
    connectOrCreate?: AlbumCreateOrConnectWithoutAlbumLikeInput
    connect?: AlbumWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAlbumLikeInput = {
    create?: XOR<UserCreateWithoutAlbumLikeInput, UserUncheckedCreateWithoutAlbumLikeInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlbumLikeInput
    connect?: UserWhereUniqueInput
  }

  export type AlbumUpdateOneRequiredWithoutAlbumLikeNestedInput = {
    create?: XOR<AlbumCreateWithoutAlbumLikeInput, AlbumUncheckedCreateWithoutAlbumLikeInput>
    connectOrCreate?: AlbumCreateOrConnectWithoutAlbumLikeInput
    upsert?: AlbumUpsertWithoutAlbumLikeInput
    connect?: AlbumWhereUniqueInput
    update?: XOR<XOR<AlbumUpdateToOneWithWhereWithoutAlbumLikeInput, AlbumUpdateWithoutAlbumLikeInput>, AlbumUncheckedUpdateWithoutAlbumLikeInput>
  }

  export type UserUpdateOneRequiredWithoutAlbumLikeNestedInput = {
    create?: XOR<UserCreateWithoutAlbumLikeInput, UserUncheckedCreateWithoutAlbumLikeInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlbumLikeInput
    upsert?: UserUpsertWithoutAlbumLikeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAlbumLikeInput, UserUpdateWithoutAlbumLikeInput>, UserUncheckedUpdateWithoutAlbumLikeInput>
  }

  export type AlbumCreateNestedOneWithoutPhotoInput = {
    create?: XOR<AlbumCreateWithoutPhotoInput, AlbumUncheckedCreateWithoutPhotoInput>
    connectOrCreate?: AlbumCreateOrConnectWithoutPhotoInput
    connect?: AlbumWhereUniqueInput
  }

  export type AlbumUpdateOneRequiredWithoutPhotoNestedInput = {
    create?: XOR<AlbumCreateWithoutPhotoInput, AlbumUncheckedCreateWithoutPhotoInput>
    connectOrCreate?: AlbumCreateOrConnectWithoutPhotoInput
    upsert?: AlbumUpsertWithoutPhotoInput
    connect?: AlbumWhereUniqueInput
    update?: XOR<XOR<AlbumUpdateToOneWithWhereWithoutPhotoInput, AlbumUpdateWithoutPhotoInput>, AlbumUncheckedUpdateWithoutPhotoInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AlbumCreateWithoutCreatorInput = {
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPrivate?: boolean
    Circle?: CircleCreateNestedOneWithoutAlbumInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutAlbumInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutAlbumInput
    Photo?: PhotoCreateNestedManyWithoutAlbumInput
  }

  export type AlbumUncheckedCreateWithoutCreatorInput = {
    id?: number
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    circleId?: number | null
    isPrivate?: boolean
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutAlbumInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutAlbumInput
    Photo?: PhotoUncheckedCreateNestedManyWithoutAlbumInput
  }

  export type AlbumCreateOrConnectWithoutCreatorInput = {
    where: AlbumWhereUniqueInput
    create: XOR<AlbumCreateWithoutCreatorInput, AlbumUncheckedCreateWithoutCreatorInput>
  }

  export type AlbumCreateManyCreatorInputEnvelope = {
    data: AlbumCreateManyCreatorInput | AlbumCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type AlbumCommentCreateWithoutUserInput = {
    content: string
    createdAt?: Date | string
    updatedAt: Date | string
    Album: AlbumCreateNestedOneWithoutAlbumCommentInput
  }

  export type AlbumCommentUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt: Date | string
    albumId: number
  }

  export type AlbumCommentCreateOrConnectWithoutUserInput = {
    where: AlbumCommentWhereUniqueInput
    create: XOR<AlbumCommentCreateWithoutUserInput, AlbumCommentUncheckedCreateWithoutUserInput>
  }

  export type AlbumCommentCreateManyUserInputEnvelope = {
    data: AlbumCommentCreateManyUserInput | AlbumCommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AlbumLikeCreateWithoutUserInput = {
    createdAt?: Date | string
    Album: AlbumCreateNestedOneWithoutAlbumLikeInput
  }

  export type AlbumLikeUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    albumId: number
  }

  export type AlbumLikeCreateOrConnectWithoutUserInput = {
    where: AlbumLikeWhereUniqueInput
    create: XOR<AlbumLikeCreateWithoutUserInput, AlbumLikeUncheckedCreateWithoutUserInput>
  }

  export type AlbumLikeCreateManyUserInputEnvelope = {
    data: AlbumLikeCreateManyUserInput | AlbumLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CircleCreateWithoutCreatorInput = {
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Album?: AlbumCreateNestedManyWithoutCircleInput
    members?: MembershipCreateNestedManyWithoutCircleInput
    posts?: PostCreateNestedManyWithoutCircleInput
  }

  export type CircleUncheckedCreateWithoutCreatorInput = {
    id?: number
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Album?: AlbumUncheckedCreateNestedManyWithoutCircleInput
    members?: MembershipUncheckedCreateNestedManyWithoutCircleInput
    posts?: PostUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CircleCreateOrConnectWithoutCreatorInput = {
    where: CircleWhereUniqueInput
    create: XOR<CircleCreateWithoutCreatorInput, CircleUncheckedCreateWithoutCreatorInput>
  }

  export type CircleCreateManyCreatorInputEnvelope = {
    data: CircleCreateManyCreatorInput | CircleCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postId: number
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: CommentCreateManyUserInput | CommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowerInput = {
    createdAt?: Date | string
    following: UserCreateNestedOneWithoutFollowersInput
  }

  export type FollowUncheckedCreateWithoutFollowerInput = {
    id?: number
    followingId: number
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput>
  }

  export type FollowCreateManyFollowerInputEnvelope = {
    data: FollowCreateManyFollowerInput | FollowCreateManyFollowerInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowingInput = {
    createdAt?: Date | string
    follower: UserCreateNestedOneWithoutFollowingInput
  }

  export type FollowUncheckedCreateWithoutFollowingInput = {
    id?: number
    followerId: number
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput>
  }

  export type FollowCreateManyFollowingInputEnvelope = {
    data: FollowCreateManyFollowingInput | FollowCreateManyFollowingInput[]
    skipDuplicates?: boolean
  }

  export type LikeCreateWithoutUserInput = {
    createdAt?: Date | string
    post: PostCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    postId: number
  }

  export type LikeCreateOrConnectWithoutUserInput = {
    where: LikeWhereUniqueInput
    create: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput>
  }

  export type LikeCreateManyUserInputEnvelope = {
    data: LikeCreateManyUserInput | LikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MembershipCreateWithoutUserInput = {
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    circle: CircleCreateNestedOneWithoutMembersInput
  }

  export type MembershipUncheckedCreateWithoutUserInput = {
    id?: number
    circleId: number
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembershipCreateOrConnectWithoutUserInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput>
  }

  export type MembershipCreateManyUserInputEnvelope = {
    data: MembershipCreateManyUserInput | MembershipCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutUserInput = {
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    likes?: LikeCreateNestedManyWithoutPostInput
    circle: CircleCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    circleId: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    likes?: LikeUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutUserInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostCreateManyUserInputEnvelope = {
    data: PostCreateManyUserInput | PostCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserSettingsCreateWithoutUserInput = {
    darkMode?: boolean
    highContrast?: boolean
    fontSize?: string
    defaultAlbumPrivacy?: boolean
    muteAlbumContent?: boolean
    muteAlbumComments?: boolean
    enableNotifications?: boolean
    notifyNewMessages?: boolean
    notifyFriendRequests?: boolean
    notifyCircleInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSettingsUncheckedCreateWithoutUserInput = {
    id?: number
    darkMode?: boolean
    highContrast?: boolean
    fontSize?: string
    defaultAlbumPrivacy?: boolean
    muteAlbumContent?: boolean
    muteAlbumComments?: boolean
    enableNotifications?: boolean
    notifyNewMessages?: boolean
    notifyFriendRequests?: boolean
    notifyCircleInvites?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSettingsCreateOrConnectWithoutUserInput = {
    where: UserSettingsWhereUniqueInput
    create: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
  }

  export type AlbumUpsertWithWhereUniqueWithoutCreatorInput = {
    where: AlbumWhereUniqueInput
    update: XOR<AlbumUpdateWithoutCreatorInput, AlbumUncheckedUpdateWithoutCreatorInput>
    create: XOR<AlbumCreateWithoutCreatorInput, AlbumUncheckedCreateWithoutCreatorInput>
  }

  export type AlbumUpdateWithWhereUniqueWithoutCreatorInput = {
    where: AlbumWhereUniqueInput
    data: XOR<AlbumUpdateWithoutCreatorInput, AlbumUncheckedUpdateWithoutCreatorInput>
  }

  export type AlbumUpdateManyWithWhereWithoutCreatorInput = {
    where: AlbumScalarWhereInput
    data: XOR<AlbumUpdateManyMutationInput, AlbumUncheckedUpdateManyWithoutCreatorInput>
  }

  export type AlbumScalarWhereInput = {
    AND?: AlbumScalarWhereInput | AlbumScalarWhereInput[]
    OR?: AlbumScalarWhereInput[]
    NOT?: AlbumScalarWhereInput | AlbumScalarWhereInput[]
    id?: IntFilter<"Album"> | number
    title?: StringFilter<"Album"> | string
    description?: StringNullableFilter<"Album"> | string | null
    coverImage?: StringNullableFilter<"Album"> | string | null
    createdAt?: DateTimeFilter<"Album"> | Date | string
    updatedAt?: DateTimeFilter<"Album"> | Date | string
    creatorId?: IntNullableFilter<"Album"> | number | null
    circleId?: IntNullableFilter<"Album"> | number | null
    isPrivate?: BoolFilter<"Album"> | boolean
  }

  export type AlbumCommentUpsertWithWhereUniqueWithoutUserInput = {
    where: AlbumCommentWhereUniqueInput
    update: XOR<AlbumCommentUpdateWithoutUserInput, AlbumCommentUncheckedUpdateWithoutUserInput>
    create: XOR<AlbumCommentCreateWithoutUserInput, AlbumCommentUncheckedCreateWithoutUserInput>
  }

  export type AlbumCommentUpdateWithWhereUniqueWithoutUserInput = {
    where: AlbumCommentWhereUniqueInput
    data: XOR<AlbumCommentUpdateWithoutUserInput, AlbumCommentUncheckedUpdateWithoutUserInput>
  }

  export type AlbumCommentUpdateManyWithWhereWithoutUserInput = {
    where: AlbumCommentScalarWhereInput
    data: XOR<AlbumCommentUpdateManyMutationInput, AlbumCommentUncheckedUpdateManyWithoutUserInput>
  }

  export type AlbumCommentScalarWhereInput = {
    AND?: AlbumCommentScalarWhereInput | AlbumCommentScalarWhereInput[]
    OR?: AlbumCommentScalarWhereInput[]
    NOT?: AlbumCommentScalarWhereInput | AlbumCommentScalarWhereInput[]
    id?: IntFilter<"AlbumComment"> | number
    content?: StringFilter<"AlbumComment"> | string
    createdAt?: DateTimeFilter<"AlbumComment"> | Date | string
    updatedAt?: DateTimeFilter<"AlbumComment"> | Date | string
    userId?: IntFilter<"AlbumComment"> | number
    albumId?: IntFilter<"AlbumComment"> | number
  }

  export type AlbumLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: AlbumLikeWhereUniqueInput
    update: XOR<AlbumLikeUpdateWithoutUserInput, AlbumLikeUncheckedUpdateWithoutUserInput>
    create: XOR<AlbumLikeCreateWithoutUserInput, AlbumLikeUncheckedCreateWithoutUserInput>
  }

  export type AlbumLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: AlbumLikeWhereUniqueInput
    data: XOR<AlbumLikeUpdateWithoutUserInput, AlbumLikeUncheckedUpdateWithoutUserInput>
  }

  export type AlbumLikeUpdateManyWithWhereWithoutUserInput = {
    where: AlbumLikeScalarWhereInput
    data: XOR<AlbumLikeUpdateManyMutationInput, AlbumLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type AlbumLikeScalarWhereInput = {
    AND?: AlbumLikeScalarWhereInput | AlbumLikeScalarWhereInput[]
    OR?: AlbumLikeScalarWhereInput[]
    NOT?: AlbumLikeScalarWhereInput | AlbumLikeScalarWhereInput[]
    id?: IntFilter<"AlbumLike"> | number
    createdAt?: DateTimeFilter<"AlbumLike"> | Date | string
    userId?: IntFilter<"AlbumLike"> | number
    albumId?: IntFilter<"AlbumLike"> | number
  }

  export type CircleUpsertWithWhereUniqueWithoutCreatorInput = {
    where: CircleWhereUniqueInput
    update: XOR<CircleUpdateWithoutCreatorInput, CircleUncheckedUpdateWithoutCreatorInput>
    create: XOR<CircleCreateWithoutCreatorInput, CircleUncheckedCreateWithoutCreatorInput>
  }

  export type CircleUpdateWithWhereUniqueWithoutCreatorInput = {
    where: CircleWhereUniqueInput
    data: XOR<CircleUpdateWithoutCreatorInput, CircleUncheckedUpdateWithoutCreatorInput>
  }

  export type CircleUpdateManyWithWhereWithoutCreatorInput = {
    where: CircleScalarWhereInput
    data: XOR<CircleUpdateManyMutationInput, CircleUncheckedUpdateManyWithoutCreatorInput>
  }

  export type CircleScalarWhereInput = {
    AND?: CircleScalarWhereInput | CircleScalarWhereInput[]
    OR?: CircleScalarWhereInput[]
    NOT?: CircleScalarWhereInput | CircleScalarWhereInput[]
    id?: IntFilter<"Circle"> | number
    name?: StringFilter<"Circle"> | string
    description?: StringNullableFilter<"Circle"> | string | null
    avatar?: StringNullableFilter<"Circle"> | string | null
    coverImage?: StringNullableFilter<"Circle"> | string | null
    isPrivate?: BoolFilter<"Circle"> | boolean
    createdAt?: DateTimeFilter<"Circle"> | Date | string
    updatedAt?: DateTimeFilter<"Circle"> | Date | string
    creatorId?: IntFilter<"Circle"> | number
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    userId?: IntFilter<"Comment"> | number
    postId?: IntFilter<"Comment"> | number
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowerInput, FollowUncheckedUpdateWithoutFollowerInput>
    create: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowerInput, FollowUncheckedUpdateWithoutFollowerInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowerInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowerInput>
  }

  export type FollowScalarWhereInput = {
    AND?: FollowScalarWhereInput | FollowScalarWhereInput[]
    OR?: FollowScalarWhereInput[]
    NOT?: FollowScalarWhereInput | FollowScalarWhereInput[]
    id?: IntFilter<"Follow"> | number
    followerId?: IntFilter<"Follow"> | number
    followingId?: IntFilter<"Follow"> | number
    createdAt?: DateTimeFilter<"Follow"> | Date | string
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowingInput, FollowUncheckedUpdateWithoutFollowingInput>
    create: XOR<FollowCreateWithoutFollowingInput, FollowUncheckedCreateWithoutFollowingInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowingInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowingInput, FollowUncheckedUpdateWithoutFollowingInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowingInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowingInput>
  }

  export type LikeUpsertWithWhereUniqueWithoutUserInput = {
    where: LikeWhereUniqueInput
    update: XOR<LikeUpdateWithoutUserInput, LikeUncheckedUpdateWithoutUserInput>
    create: XOR<LikeCreateWithoutUserInput, LikeUncheckedCreateWithoutUserInput>
  }

  export type LikeUpdateWithWhereUniqueWithoutUserInput = {
    where: LikeWhereUniqueInput
    data: XOR<LikeUpdateWithoutUserInput, LikeUncheckedUpdateWithoutUserInput>
  }

  export type LikeUpdateManyWithWhereWithoutUserInput = {
    where: LikeScalarWhereInput
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyWithoutUserInput>
  }

  export type LikeScalarWhereInput = {
    AND?: LikeScalarWhereInput | LikeScalarWhereInput[]
    OR?: LikeScalarWhereInput[]
    NOT?: LikeScalarWhereInput | LikeScalarWhereInput[]
    id?: IntFilter<"Like"> | number
    createdAt?: DateTimeFilter<"Like"> | Date | string
    userId?: IntFilter<"Like"> | number
    postId?: IntFilter<"Like"> | number
  }

  export type MembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutUserInput, MembershipUncheckedUpdateWithoutUserInput>
    create: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutUserInput, MembershipUncheckedUpdateWithoutUserInput>
  }

  export type MembershipUpdateManyWithWhereWithoutUserInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutUserInput>
  }

  export type MembershipScalarWhereInput = {
    AND?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    OR?: MembershipScalarWhereInput[]
    NOT?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    id?: IntFilter<"Membership"> | number
    userId?: IntFilter<"Membership"> | number
    circleId?: IntFilter<"Membership"> | number
    role?: EnumRoleFilter<"Membership"> | $Enums.Role
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
  }

  export type PostUpsertWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostUpdateWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
  }

  export type PostUpdateManyWithWhereWithoutUserInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutUserInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: IntFilter<"Post"> | number
    content?: StringFilter<"Post"> | string
    imageUrl?: StringNullableFilter<"Post"> | string | null
    videoUrl?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    userId?: IntFilter<"Post"> | number
    circleId?: IntFilter<"Post"> | number
  }

  export type UserSettingsUpsertWithoutUserInput = {
    update: XOR<UserSettingsUpdateWithoutUserInput, UserSettingsUncheckedUpdateWithoutUserInput>
    create: XOR<UserSettingsCreateWithoutUserInput, UserSettingsUncheckedCreateWithoutUserInput>
    where?: UserSettingsWhereInput
  }

  export type UserSettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: UserSettingsWhereInput
    data: XOR<UserSettingsUpdateWithoutUserInput, UserSettingsUncheckedUpdateWithoutUserInput>
  }

  export type UserSettingsUpdateWithoutUserInput = {
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    highContrast?: BoolFieldUpdateOperationsInput | boolean
    fontSize?: StringFieldUpdateOperationsInput | string
    defaultAlbumPrivacy?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumContent?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumComments?: BoolFieldUpdateOperationsInput | boolean
    enableNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifyNewMessages?: BoolFieldUpdateOperationsInput | boolean
    notifyFriendRequests?: BoolFieldUpdateOperationsInput | boolean
    notifyCircleInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSettingsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    darkMode?: BoolFieldUpdateOperationsInput | boolean
    highContrast?: BoolFieldUpdateOperationsInput | boolean
    fontSize?: StringFieldUpdateOperationsInput | string
    defaultAlbumPrivacy?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumContent?: BoolFieldUpdateOperationsInput | boolean
    muteAlbumComments?: BoolFieldUpdateOperationsInput | boolean
    enableNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifyNewMessages?: BoolFieldUpdateOperationsInput | boolean
    notifyFriendRequests?: BoolFieldUpdateOperationsInput | boolean
    notifyCircleInvites?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlbumCreateWithoutCircleInput = {
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPrivate?: boolean
    creator?: UserCreateNestedOneWithoutAlbumInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutAlbumInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutAlbumInput
    Photo?: PhotoCreateNestedManyWithoutAlbumInput
  }

  export type AlbumUncheckedCreateWithoutCircleInput = {
    id?: number
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId?: number | null
    isPrivate?: boolean
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutAlbumInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutAlbumInput
    Photo?: PhotoUncheckedCreateNestedManyWithoutAlbumInput
  }

  export type AlbumCreateOrConnectWithoutCircleInput = {
    where: AlbumWhereUniqueInput
    create: XOR<AlbumCreateWithoutCircleInput, AlbumUncheckedCreateWithoutCircleInput>
  }

  export type AlbumCreateManyCircleInputEnvelope = {
    data: AlbumCreateManyCircleInput | AlbumCreateManyCircleInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCreatedCirclesInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedCirclesInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedCirclesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedCirclesInput, UserUncheckedCreateWithoutCreatedCirclesInput>
  }

  export type MembershipCreateWithoutCircleInput = {
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type MembershipUncheckedCreateWithoutCircleInput = {
    id?: number
    userId: number
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembershipCreateOrConnectWithoutCircleInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutCircleInput, MembershipUncheckedCreateWithoutCircleInput>
  }

  export type MembershipCreateManyCircleInputEnvelope = {
    data: MembershipCreateManyCircleInput | MembershipCreateManyCircleInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutCircleInput = {
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    likes?: LikeCreateNestedManyWithoutPostInput
    user: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutCircleInput = {
    id?: number
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    likes?: LikeUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutCircleInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCircleInput, PostUncheckedCreateWithoutCircleInput>
  }

  export type PostCreateManyCircleInputEnvelope = {
    data: PostCreateManyCircleInput | PostCreateManyCircleInput[]
    skipDuplicates?: boolean
  }

  export type AlbumUpsertWithWhereUniqueWithoutCircleInput = {
    where: AlbumWhereUniqueInput
    update: XOR<AlbumUpdateWithoutCircleInput, AlbumUncheckedUpdateWithoutCircleInput>
    create: XOR<AlbumCreateWithoutCircleInput, AlbumUncheckedCreateWithoutCircleInput>
  }

  export type AlbumUpdateWithWhereUniqueWithoutCircleInput = {
    where: AlbumWhereUniqueInput
    data: XOR<AlbumUpdateWithoutCircleInput, AlbumUncheckedUpdateWithoutCircleInput>
  }

  export type AlbumUpdateManyWithWhereWithoutCircleInput = {
    where: AlbumScalarWhereInput
    data: XOR<AlbumUpdateManyMutationInput, AlbumUncheckedUpdateManyWithoutCircleInput>
  }

  export type UserUpsertWithoutCreatedCirclesInput = {
    update: XOR<UserUpdateWithoutCreatedCirclesInput, UserUncheckedUpdateWithoutCreatedCirclesInput>
    create: XOR<UserCreateWithoutCreatedCirclesInput, UserUncheckedCreateWithoutCreatedCirclesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedCirclesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedCirclesInput, UserUncheckedUpdateWithoutCreatedCirclesInput>
  }

  export type UserUpdateWithoutCreatedCirclesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedCirclesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type MembershipUpsertWithWhereUniqueWithoutCircleInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutCircleInput, MembershipUncheckedUpdateWithoutCircleInput>
    create: XOR<MembershipCreateWithoutCircleInput, MembershipUncheckedCreateWithoutCircleInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutCircleInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutCircleInput, MembershipUncheckedUpdateWithoutCircleInput>
  }

  export type MembershipUpdateManyWithWhereWithoutCircleInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutCircleInput>
  }

  export type PostUpsertWithWhereUniqueWithoutCircleInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutCircleInput, PostUncheckedUpdateWithoutCircleInput>
    create: XOR<PostCreateWithoutCircleInput, PostUncheckedCreateWithoutCircleInput>
  }

  export type PostUpdateWithWhereUniqueWithoutCircleInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutCircleInput, PostUncheckedUpdateWithoutCircleInput>
  }

  export type PostUpdateManyWithWhereWithoutCircleInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutCircleInput>
  }

  export type CircleCreateWithoutMembersInput = {
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Album?: AlbumCreateNestedManyWithoutCircleInput
    creator: UserCreateNestedOneWithoutCreatedCirclesInput
    posts?: PostCreateNestedManyWithoutCircleInput
  }

  export type CircleUncheckedCreateWithoutMembersInput = {
    id?: number
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: number
    Album?: AlbumUncheckedCreateNestedManyWithoutCircleInput
    posts?: PostUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CircleCreateOrConnectWithoutMembersInput = {
    where: CircleWhereUniqueInput
    create: XOR<CircleCreateWithoutMembersInput, CircleUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutMembershipsInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type CircleUpsertWithoutMembersInput = {
    update: XOR<CircleUpdateWithoutMembersInput, CircleUncheckedUpdateWithoutMembersInput>
    create: XOR<CircleCreateWithoutMembersInput, CircleUncheckedCreateWithoutMembersInput>
    where?: CircleWhereInput
  }

  export type CircleUpdateToOneWithWhereWithoutMembersInput = {
    where?: CircleWhereInput
    data: XOR<CircleUpdateWithoutMembersInput, CircleUncheckedUpdateWithoutMembersInput>
  }

  export type CircleUpdateWithoutMembersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUpdateManyWithoutCircleNestedInput
    creator?: UserUpdateOneRequiredWithoutCreatedCirclesNestedInput
    posts?: PostUpdateManyWithoutCircleNestedInput
  }

  export type CircleUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: IntFieldUpdateOperationsInput | number
    Album?: AlbumUncheckedUpdateManyWithoutCircleNestedInput
    posts?: PostUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CommentCreateWithoutPostInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutPostInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type CommentCreateOrConnectWithoutPostInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentCreateManyPostInputEnvelope = {
    data: CommentCreateManyPostInput | CommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type LikeCreateWithoutPostInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLikesInput
  }

  export type LikeUncheckedCreateWithoutPostInput = {
    id?: number
    createdAt?: Date | string
    userId: number
  }

  export type LikeCreateOrConnectWithoutPostInput = {
    where: LikeWhereUniqueInput
    create: XOR<LikeCreateWithoutPostInput, LikeUncheckedCreateWithoutPostInput>
  }

  export type LikeCreateManyPostInputEnvelope = {
    data: LikeCreateManyPostInput | LikeCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type CircleCreateWithoutPostsInput = {
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    Album?: AlbumCreateNestedManyWithoutCircleInput
    creator: UserCreateNestedOneWithoutCreatedCirclesInput
    members?: MembershipCreateNestedManyWithoutCircleInput
  }

  export type CircleUncheckedCreateWithoutPostsInput = {
    id?: number
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: number
    Album?: AlbumUncheckedCreateNestedManyWithoutCircleInput
    members?: MembershipUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CircleCreateOrConnectWithoutPostsInput = {
    where: CircleWhereUniqueInput
    create: XOR<CircleCreateWithoutPostsInput, CircleUncheckedCreateWithoutPostsInput>
  }

  export type UserCreateWithoutPostsInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
  }

  export type CommentUpdateManyWithWhereWithoutPostInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutPostInput>
  }

  export type LikeUpsertWithWhereUniqueWithoutPostInput = {
    where: LikeWhereUniqueInput
    update: XOR<LikeUpdateWithoutPostInput, LikeUncheckedUpdateWithoutPostInput>
    create: XOR<LikeCreateWithoutPostInput, LikeUncheckedCreateWithoutPostInput>
  }

  export type LikeUpdateWithWhereUniqueWithoutPostInput = {
    where: LikeWhereUniqueInput
    data: XOR<LikeUpdateWithoutPostInput, LikeUncheckedUpdateWithoutPostInput>
  }

  export type LikeUpdateManyWithWhereWithoutPostInput = {
    where: LikeScalarWhereInput
    data: XOR<LikeUpdateManyMutationInput, LikeUncheckedUpdateManyWithoutPostInput>
  }

  export type CircleUpsertWithoutPostsInput = {
    update: XOR<CircleUpdateWithoutPostsInput, CircleUncheckedUpdateWithoutPostsInput>
    create: XOR<CircleCreateWithoutPostsInput, CircleUncheckedCreateWithoutPostsInput>
    where?: CircleWhereInput
  }

  export type CircleUpdateToOneWithWhereWithoutPostsInput = {
    where?: CircleWhereInput
    data: XOR<CircleUpdateWithoutPostsInput, CircleUncheckedUpdateWithoutPostsInput>
  }

  export type CircleUpdateWithoutPostsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUpdateManyWithoutCircleNestedInput
    creator?: UserUpdateOneRequiredWithoutCreatedCirclesNestedInput
    members?: MembershipUpdateManyWithoutCircleNestedInput
  }

  export type CircleUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: IntFieldUpdateOperationsInput | number
    Album?: AlbumUncheckedUpdateManyWithoutCircleNestedInput
    members?: MembershipUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PostCreateWithoutCommentsInput = {
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: LikeCreateNestedManyWithoutPostInput
    circle: CircleCreateNestedOneWithoutPostsInput
    user: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutCommentsInput = {
    id?: number
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    circleId: number
    likes?: LikeUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutCommentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type PostUpsertWithoutCommentsInput = {
    update: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutCommentsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type PostUpdateWithoutCommentsInput = {
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: LikeUpdateManyWithoutPostNestedInput
    circle?: CircleUpdateOneRequiredWithoutPostsNestedInput
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    circleId?: IntFieldUpdateOperationsInput | number
    likes?: LikeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PostCreateWithoutLikesInput = {
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    circle: CircleCreateNestedOneWithoutPostsInput
    user: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutLikesInput = {
    id?: number
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
    circleId: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutLikesInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
  }

  export type UserCreateWithoutLikesInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikesInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
  }

  export type PostUpsertWithoutLikesInput = {
    update: XOR<PostUpdateWithoutLikesInput, PostUncheckedUpdateWithoutLikesInput>
    create: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutLikesInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutLikesInput, PostUncheckedUpdateWithoutLikesInput>
  }

  export type PostUpdateWithoutLikesInput = {
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    circle?: CircleUpdateOneRequiredWithoutPostsNestedInput
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    circleId?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type UserUpsertWithoutLikesInput = {
    update: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateWithoutLikesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutFollowingInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowingInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
  }

  export type UserCreateWithoutFollowersInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowersInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
  }

  export type UserUpsertWithoutFollowingInput = {
    update: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateWithoutFollowingInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowingInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUpsertWithoutFollowersInput = {
    update: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type UserUpdateWithoutFollowersInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CircleCreateWithoutAlbumInput = {
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creator: UserCreateNestedOneWithoutCreatedCirclesInput
    members?: MembershipCreateNestedManyWithoutCircleInput
    posts?: PostCreateNestedManyWithoutCircleInput
  }

  export type CircleUncheckedCreateWithoutAlbumInput = {
    id?: number
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: number
    members?: MembershipUncheckedCreateNestedManyWithoutCircleInput
    posts?: PostUncheckedCreateNestedManyWithoutCircleInput
  }

  export type CircleCreateOrConnectWithoutAlbumInput = {
    where: CircleWhereUniqueInput
    create: XOR<CircleCreateWithoutAlbumInput, CircleUncheckedCreateWithoutAlbumInput>
  }

  export type UserCreateWithoutAlbumInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAlbumInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAlbumInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAlbumInput, UserUncheckedCreateWithoutAlbumInput>
  }

  export type AlbumCommentCreateWithoutAlbumInput = {
    content: string
    createdAt?: Date | string
    updatedAt: Date | string
    User: UserCreateNestedOneWithoutAlbumCommentInput
  }

  export type AlbumCommentUncheckedCreateWithoutAlbumInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt: Date | string
    userId: number
  }

  export type AlbumCommentCreateOrConnectWithoutAlbumInput = {
    where: AlbumCommentWhereUniqueInput
    create: XOR<AlbumCommentCreateWithoutAlbumInput, AlbumCommentUncheckedCreateWithoutAlbumInput>
  }

  export type AlbumCommentCreateManyAlbumInputEnvelope = {
    data: AlbumCommentCreateManyAlbumInput | AlbumCommentCreateManyAlbumInput[]
    skipDuplicates?: boolean
  }

  export type AlbumLikeCreateWithoutAlbumInput = {
    createdAt?: Date | string
    User: UserCreateNestedOneWithoutAlbumLikeInput
  }

  export type AlbumLikeUncheckedCreateWithoutAlbumInput = {
    id?: number
    createdAt?: Date | string
    userId: number
  }

  export type AlbumLikeCreateOrConnectWithoutAlbumInput = {
    where: AlbumLikeWhereUniqueInput
    create: XOR<AlbumLikeCreateWithoutAlbumInput, AlbumLikeUncheckedCreateWithoutAlbumInput>
  }

  export type AlbumLikeCreateManyAlbumInputEnvelope = {
    data: AlbumLikeCreateManyAlbumInput | AlbumLikeCreateManyAlbumInput[]
    skipDuplicates?: boolean
  }

  export type PhotoCreateWithoutAlbumInput = {
    url: string
    description?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type PhotoUncheckedCreateWithoutAlbumInput = {
    id?: number
    url: string
    description?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type PhotoCreateOrConnectWithoutAlbumInput = {
    where: PhotoWhereUniqueInput
    create: XOR<PhotoCreateWithoutAlbumInput, PhotoUncheckedCreateWithoutAlbumInput>
  }

  export type PhotoCreateManyAlbumInputEnvelope = {
    data: PhotoCreateManyAlbumInput | PhotoCreateManyAlbumInput[]
    skipDuplicates?: boolean
  }

  export type CircleUpsertWithoutAlbumInput = {
    update: XOR<CircleUpdateWithoutAlbumInput, CircleUncheckedUpdateWithoutAlbumInput>
    create: XOR<CircleCreateWithoutAlbumInput, CircleUncheckedCreateWithoutAlbumInput>
    where?: CircleWhereInput
  }

  export type CircleUpdateToOneWithWhereWithoutAlbumInput = {
    where?: CircleWhereInput
    data: XOR<CircleUpdateWithoutAlbumInput, CircleUncheckedUpdateWithoutAlbumInput>
  }

  export type CircleUpdateWithoutAlbumInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutCreatedCirclesNestedInput
    members?: MembershipUpdateManyWithoutCircleNestedInput
    posts?: PostUpdateManyWithoutCircleNestedInput
  }

  export type CircleUncheckedUpdateWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: IntFieldUpdateOperationsInput | number
    members?: MembershipUncheckedUpdateManyWithoutCircleNestedInput
    posts?: PostUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type UserUpsertWithoutAlbumInput = {
    update: XOR<UserUpdateWithoutAlbumInput, UserUncheckedUpdateWithoutAlbumInput>
    create: XOR<UserCreateWithoutAlbumInput, UserUncheckedCreateWithoutAlbumInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAlbumInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAlbumInput, UserUncheckedUpdateWithoutAlbumInput>
  }

  export type UserUpdateWithoutAlbumInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AlbumCommentUpsertWithWhereUniqueWithoutAlbumInput = {
    where: AlbumCommentWhereUniqueInput
    update: XOR<AlbumCommentUpdateWithoutAlbumInput, AlbumCommentUncheckedUpdateWithoutAlbumInput>
    create: XOR<AlbumCommentCreateWithoutAlbumInput, AlbumCommentUncheckedCreateWithoutAlbumInput>
  }

  export type AlbumCommentUpdateWithWhereUniqueWithoutAlbumInput = {
    where: AlbumCommentWhereUniqueInput
    data: XOR<AlbumCommentUpdateWithoutAlbumInput, AlbumCommentUncheckedUpdateWithoutAlbumInput>
  }

  export type AlbumCommentUpdateManyWithWhereWithoutAlbumInput = {
    where: AlbumCommentScalarWhereInput
    data: XOR<AlbumCommentUpdateManyMutationInput, AlbumCommentUncheckedUpdateManyWithoutAlbumInput>
  }

  export type AlbumLikeUpsertWithWhereUniqueWithoutAlbumInput = {
    where: AlbumLikeWhereUniqueInput
    update: XOR<AlbumLikeUpdateWithoutAlbumInput, AlbumLikeUncheckedUpdateWithoutAlbumInput>
    create: XOR<AlbumLikeCreateWithoutAlbumInput, AlbumLikeUncheckedCreateWithoutAlbumInput>
  }

  export type AlbumLikeUpdateWithWhereUniqueWithoutAlbumInput = {
    where: AlbumLikeWhereUniqueInput
    data: XOR<AlbumLikeUpdateWithoutAlbumInput, AlbumLikeUncheckedUpdateWithoutAlbumInput>
  }

  export type AlbumLikeUpdateManyWithWhereWithoutAlbumInput = {
    where: AlbumLikeScalarWhereInput
    data: XOR<AlbumLikeUpdateManyMutationInput, AlbumLikeUncheckedUpdateManyWithoutAlbumInput>
  }

  export type PhotoUpsertWithWhereUniqueWithoutAlbumInput = {
    where: PhotoWhereUniqueInput
    update: XOR<PhotoUpdateWithoutAlbumInput, PhotoUncheckedUpdateWithoutAlbumInput>
    create: XOR<PhotoCreateWithoutAlbumInput, PhotoUncheckedCreateWithoutAlbumInput>
  }

  export type PhotoUpdateWithWhereUniqueWithoutAlbumInput = {
    where: PhotoWhereUniqueInput
    data: XOR<PhotoUpdateWithoutAlbumInput, PhotoUncheckedUpdateWithoutAlbumInput>
  }

  export type PhotoUpdateManyWithWhereWithoutAlbumInput = {
    where: PhotoScalarWhereInput
    data: XOR<PhotoUpdateManyMutationInput, PhotoUncheckedUpdateManyWithoutAlbumInput>
  }

  export type PhotoScalarWhereInput = {
    AND?: PhotoScalarWhereInput | PhotoScalarWhereInput[]
    OR?: PhotoScalarWhereInput[]
    NOT?: PhotoScalarWhereInput | PhotoScalarWhereInput[]
    id?: IntFilter<"Photo"> | number
    url?: StringFilter<"Photo"> | string
    description?: StringNullableFilter<"Photo"> | string | null
    createdAt?: DateTimeFilter<"Photo"> | Date | string
    updatedAt?: DateTimeFilter<"Photo"> | Date | string
    albumId?: IntFilter<"Photo"> | number
  }

  export type UserCreateWithoutSettingsInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSettingsInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSettingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
  }

  export type UserUpsertWithoutSettingsInput = {
    update: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSettingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type UserUpdateWithoutSettingsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSettingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AlbumCreateWithoutAlbumCommentInput = {
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPrivate?: boolean
    Circle?: CircleCreateNestedOneWithoutAlbumInput
    creator?: UserCreateNestedOneWithoutAlbumInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutAlbumInput
    Photo?: PhotoCreateNestedManyWithoutAlbumInput
  }

  export type AlbumUncheckedCreateWithoutAlbumCommentInput = {
    id?: number
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId?: number | null
    circleId?: number | null
    isPrivate?: boolean
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutAlbumInput
    Photo?: PhotoUncheckedCreateNestedManyWithoutAlbumInput
  }

  export type AlbumCreateOrConnectWithoutAlbumCommentInput = {
    where: AlbumWhereUniqueInput
    create: XOR<AlbumCreateWithoutAlbumCommentInput, AlbumUncheckedCreateWithoutAlbumCommentInput>
  }

  export type UserCreateWithoutAlbumCommentInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAlbumCommentInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAlbumCommentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAlbumCommentInput, UserUncheckedCreateWithoutAlbumCommentInput>
  }

  export type AlbumUpsertWithoutAlbumCommentInput = {
    update: XOR<AlbumUpdateWithoutAlbumCommentInput, AlbumUncheckedUpdateWithoutAlbumCommentInput>
    create: XOR<AlbumCreateWithoutAlbumCommentInput, AlbumUncheckedCreateWithoutAlbumCommentInput>
    where?: AlbumWhereInput
  }

  export type AlbumUpdateToOneWithWhereWithoutAlbumCommentInput = {
    where?: AlbumWhereInput
    data: XOR<AlbumUpdateWithoutAlbumCommentInput, AlbumUncheckedUpdateWithoutAlbumCommentInput>
  }

  export type AlbumUpdateWithoutAlbumCommentInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    Circle?: CircleUpdateOneWithoutAlbumNestedInput
    creator?: UserUpdateOneWithoutAlbumNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumUncheckedUpdateWithoutAlbumCommentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: NullableIntFieldUpdateOperationsInput | number | null
    circleId?: NullableIntFieldUpdateOperationsInput | number | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUncheckedUpdateManyWithoutAlbumNestedInput
  }

  export type UserUpsertWithoutAlbumCommentInput = {
    update: XOR<UserUpdateWithoutAlbumCommentInput, UserUncheckedUpdateWithoutAlbumCommentInput>
    create: XOR<UserCreateWithoutAlbumCommentInput, UserUncheckedCreateWithoutAlbumCommentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAlbumCommentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAlbumCommentInput, UserUncheckedUpdateWithoutAlbumCommentInput>
  }

  export type UserUpdateWithoutAlbumCommentInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAlbumCommentInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AlbumCreateWithoutAlbumLikeInput = {
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPrivate?: boolean
    Circle?: CircleCreateNestedOneWithoutAlbumInput
    creator?: UserCreateNestedOneWithoutAlbumInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutAlbumInput
    Photo?: PhotoCreateNestedManyWithoutAlbumInput
  }

  export type AlbumUncheckedCreateWithoutAlbumLikeInput = {
    id?: number
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId?: number | null
    circleId?: number | null
    isPrivate?: boolean
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutAlbumInput
    Photo?: PhotoUncheckedCreateNestedManyWithoutAlbumInput
  }

  export type AlbumCreateOrConnectWithoutAlbumLikeInput = {
    where: AlbumWhereUniqueInput
    create: XOR<AlbumCreateWithoutAlbumLikeInput, AlbumUncheckedCreateWithoutAlbumLikeInput>
  }

  export type UserCreateWithoutAlbumLikeInput = {
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutUserInput
    createdCircles?: CircleCreateNestedManyWithoutCreatorInput
    comments?: CommentCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    followers?: FollowCreateNestedManyWithoutFollowingInput
    likes?: LikeCreateNestedManyWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutUserInput
    settings?: UserSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAlbumLikeInput = {
    id?: number
    email: string
    name?: string | null
    username: string
    password: string
    bio?: string | null
    profileImage?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isProfilePrivate?: boolean | null
    Album?: AlbumUncheckedCreateNestedManyWithoutCreatorInput
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutUserInput
    createdCircles?: CircleUncheckedCreateNestedManyWithoutCreatorInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    followers?: FollowUncheckedCreateNestedManyWithoutFollowingInput
    likes?: LikeUncheckedCreateNestedManyWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
    settings?: UserSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAlbumLikeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAlbumLikeInput, UserUncheckedCreateWithoutAlbumLikeInput>
  }

  export type AlbumUpsertWithoutAlbumLikeInput = {
    update: XOR<AlbumUpdateWithoutAlbumLikeInput, AlbumUncheckedUpdateWithoutAlbumLikeInput>
    create: XOR<AlbumCreateWithoutAlbumLikeInput, AlbumUncheckedCreateWithoutAlbumLikeInput>
    where?: AlbumWhereInput
  }

  export type AlbumUpdateToOneWithWhereWithoutAlbumLikeInput = {
    where?: AlbumWhereInput
    data: XOR<AlbumUpdateWithoutAlbumLikeInput, AlbumUncheckedUpdateWithoutAlbumLikeInput>
  }

  export type AlbumUpdateWithoutAlbumLikeInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    Circle?: CircleUpdateOneWithoutAlbumNestedInput
    creator?: UserUpdateOneWithoutAlbumNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumUncheckedUpdateWithoutAlbumLikeInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: NullableIntFieldUpdateOperationsInput | number | null
    circleId?: NullableIntFieldUpdateOperationsInput | number | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUncheckedUpdateManyWithoutAlbumNestedInput
  }

  export type UserUpsertWithoutAlbumLikeInput = {
    update: XOR<UserUpdateWithoutAlbumLikeInput, UserUncheckedUpdateWithoutAlbumLikeInput>
    create: XOR<UserCreateWithoutAlbumLikeInput, UserUncheckedCreateWithoutAlbumLikeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAlbumLikeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAlbumLikeInput, UserUncheckedUpdateWithoutAlbumLikeInput>
  }

  export type UserUpdateWithoutAlbumLikeInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUpdateManyWithoutCreatorNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    followers?: FollowUpdateManyWithoutFollowingNestedInput
    likes?: LikeUpdateManyWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAlbumLikeInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isProfilePrivate?: NullableBoolFieldUpdateOperationsInput | boolean | null
    Album?: AlbumUncheckedUpdateManyWithoutCreatorNestedInput
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutUserNestedInput
    createdCircles?: CircleUncheckedUpdateManyWithoutCreatorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    followers?: FollowUncheckedUpdateManyWithoutFollowingNestedInput
    likes?: LikeUncheckedUpdateManyWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
    settings?: UserSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AlbumCreateWithoutPhotoInput = {
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isPrivate?: boolean
    Circle?: CircleCreateNestedOneWithoutAlbumInput
    creator?: UserCreateNestedOneWithoutAlbumInput
    AlbumComment?: AlbumCommentCreateNestedManyWithoutAlbumInput
    AlbumLike?: AlbumLikeCreateNestedManyWithoutAlbumInput
  }

  export type AlbumUncheckedCreateWithoutPhotoInput = {
    id?: number
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId?: number | null
    circleId?: number | null
    isPrivate?: boolean
    AlbumComment?: AlbumCommentUncheckedCreateNestedManyWithoutAlbumInput
    AlbumLike?: AlbumLikeUncheckedCreateNestedManyWithoutAlbumInput
  }

  export type AlbumCreateOrConnectWithoutPhotoInput = {
    where: AlbumWhereUniqueInput
    create: XOR<AlbumCreateWithoutPhotoInput, AlbumUncheckedCreateWithoutPhotoInput>
  }

  export type AlbumUpsertWithoutPhotoInput = {
    update: XOR<AlbumUpdateWithoutPhotoInput, AlbumUncheckedUpdateWithoutPhotoInput>
    create: XOR<AlbumCreateWithoutPhotoInput, AlbumUncheckedCreateWithoutPhotoInput>
    where?: AlbumWhereInput
  }

  export type AlbumUpdateToOneWithWhereWithoutPhotoInput = {
    where?: AlbumWhereInput
    data: XOR<AlbumUpdateWithoutPhotoInput, AlbumUncheckedUpdateWithoutPhotoInput>
  }

  export type AlbumUpdateWithoutPhotoInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    Circle?: CircleUpdateOneWithoutAlbumNestedInput
    creator?: UserUpdateOneWithoutAlbumNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutAlbumNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumUncheckedUpdateWithoutPhotoInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: NullableIntFieldUpdateOperationsInput | number | null
    circleId?: NullableIntFieldUpdateOperationsInput | number | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutAlbumNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumCreateManyCreatorInput = {
    id?: number
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    circleId?: number | null
    isPrivate?: boolean
  }

  export type AlbumCommentCreateManyUserInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt: Date | string
    albumId: number
  }

  export type AlbumLikeCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    albumId: number
  }

  export type CircleCreateManyCreatorInput = {
    id?: number
    name: string
    description?: string | null
    avatar?: string | null
    coverImage?: string | null
    isPrivate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentCreateManyUserInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    postId: number
  }

  export type FollowCreateManyFollowerInput = {
    id?: number
    followingId: number
    createdAt?: Date | string
  }

  export type FollowCreateManyFollowingInput = {
    id?: number
    followerId: number
    createdAt?: Date | string
  }

  export type LikeCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    postId: number
  }

  export type MembershipCreateManyUserInput = {
    id?: number
    circleId: number
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCreateManyUserInput = {
    id?: number
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    circleId: number
  }

  export type AlbumUpdateWithoutCreatorInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    Circle?: CircleUpdateOneWithoutAlbumNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutAlbumNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumUncheckedUpdateWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circleId?: NullableIntFieldUpdateOperationsInput | number | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutAlbumNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUncheckedUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumUncheckedUpdateManyWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circleId?: NullableIntFieldUpdateOperationsInput | number | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AlbumCommentUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUpdateOneRequiredWithoutAlbumCommentNestedInput
  }

  export type AlbumCommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumCommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumLikeUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUpdateOneRequiredWithoutAlbumLikeNestedInput
  }

  export type AlbumLikeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumLikeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    albumId?: IntFieldUpdateOperationsInput | number
  }

  export type CircleUpdateWithoutCreatorInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUpdateManyWithoutCircleNestedInput
    members?: MembershipUpdateManyWithoutCircleNestedInput
    posts?: PostUpdateManyWithoutCircleNestedInput
  }

  export type CircleUncheckedUpdateWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Album?: AlbumUncheckedUpdateManyWithoutCircleNestedInput
    members?: MembershipUncheckedUpdateManyWithoutCircleNestedInput
    posts?: PostUncheckedUpdateManyWithoutCircleNestedInput
  }

  export type CircleUncheckedUpdateManyWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type FollowUpdateWithoutFollowerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    following?: UserUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowerInput = {
    id?: IntFieldUpdateOperationsInput | number
    followingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutFollowerInput = {
    id?: IntFieldUpdateOperationsInput | number
    followingId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpdateWithoutFollowingInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follower?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowingInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutFollowingInput = {
    id?: IntFieldUpdateOperationsInput | number
    followerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LikeUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type LikeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type MembershipUpdateWithoutUserInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circle?: CircleUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MembershipUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    circleId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    circleId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    likes?: LikeUpdateManyWithoutPostNestedInput
    circle?: CircleUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circleId?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    circleId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumCreateManyCircleInput = {
    id?: number
    title: string
    description?: string | null
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId?: number | null
    isPrivate?: boolean
  }

  export type MembershipCreateManyCircleInput = {
    id?: number
    userId: number
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCreateManyCircleInput = {
    id?: number
    content: string
    imageUrl?: string | null
    videoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type AlbumUpdateWithoutCircleInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    creator?: UserUpdateOneWithoutAlbumNestedInput
    AlbumComment?: AlbumCommentUpdateManyWithoutAlbumNestedInput
    AlbumLike?: AlbumLikeUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumUncheckedUpdateWithoutCircleInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: NullableIntFieldUpdateOperationsInput | number | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    AlbumComment?: AlbumCommentUncheckedUpdateManyWithoutAlbumNestedInput
    AlbumLike?: AlbumLikeUncheckedUpdateManyWithoutAlbumNestedInput
    Photo?: PhotoUncheckedUpdateManyWithoutAlbumNestedInput
  }

  export type AlbumUncheckedUpdateManyWithoutCircleInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: NullableIntFieldUpdateOperationsInput | number | null
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MembershipUpdateWithoutCircleInput = {
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type MembershipUncheckedUpdateWithoutCircleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUncheckedUpdateManyWithoutCircleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutCircleInput = {
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    likes?: LikeUpdateManyWithoutPostNestedInput
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutCircleInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    likes?: LikeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutCircleInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentCreateManyPostInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: number
  }

  export type LikeCreateManyPostInput = {
    id?: number
    createdAt?: Date | string
    userId: number
  }

  export type CommentUpdateWithoutPostInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentUncheckedUpdateManyWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type LikeUpdateWithoutPostInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLikesNestedInput
  }

  export type LikeUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type LikeUncheckedUpdateManyWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumCommentCreateManyAlbumInput = {
    id?: number
    content: string
    createdAt?: Date | string
    updatedAt: Date | string
    userId: number
  }

  export type AlbumLikeCreateManyAlbumInput = {
    id?: number
    createdAt?: Date | string
    userId: number
  }

  export type PhotoCreateManyAlbumInput = {
    id?: number
    url: string
    description?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type AlbumCommentUpdateWithoutAlbumInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutAlbumCommentNestedInput
  }

  export type AlbumCommentUncheckedUpdateWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumCommentUncheckedUpdateManyWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumLikeUpdateWithoutAlbumInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutAlbumLikeNestedInput
  }

  export type AlbumLikeUncheckedUpdateWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type AlbumLikeUncheckedUpdateManyWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PhotoUpdateWithoutAlbumInput = {
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoUncheckedUpdateWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhotoUncheckedUpdateManyWithoutAlbumInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}