import fetchCountries from './fetchCountries.js';
import insertData from './insertdata.hbs';
import insertCountry from './insertcountry.hbs';
import _debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from '../node_modules/pnotify/dist/es/PNotifyButtons.js';
// import PNotifyStyleMaterial from '../node_modules/pnotify/dist/umd/PNotifyStyleMaterial.js';
import './styles.css';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
const searchForm = document.querySelector('#search-form');
const countryList = document.querySelector('#country-list');

function inputEvent(e) {
  const searchQuery = e.target.value;
  if (!searchQuery) {
    return;
  } else {
    fetchCountries(searchQuery, onDataCome);
  }
}
function clearListItems() {
  countryList.innerHTML = '';
}

searchForm.addEventListener('input', _debounce(inputEvent, 500));
function onDataCome(data) {
  if (!data) {
    return;
  } else if (data.length > 10) {
    clearListItems();
    // PNotify.defaults.styling = 'material';
    PNotify.error({
      // shadow: true,
      // delay: 4000,
      // type: 'error',
      title: 'Warning!',
      text: 'Too many matches found.Please enter a more specific query',
      // modules: {
      // Buttons: {
      //   closerHover: true,
      //   closer: true,
      // }}
    });

  } else if (data.length >= 2 && data.length <= 10) {
    clearListItems();
    const markup = data.map(item => insertCountry(item)).join('');
    countryList.insertAdjacentHTML('beforeend', markup);
  } else if (data.length === 1) {
    clearListItems();
    const markup = data.map(item => insertData(item)).join('');
    countryList.insertAdjacentHTML('beforeend', markup);
  }
}
