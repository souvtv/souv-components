declare type NativeEventDispatch = import('@client/helpers/events').EventDispatch<{ message: unknown }>

export {}

declare global {
  interface Window {
    APP: 'jobs' | 'souv' | 'reporter' | 'social' | 'live' | 'mam' | 'account'
  }
}
