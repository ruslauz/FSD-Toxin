import { Calendar } from '../../components/calendar/calendar'
import setCustomOutput from '../../../js/setCustomOutput'

// Calendars
const searchRoomCal = new Calendar('.js-search-rom-cal', {
  placeholder: 'Выберите даты',
}).setCustomRange('2020.08.19', '2020.08.23')

setCustomOutput.call(searchRoomCal, '.dropdown__summary')

