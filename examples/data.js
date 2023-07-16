export const list1 = Array.from({ length: 10 }).map((val, index) => ({
  id: index + 1,
  name: `item-${index + 1}`
}))
