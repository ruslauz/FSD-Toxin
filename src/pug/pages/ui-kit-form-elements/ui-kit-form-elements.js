import {iBox} from '../../components/ibox/ibox'
import {Calendar} from '../../components/calendar/calendar'
import setCustomOutput from '../../../js/setCustomOutput'
const guest = ["гость", "гостя", "гостей"];
const baby = ["младенец", "младенца", "младенцев"];
const bedroom = ["спальня", "спальни", "спалень"];
const bed = ["кровать", "кровати", "кроватей"];
const bathroom = ["ванная комната", "ванные комнаты", "ванных комнат"];

// Calendars
const uiKitCal1 = new Calendar('.js-ui-kit-cal1', {
  placeholder: 'Выберите даты',
}).setCustomRange('2020.08.19', '2020.08.23')

const dateDropdown = new Calendar('.js-date-dropdown', {
  placeholder: 'ДД.ММ.ГГГГ',
})

setCustomOutput.call(uiKitCal1, '.dropdown__summary')

setCustomOutput.call(dateDropdown, '.dropdown__input')

// Гости
iBox('.js-guest-increment-box',)
.init({
  defaultPhrase: 'Cколько гостей',
  items: [
    {
      minNumber: 1,
      phrases: guest,
    },
    {
      minNumber: 0,
      phrases: guest,
    },
    {
      minNumber: 0,
      phrases: baby,
    }
  ],
  actionButtons: true
});

// Удобства
iBox('.js-convenience-increment-box')
.init({
  // defaultPhrase: 'Уточните удобства',
  items: [
    {
      minNumber: 1,
      phrases: bedroom,
    },
    {
      minNumber: 1,
      phrases: bed,
    },
    {
      minNumber: 0,
      phrases: bathroom,
    }
  ],
  actionButtons: false
});