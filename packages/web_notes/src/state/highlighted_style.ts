import { derived, get, writable } from 'svelte/store';

export const styleList = writable(<string[]>[]);

/** 根据 styleList 计算出来的 css 片段 */
export const styleText = derived(styleList, ($styleList) => {
  return `<style>
  ${get(styleList).join("\n")}
  </style>`;
});