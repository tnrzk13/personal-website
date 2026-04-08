export function balanceColumns<T extends { tier: string }>(
  items: T[],
  weights: Record<string, number>
): { left: (T & { sortedIndex: number })[]; right: (T & { sortedIndex: number })[] } {
  const sorted = [...items]
    .sort((a, b) => {
      if (a.tier === b.tier) return 0;
      return a.tier === "featured" ? -1 : 1;
    })
    .map((item, i) => ({ ...item, sortedIndex: i }));

  const featured = sorted.filter((item) => item.tier === "featured");
  const compact = sorted.filter((item) => item.tier !== "featured");

  const left: (T & { sortedIndex: number })[] = [];
  const right: (T & { sortedIndex: number })[] = [];
  let leftWeight = 0;
  let rightWeight = 0;

  for (const item of [...featured, ...compact]) {
    if (leftWeight <= rightWeight) {
      left.push(item);
      leftWeight += weights[item.tier] ?? 1;
    } else {
      right.push(item);
      rightWeight += weights[item.tier] ?? 1;
    }
  }

  return { left, right };
}
