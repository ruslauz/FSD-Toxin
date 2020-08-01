import {Calendar} from '../../components/calendar/calendar'
import setCustomOutput from '../../../js/setCustomOutput'

const uikitCardsCal1 = new Calendar('.js-uikitcards-cal1', {
  placeholder: 'ДД.ММ.ГГГГ',
})

const uikitCardsCal2 = new Calendar('.js-uikitcards-cal2', {
  placeholder: 'ДД.ММ.ГГГГ',
}).setCustomDate('2019.08.08').setCustomRange('2019.08.19','2019.08.23')

const calendar = new Calendar('.js-calendar-wrapper', {
  placeholder: 'ДД.ММ.ГГГГ',
}).setCustomDate('2019.08.08').setCustomRange('2019.08.19', '2019.08.23')

setCustomOutput.call(uikitCardsCal1, '.dropdown__input')
setCustomOutput.call(uikitCardsCal2, '.dropdown__input')
