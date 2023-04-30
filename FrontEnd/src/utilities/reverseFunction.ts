export default function reverseFunction(array: any[]) {
  const newArray: any[] = [];

  array.map((el) => {
    newArray.unshift(el);
  });

  return newArray;
}
