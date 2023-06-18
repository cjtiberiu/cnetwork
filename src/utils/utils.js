export const MONTHS = [
  {
    id: 1,
    month: 'January'
  },
  {
    id: 2,
    month: 'February'
  },
  {
    id: 3,
    month: 'March'
  },
  {
    id: 4,
    month: 'April'
  },
  {
    id: 5,
    month: 'May'
  },
  {
    id: 6,
    month: 'June'
  },
  {
    id: 7,
    month: 'July'
  },
  {
    id: 8,
    month: 'August'
  },
  {
    id: 9,
    month: 'September'
  },
  {
    id: 10,
    month: 'October'
  },
  {
    id: 11,
    month: 'November'
  },
  {
    id: 12,
    month: 'December'
  },
];

export const APP_INIT_YEAR = 2023;
export const VAT_PERCENTAGE = 19;
export const COMPANY_DATA = {
  name: "cNetwork",
  cif: "xxxxxxx",
  address: "Strada App, nr.2",
  tel: "07xx-xxxx-xxxx",
  email: "admin@cnetwork.com",
  vat: "19%"
}

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