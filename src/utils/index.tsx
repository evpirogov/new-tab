export const generateRandomId = () => Math.random().toString(32).substring(2)

export const changeElementPositionInArray = <T,>(
  arr: Array<T>,
  currentIndex: number,
  newIndex: number,
): Array<T> => {
  if (currentIndex < newIndex) newIndex--

  const element = arr[currentIndex]
  const newArr = arr.filter((_, i) => i !== currentIndex)
  newArr.splice(newIndex, 0, element)
  return newArr
}
