import {Calendar} from '../../components/calendar/calendar'
import setCustomOutput from '../../../js/setCustomOutput'
import calculate from '../../../js/calculate'
import {phraser} from '../../components/ibox/ibox'


const uikitCardsCal1 = new Calendar('.js-uikitcards-cal1', {
  placeholder: 'ДД.ММ.ГГГГ',
})

const uikitCardsCal2 = new Calendar('.js-uikitcards-cal2', {
  placeholder: 'ДД.ММ.ГГГГ',
}).setCustomDate('2019.08.08')
.setCustomRange('2019.08.19','2019.08.23')

const calendar = new Calendar('.js-calendar-wrapper', {
  placeholder: 'ДД.ММ.ГГГГ',
}).setCustomDate('2019.08.08')
.setCustomRange('2019.08.19', '2019.08.23')

uikitCardsCal2.onDateOutput = function () {
  const millisecondsPerDay = 86400000
  const daysPhrases = ["сутки", "суток", "суток"]
  const period = Math.abs(+this.dateRange[0] - +this.dateRange[1]) / millisecondsPerDay
  const calculations = document.querySelector('.calculations')
  calculations.querySelector('.js-calculations-period').textContent = phraser(...daysPhrases, period)
  calculate()
}

setCustomOutput.call(uikitCardsCal1, '.dropdown__input')
setCustomOutput.call(uikitCardsCal2, '.dropdown__input')

console.log(uikitCardsCal2);
