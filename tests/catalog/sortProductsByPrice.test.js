const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, "asc").map((item) => item.id)).toEqual(
      [3, 6, 5, 4, 2, 1],
    );
  });
  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products).map((item) => item.id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const allowedIds = [1, 3, 4];
    const filteredProducts = products.filter((product) =>
      allowedIds.includes(product.id),
    );
    expect(
      sortProductsByPrice(filteredProducts, "asc").map((item) => item.id),
    ).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(
      sortProductsByPrice(products, "desc").map((item) => item.id),
    ).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const allowedIds = [3, 1, 4];
    const filteredProducts = products.filter((product) =>
      allowedIds.includes(product.id),
    );
    expect(
      sortProductsByPrice(filteredProducts, "desc").map((item) => item.id),
    ).toEqual([1, 4, 3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const allowedIds = [5, 2, 6];
    const filteredProducts = products.filter((product) =>
      allowedIds.includes(product.id),
    );
    expect(
      sortProductsByPrice(filteredProducts, "desc").map((item) => item.id),
    ).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const allowedIds = [1, 3, 4];
    const filteredProducts = products.filter((product) =>
      allowedIds.includes(product.id),
    );
    sortProductsByPrice(filteredProducts, "asc");
    expect(filteredProducts.map((item) => item.id)).toEqual([1, 3, 4]);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const allowedIds = [1, 3, 4];
    const filteredProducts = products.filter((product) =>
      allowedIds.includes(product.id),
    );
    sortProductsByPrice(filteredProducts, "desc");
    expect(filteredProducts.map((item) => item.id)).toEqual([1, 3, 4]);
  });
  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const beforeFilteredIdProducts = [...products].map((item) => item.id)
    sortProductsByPrice(products).map((item) => item.id);
    expect(beforeFilteredIdProducts).toEqual(products.map((item) => item.id));
  });
});
