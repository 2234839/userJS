/** ════════════════════════🏳‍🌈 最基本的类型 🏳‍🌈════════════════════════
 * 🧨  不再使用这个了，在 [ts-util](https://github.com/2234839/ts-util/tree/master/ts-type) 中的ts-type 进行维护
 ** ════════════════════════🚧 最基本的类型 🚧════════════════════════ */
export type Long = number
export type int = number
export type Byte = number
export type int32 = number
export type int64 = number
export type BigDecimal = number



/** ════════════════════════🏳‍🌈 稍微高级一些的类型，要注意应该要进行一手转化 🏳‍🌈════════════════════════
 *
 ** ════════════════════════🚧 稍微高级一些的类型，要注意应该要进行一手转化 🚧════════════════════════ */

export type date_time = Date


/** ════════════════════════🏳‍🌈 特殊的类型 🏳‍🌈════════════════════════
 *  可能会干扰正常的代码
 ** ════════════════════════🚧 特殊的类型 🚧════════════════════════ */

/** 因为他实际并不是返回的包装后的String，从接口中读出来的都是string */
export type String = string


/** ════════════════════════🏳‍🌈 泛型 🏳‍🌈════════════════════════
 *
 ** ════════════════════════🚧 泛型 🚧════════════════════════ */

export type integer<T>=T
/** 不能够命名为string */
export type _string<T>=string

