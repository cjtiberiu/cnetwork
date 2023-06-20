export default async function apiService(endpoint, options) {
  try {
      const response = await fetch(process.env.REACT_APP_API_URL + endpoint, options);
      const responseDetails = await response.json();

      if (response.ok) {
          if (responseDetails.data) {
            return { data: responseDetails.data, message: responseDetails.message };
          }
      } else {
        if (responseDetails.errors) {
          throw responseDetails.errors;
        } else {
          const errors = [{ message: 'Eroare Server Necunoscuta' }]
          throw errors;
        }
      }
  } catch (errors) {
    if (Array.isArray(errors)) {
      throw errors;
    }
    throw [{ message: 'Eroare server' }]
  }
}