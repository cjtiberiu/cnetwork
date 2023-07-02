export const filterArray = (array, filters) =>  {
  return array.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (Array.isArray(item[key])) {
        return item[key].toLowerCase().includes(value.toLowerCase());
      }
      if (typeof item[key] === 'string') {
        return item[key].toLowerCase().includes(value.toLowerCase());
      }

      return item[key] === value;
    });
  });
}