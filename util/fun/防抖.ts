export function debounce(fn: Function, wait: number) {
  var timeout = null as null | any;
  return function (...arg: any) {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...arg);
    }, wait);
  };
}
