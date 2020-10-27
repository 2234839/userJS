export const copy = (str: string) => {
  // 第一种
  return navigator.clipboard.writeText(str);
};
