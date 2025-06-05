declare type NativeEventDispatch = import('@client/helpers/events').EventDispatch<{ message: unknown }>

export { }

declare global {
  const BASE_URL: string | undefined | null

  interface Window {
    APP: 'jobs' | 'souv' | 'reporter' | 'social' | 'live' | 'mam' | 'account'
  }
}
