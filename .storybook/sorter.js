export const StorySorter = (a, b, STORY_ORDER) => {
  const kindH = (x, level = 0) =>
    x[1].kind.split('/')[level] &&
    x[1].kind.split('/')[level].toLowerCase();

  const compareOrder = (a, b, array) => {
    let indexA = array.indexOf(a);
    let indexB = array.indexOf(b);
    indexA = indexA === -1 ? 10000 : indexA;
    indexB = indexB === -1 ? 10000 : indexB;

    if (indexA < indexB) {
      return -1;
    } else if (indexA > indexB) {
      return 1;
    }
    return 0;
  };

  const chapterA = kindH(a);
  const chapterB = kindH(b);

  if (chapterA === chapterB) {
    const level1A = kindH(a, 1) || a[1].name.toLowerCase();
    const level1B = kindH(b, 1) || b[1].name.toLowerCase();
    return compareOrder(level1A, level1B, STORY_ORDER.level2);
  }

  let chapterCompare = compareOrder(
    chapterA,
    chapterB,
    STORY_ORDER.level1
  );
  if (chapterCompare === 0) {
    return a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
  }
  return chapterCompare;
};
