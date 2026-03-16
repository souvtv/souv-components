// prettier-ignore
type Regex_az = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
// prettier-ignore
type Regez_AZ = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
type Regex_09 = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Regex_w = Regex_az | Regez_AZ | Regex_09 | '_'
type ParamChar = Regex_w | '-'

type RegexMatchPlus<CharPattern extends string, T extends string> = T extends `${infer First}${infer Rest}`
  ? First extends CharPattern
    ? RegexMatchPlus<CharPattern, Rest> extends never
      ? First
      : `${First}${RegexMatchPlus<CharPattern, Rest>}`
    : never
  : never

type _PathParam<Path extends string> =
  // split path into individual path segments
  Path extends `${infer L}/${infer R}`
    ? _PathParam<L> | _PathParam<R>
    : // find params after `:`
      Path extends `:${infer Param}`
      ? Param extends `${infer Optional}?${string}`
        ? RegexMatchPlus<ParamChar, Optional>
        : RegexMatchPlus<ParamChar, Param>
      : // otherwise, there aren't any params present
        never

type PathParam<Path extends string> =
  // check if path is just a wildcard
  Path extends '*' | '/*'
    ? '*'
    : // look for wildcard at the end of the path
      Path extends `${infer Rest}/*`
      ? '*' | _PathParam<Rest>
      : // look for params in the absence of wildcards
        _PathParam<Path>

type ParamParseKey<Segment extends string> =
  // if you could not find path params, fallback to `string`
  [PathParam<Segment>] extends [never] ? string : PathParam<Segment>

type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined
}

interface PathPattern<Path extends string = string> {
  /**
   * A string to match against a URL pathname. May contain `:id`-style segments
   * to indicate placeholders for dynamic parameters. It May also end with `/*`
   * to indicate matching the rest of the URL pathname.
   */
  path: Path
  /**
   * Should be `true` if the static portions of the `path` should be matched in
   * the same case.
   */
  caseSensitive?: boolean
  /**
   * Should be `true` if this pattern should match the entire URL pathname.
   */
  end?: boolean
}

interface PathMatch<ParamKey extends string = string> {
  /**
   * The names and values of dynamic parameters in the URL.
   */
  params: Params<ParamKey>
  /**
   * The portion of the URL pathname that was matched.
   */
  pathname: string
  /**
   * The portion of the URL pathname that was matched before child routes.
   */
  pathnameBase: string
  /**
   * The pattern that was used to match.
   */
  pattern: PathPattern
}

type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @public
 * @category Utils
 * @param pattern The pattern to match against the URL pathname. This can be a
 * string or a {@link PathPattern} object. If a string is provided, it will be
 * treated as a pattern with `caseSensitive` set to `false` and `end` set to
 * `true`.
 * @param pathname The URL pathname to match against the pattern.
 * @returns A path match object if the pattern matches the pathname,
 * or `null` if it does not match.
 */
export function matchPath<ParamKey extends ParamParseKey<Path>, Path extends string>(
  pattern: PathPattern<Path> | Path,
  pathname: string,
): PathMatch<ParamKey> | null {
  if (typeof pattern === 'string') {
    pattern = { caseSensitive: false, end: true, path: pattern }
  }

  const [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end)

  const match = pathname.match(matcher)
  if (!match) return null

  const matchedPathname = match[0]
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, '$1')
  const captureGroups = match.slice(1)
  const params: Params = compiledParams.reduce<Mutable<Params>>((memo, { paramName, isOptional }, index) => {
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === '*') {
      const splatValue = captureGroups[index] || ''
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, '$1')
    }

    const value = captureGroups[index]
    if (isOptional && !value) {
      memo[paramName] = undefined
    } else {
      memo[paramName] = (value || '').replace(/%2F/g, '/')
    }
    return memo
  }, {})

  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern,
  }
}

type CompiledPathParam = { paramName: string; isOptional?: boolean }

export function compilePath(path: string, caseSensitive = false, end = true): [RegExp, CompiledPathParam[]] {
  // console.warn(
  //   path === '*' || !path.endsWith('*') || path.endsWith('/*'),
  //   `Route path "${path}" will be treated as if it were ` +
  //     `"${path.replace(/\*$/, '/*')}" because the \`*\` character must ` +
  //     `always follow a \`/\` in the pattern. To get rid of this warning, ` +
  //     `please change the route path to "${path.replace(/\*$/, '/*')}".`,
  // )

  const params: CompiledPathParam[] = []
  let regexpSource = `^${path
    .replace(/\/*\*?$/, '') // Ignore trailing / and /*, we'll handle it below
    .replace(/^\/*/, '/') // Make sure it has a leading /
    .replace(/[\\.*+^${}|()[\]]/g, '\\$&') // Escape special regex chars
    .replace(
      /\/:([\w-]+)(\?)?/g,
      (match: string, paramName: string, isOptional: string | undefined, index: number, str: string) => {
        params.push({ isOptional: isOptional !== null, paramName })

        if (isOptional) {
          const nextChar = str.charAt(index + match.length)
          if (nextChar && nextChar !== '/') {
            return '/([^\\/]*)'
          }

          return '(?:/([^\\/]*))?'
        }

        return '/([^\\/]+)'
      },
    ) // Dynamic segment
    .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2')}` // Optional static segment

  if (path.endsWith('*')) {
    params.push({ paramName: '*' })
    regexpSource +=
      path === '*' || path === '/*'
        ? '(.*)$' // Already matched the initial /, just match the rest
        : '(?:\\/(.+)|\\/*)$' // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += '\\/*$'
  } else if (path !== '' && path !== '/') {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex, so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += '(?:(?=\\/|$))'
  } else {
    // Nothing to match for "" or "/"
  }

  const matcher = new RegExp(regexpSource, caseSensitive ? undefined : 'i')

  return [matcher, params]
}
