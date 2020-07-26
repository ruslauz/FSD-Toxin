import {Calendar} from '../../components/calendar/calendar'

const calendar = new Calendar('.js-calendar-wrapper', {
  placeholder: 'ДД.ММ.ГГГГ',
}).setCustomDate('2019.08.08').setCustomRange('2019.08.19', '2019.08.23')