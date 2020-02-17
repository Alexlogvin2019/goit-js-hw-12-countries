export default function fetchCountries(searchQuery, callback) {
  const DATA_URL = 'https://restcountries.eu/rest/v2/name/' + `${searchQuery}`;
  fetch(DATA_URL)
    .then(res => res.json())
    .then(res => {
        callback(res);
    })
    .catch(error => console.log(error));
}
