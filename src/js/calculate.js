import priceSplit from './priceSplit'

export default function calculate() {
  const calculations = document.querySelector('.calculations')
  const pricePerDay = calculations.querySelector('.js-calculations-price-per-day')
  const period = calculations.querySelector('.js-calculations-period')
  const priceForPeriod = calculations.querySelector('.js-calculations-price-for-period')
  const totalPrice = calculations.querySelector('.js-calculations-total-price')
  const discount = 2179
  const additionalServices = 300
  let sum = +pricePerDay.textContent.replace(' ', '') * +period.textContent.split(' ')[0]
  priceForPeriod.textContent = sum.toLocaleString()
  totalPrice.textContent = (sum - discount + additionalServices).toLocaleString()
}