
const sortArrayByName = (array) => {
  array.sort((a, b) => a.name.localeCompare(b.name));

  return array;
};

const sortArrayByQuantity = (array) => {
  array.sort((a, b) => ((a.quantity < b.quantity) ? 1 : -1));

  return array;
};

export const sortArray = (array, id) => {
  // sort by name
  if (id === 0) {
    return sortArrayByName(array);
  }
  return sortArrayByQuantity(array);
};
export default sortArray;
