export function findElement(text: string) {
  console.time();
  let x = 0;
  let _el;
  const str = text;
  const all = (Array.from(document.querySelectorAll("body *")) as HTMLElement[]).filter(
    /** 限定匹配的元素文本长度和原来的差距不太大 */
    (el) => el.textContent.length > text.length / 3 && el.textContent.length < text.length * 9,
  );
  for (let el of all) {
    const n = Number(similar(el.textContent || "", str));
    if (n > x) {
      x = n;
      _el = el;
    }
  }
  console.timeEnd();
  return _el;
}
/** 编辑距离动态规划算法 */
function similar(s1: string, sj: string, fixed = 3) {
  if (!s1 || !sj) {
    return 0;
  }
  const n = s1.length;
  const m = sj.length;
  const l = n > m ? n : m;

  const table: number[][] = [];

  let i, j, si, cost;
  if (n === 0) return m;
  if (m === 0) return n;
  for (i = 0; i <= n; i++) {
    table[i] = [];
    table[i][0] = i;
  }
  for (j = 0; j <= m; j++) {
    table[0][j] = j;
  }

  for (i = 1; i <= n; i++) {
    si = s1.charAt(i - 1);
    for (j = 1; j <= m; j++) {
      cost = si === sj.charAt(j - 1) ? 0 : 1;
      table[i][j] = min(table[i - 1][j] + 1, table[i][j - 1] + 1, table[i - 1][j - 1] + cost);
    }
  }
  let res = 1 - table[n][m] / l;

  return res.toFixed(fixed);
}

function min(a: number, b: number, c: number) {
  return a < b ? (a < c ? a : c) : b < c ? b : c;
}
