import noUiSlider from 'nouislider/distribute/nouislider.js';
import priceSplit from '../../../js/priceSplit';
import 'nouislider/distribute/nouislider.css';

const range = document.querySelector('.js-range');
const rangeText = document.querySelector('.js-range-text');

if (range) {
  noUiSlider.create(range, {
    start: [5000, 10000],
    connect: true,
    range: {
      'min': 0,
      'max': 15000
    }
  }).on('update', function (values) {
    rangeText.textContent = `${priceSplit(~~values[0])}₽ - ${priceSplit(~~values[1])}₽`
  })
};