export const list1 = Array
  .from({ length: 101 })
  .map((val, index) => ({
    id: index + 1,
    name: `列表项目-item-${index + 1}`,
    code: `编码-code-${index + 1}`,
    price: (Math.random() * 1000000).toFixed(2)
  }))
