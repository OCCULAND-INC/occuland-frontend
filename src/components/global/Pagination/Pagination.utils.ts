const ITEM_PER_PAGE = 5;

export const sliceByPage = <T>(arr: Array<T>, page: number): Array<T> => {
  return arr.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
};
