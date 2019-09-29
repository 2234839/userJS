
interface Window{
    /** 油猴提供的沙箱windows的真实windows */
    unsafeWindow:any
}

declare var window: Window & ( typeof globalThis)