export class Calendar {
  constructor(selector, options) {
    options = options || {}
    this.$el = document.querySelector(selector)
    this.currentDate = new Date()
    this.month = this.currentDate.getMonth()
    this.year = this.currentDate.getFullYear()
    this.dayCellsAmount = 42
    this.dateRange = []
    this.$output = document.querySelector(options.output)
    this.placeholder = options.placeholder

    this.#setup()
    this.#render()
  }

  #getTemplate() {
    return `
  <div class="calendar">
		<div class="calendar__header">
			<button class="calendar__header-button  js-prev-button material-icons" type="button">arrow_back</button>
			<div class="calendar__month-and-year js-month-and-year"></div>
			<button class="calendar__header-button js-next-button material-icons" type="button">arrow_forward</button>
		</div>
		<div class="calendar__week">
			<div class="calendar__week-day">Пн</div>
			<div class="calendar__week-day">Вт</div>
			<div class="calendar__week-day">Ср</div>
			<div class="calendar__week-day">Чт</div>
			<div class="calendar__week-day">Пт</div>
			<div class="calendar__week-day">Сб</div>
			<div class="calendar__week-day">Вс</div>
		</div>
		<div class="calendar__days"></div>
		<div class="calendar__footer">
			<div class="action-buttons">
				<button class="reset" type="button">очистить</button>
				<button class="done" type="button">применить</button>
			</div>
		</div>
	</div>
`
  }

  #setup() {
    if (!this.$el) return
    this.$el.innerHTML = this.#getTemplate()
    const $prevButton = this.$el.querySelector('.js-prev-button')
    const $nextButton = this.$el.querySelector('.js-next-button')
    const $resetButton = this.$el.querySelector('.reset')
    const $applyButton = this.$el.querySelector('.done')
    const $calendar = this.$el.querySelector('.calendar')

    $prevButton.addEventListener('click', (e) => {
      this.month--
      this.#render()
    })
    $nextButton.addEventListener('click', (e) => {
      this.month++
      this.#render()
    })
    $resetButton.addEventListener('click', (e) => {
      this.reset()
      this.#render();
    })
    $applyButton.addEventListener('click', (e) => {
      if (this.dateRange.length < 2) return
      this.dateOutput()
    })

    $calendar.addEventListener('click', (e) => {
      if (e.target.classList.contains('day') && !e.target.classList.contains('day_selected')) {
        if (this.dateRange.length < 2) {
          e.target.classList.add('day_selected')
          this.dateRange.push(new Date(e.target.dataset.date.split('.').reverse()))
          if (this.dateRange.length === 2) {
            this.dateRange.sort((a, b) => +a - +b)
            this.#render();
          }
        } else if (this.dateRange.length === 2) {
          this.reset();
          this.dateRange.push(new Date(e.target.dataset.date.split('.').reverse()))
          this.#render();
        }
      }
    })
  }

  #render() {
    if (!this.$el) return
    const $jsMonthAndYear = this.$el.querySelector('.js-month-and-year')
    const date = new Date(this.year, this.month);
    const day = date.getDay();
    const calendarMonth = date.getMonth();
    const calendarYear = date.getFullYear();
    const $days = document.createElement('div');
    $jsMonthAndYear.textContent = `${date.toLocaleDateString('ru-RU', { month: 'long' })} ${calendarYear}`;
    $days.classList.add('days');
    date.setDate(2 - (day || 7));

    for (let i = 0; i < this.dayCellsAmount; i++) {
      const $day = document.createElement('div');
      $day.textContent = date.getDate();
      $day.setAttribute('data-date', date.toLocaleDateString());
      $day.setAttribute('data-timestamp', +date);
      $day.classList.add('day');
      calendarMonth > date.getMonth() && $day.classList.add('day__prev-month');
      calendarMonth < date.getMonth() && $day.classList.add('day__next-month');
      if (this.dateRange) {
        let [firstDay, lastDay] = this.dateRange;
        if (this.dateRange.length < 2) {
          +$day.dataset.timestamp === +firstDay && $day.classList.add('day_selected');
        } else {
          +$day.dataset.timestamp === +firstDay && $day.classList.add('day_selected', 'day_first-day');
          +$day.dataset.timestamp === +lastDay && $day.classList.add('day_selected', 'day_last-day');
          (+$day.dataset.timestamp > +firstDay && +$day.dataset.timestamp < +lastDay) && $day.classList.add('day__in-range');
        }
      }
      date.toLocaleDateString() == this.currentDate.toLocaleDateString() && $day.classList.add('day__current-day');
      $days.append($day);
      date.setDate(date.getDate() + 1);
    }
    this.$el.querySelector('.days') && this.$el.querySelector('.calendar__days').removeChild(this.$el.querySelector('.days'));
    this.$el.querySelector('.calendar__days').append($days);
  }

  dateOutput() {
    if (!this.$output || !this.dateRange.length)  return
    this.$output.forEach((item, index, array) => {
      if (array.length > 1) item.value = this.dateRange[index].toLocaleDateString()
      else item.textContent = this.dateRange.map(date => date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })).join(' - ')
    })
  }

  reset() {
    this.dateRange.length = 0;
    this.$output && this.$output.forEach((item, index, array) => {
      if (array.length > 1) item.value = this.placeholder
      else item.textContent = this.placeholder
    });
  }

  setCustomDate(date){
    this.currentDate = new Date(date)
    this.year = this.currentDate.getFullYear()
    this.month = this.currentDate.getMonth()
    this.date = this.currentDate.getDate()
    this.#render()
    return this
  }

  setCustomRange(firstDate, lastDate){
    this.dateRange = [
      new Date(firstDate),
      new Date(lastDate)
    ]
    this.#render()
    return this
  }
}
